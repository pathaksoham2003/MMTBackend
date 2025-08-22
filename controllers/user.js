import twilio from "twilio";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import mongoose from "../utils/db.js";
import Address from "../models/Address.js";

let twilioClient;
if (process.env.USE_TWILLIO_SMS === "true") {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

let emailTransporter;
if (process.env.USE_TWILLIO_SMS === "false") {
  emailTransporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    host: process.env.GMAIL_HOST,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendOTPViaSMS = async (phone, otp) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`,
    });
    return {success: true, messageId: message.sid};
  } catch (error) {
    console.error("Twilio error:", error);
    return {success: false, error: error.message};
  }
};

const sendOTPViaEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Your Verification Code - MMT",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Verification Code</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; text-align: center;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
            <p style="color: #666; margin: 10px 0 0 0;">This code is valid for 10 minutes</p>
          </div>
          <p style="color: #333; margin-top: 20px;">
            Please enter this verification code to complete your registration.
          </p>
          <p style="color: #999; font-size: 12px;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
      `,
    };

    const info = await emailTransporter.sendMail(mailOptions);
    return {success: true, messageId: info.messageId};
  } catch (error) {
    console.error("Email error:", error);
    return {success: false, error: error.message};
  }
};

const sendOTP = async (contact, otp, isEmail = false) => {
  if (process.env.USE_TWILLIO_SMS === "true") {
    return await sendOTPViaSMS(contact, otp);
  } else {
    return await sendOTPViaEmail(contact, otp);
  }
};

export const createUser = async (req, res) => {
  try {
    const {phone, role, email} = req.body;
    const useTwilioSMS = process.env.USE_TWILLIO_SMS === "true";

    if (!phone || !role) {
      return res.status(400).json({
        success: false,
        message: "Phone number and role are required",
      });
    }

    if (!useTwilioSMS && !email) {
      return res.status(400).json({
        success: false,
        message: "Email is required when SMS service is disabled",
      });
    }

    if (!useTwilioSMS && email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }
    }

    const validRoles = ["DELIVERY", "MESS_OWNER", "CUSTOMER", "SUPER_ADMIN"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    if (!/^\d{10}$/.test(phone.toString())) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    const existingUser = await User.findOne({
      $or: [{phone}, email ? {email} : {}],
    });

    const otp = generateOTP();

    if (existingUser) {
      // ✅ User exists → send OTP again
      const contactInfo = useTwilioSMS ? phone : email;
      const otpResult = await sendOTP(contactInfo, otp, !useTwilioSMS);

      if (!otpResult.success) {
        return res.status(500).json({
          success: false,
          message: `Failed to send OTP via ${
            useTwilioSMS ? "SMS" : "Email"
          }. Please try again.`,
          error: otpResult.error,
        });
      }

      existingUser.otp = otp;
      await existingUser.save();

      return res.status(200).json({
        success: true,
        message: `OTP resent to ${
          useTwilioSMS ? "phone number" : "email address"
        }.`,
        data: {
          userId: existingUser._id,
          phone: existingUser.phone,
          role: existingUser.role,
          otpSent: true,
          method: useTwilioSMS ? "SMS" : "Email",
          has_name_completed: existingUser.has_name_completed,
          has_address_completed: existingUser.has_address_completed,
        },
      });
    }

    // ✅ User does not exist → create and send OTP
    const newUser = new User({
      phone,
      role,
      otp,
      is_active: role === "CUSTOMER" || role === "SUPER_ADMIN",
      has_name_completed: false,
      has_address_completed: false,
      ...(email && {email}),
    });

    await newUser.save();

    const contactInfo = useTwilioSMS ? phone : email;
    const otpResult = await sendOTP(contactInfo, otp, !useTwilioSMS);

    if (!otpResult.success) {
      await User.findByIdAndDelete(newUser._id);
      return res.status(500).json({
        success: false,
        message: `Failed to send OTP via ${
          useTwilioSMS ? "SMS" : "Email"
        }. Please try again.`,
        error: otpResult.error,
      });
    }

    res.status(201).json({
      success: true,
      message: `User created successfully. OTP sent to ${
        useTwilioSMS ? "phone number" : "email address"
      }.`,
      data: {
        userId: newUser._id,
        phone: newUser.phone,
        role: newUser.role,
        otpSent: true,
        method: useTwilioSMS ? "SMS" : "Email",
        has_name_completed: newUser.has_name_completed,
        has_address_completed: newUser.has_address_completed,
        ...(email && {email}),
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const {phone, otp} = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "User ID and OTP are required",
      });
    }

    const user = await User.find({phone});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP is correct → check profile completion
    if (!user.name) {
      return res.status(202).json({
        success: true,
        message: "Name not completed",
        nextStep: "ADD_NAME",
      });
    }

    if (!user.address) {
      return res.status(203).json({
        success: true,
        message: "Address not completed",
        nextStep: "ADD_ADDRESS",
      });
    }

    // If all details are complete
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully. Profile complete.",
      data: {
        userId: user._id,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const addName = async (req, res) => {
  try {
    const {phone} = req.params;
    const {name} = req.body;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const user = await User.findOne({phone});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== undefined) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    user.name = name;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Name updated successfully",
      data: user.toObject({
        versionKey: false,
        transform: (_, ret) => {
          delete ret.otp;
          return ret;
        },
      }),
    });
  } catch (error) {
    console.error("Error updating name:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const {phone} = req.params;
    const {line1, line2, instructions, tag, coordinates} = req.body;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const user = await User.findOne({phone});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== undefined) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    if (
      !line1 ||
      !coordinates ||
      !Array.isArray(coordinates) ||
      coordinates.length !== 2
    ) {
      return res.status(400).json({
        success: false,
        message:
          "line1 and valid coordinates [longitude, latitude] are required",
      });
    }

    const full_address = [line1, line2, instructions]
      .filter(Boolean)
      .join(", ");

    const address = await Address.findOneAndUpdate(
      {user_id: user._id},
      {
        user_id: user._id,
        line1,
        line2,
        instructions,
        tag,
        full_address,
        location: {type: "Point", coordinates},
      },
      {upsert: true, new: true}
    );

    res.status(200).json({
      success: true,
      message: "Address added/updated successfully",
      data: address,
    });
  } catch (error) {
    console.error("Error adding/updating address:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const {phone, email} = req.body;
    const useTwilioSMS = process.env.USE_TWILLIO_SMS === "true";

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!useTwilioSMS && !email) {
      return res.status(400).json({
        success: false,
        message: "Email is required when SMS service is disabled",
      });
    }

    const query = {phone};
    if (!useTwilioSMS && email) {
      query.email = email;
    }

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp === undefined) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    const newOtp = generateOTP();
    user.otp = newOtp;
    await user.save();

    const contactInfo = useTwilioSMS ? phone : email;
    const otpResult = await sendOTP(contactInfo, newOtp, !useTwilioSMS);

    if (!otpResult.success) {
      return res.status(500).json({
        success: false,
        message: `Failed to send OTP via ${
          useTwilioSMS ? "SMS" : "Email"
        }. Please try again.`,
        error: otpResult.error,
      });
    }

    const responseData = {
      phone: user.phone,
      otpSent: true,
      method: useTwilioSMS ? "SMS" : "Email",
    };

    if (user.email) {
      responseData.email = user.email;
    }

    res.status(200).json({
      success: true,
      message: `OTP resent successfully via ${useTwilioSMS ? "SMS" : "Email"}`,
      data: responseData,
    });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const {phone} = req.params;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const user = await User.findOne({phone}).select("-otp");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const {page = 1, limit = 10, role, is_active} = req.query;

    const query = {};
    if (role) query.role = role;
    if (is_active !== undefined) query.is_active = is_active === "true";

    const users = await User.find(query)
      .select("-otp")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({createdAt: -1});

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const {phone} = req.params;
    const {is_active} = req.body;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    if (typeof is_active !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "is_active must be a boolean value",
      });
    }

    const user = await User.findOneAndUpdate(
      {phone},
      {is_active},
      {new: true, select: "-otp"}
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${is_active ? "activated" : "deactivated"} successfully`,
      data: user,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

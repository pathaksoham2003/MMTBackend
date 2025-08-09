import twilio from "twilio";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import mongoose from "../utils/db.js";

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

// Send OTP via Gmail SMTP
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

// Send OTP based on configuration
const sendOTP = async (contact, otp, isEmail = false) => {
  if (process.env.USE_TWILLIO_SMS === "true") {
    return await sendOTPViaSMS(contact, otp);
  } else {
    return await sendOTPViaEmail(contact, otp);
  }
};

// Create user with phone number and send OTP
export const createUser = async (req, res) => {
  try {
    const {phone, role, email} = req.body;
    const useTwilioSMS = process.env.USE_TWILLIO_SMS === "true";

    // Validate required fields
    if (!phone || !role) {
      return res.status(400).json({
        success: false,
        message: "Phone number and role are required",
      });
    }

    // Validate email if SMS is disabled
    if (!useTwilioSMS && !email) {
      return res.status(400).json({
        success: false,
        message: "Email is required when SMS service is disabled",
      });
    }

    // Validate email format if provided
    if (!useTwilioSMS && email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }
    }

    // Validate role
    const validRoles = ["DELIVERY", "MESS_OWNER", "CUSTOMER", "SUPER_ADMIN"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // Validate phone number (basic validation for 10 digits)
    if (!/^\d{10}$/.test(phone.toString())) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    // Check if user already exists (by phone or email)
    const existingQuery = {phone};
    if (!useTwilioSMS && email) {
      existingQuery.$or = [{phone}];
    }

    const existingUser = await User.findOne(existingQuery);
    if (existingUser) {
      const conflictField =
        existingUser.phone === parseInt(phone) ? "phone number" : "email";
      return res.status(409).json({
        success: false,
        message: `User with this ${conflictField} already exists`,
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Create user with phone and OTP
    const userData = {
      phone,
      role,
      otp,
      is_active: true,
    };

    // Add email if SMS is disabled
    if (!useTwilioSMS && email) {
      userData.email = email;
    }

    // For roles that don't need mess_id, don't include it
    if (role !== "CUSTOMER" && role !== "SUPER_ADMIN") {
      // DELIVERY and MESS_OWNER will need to be activated after mess assignment
      userData.is_active = false;
    }

    const newUser = new User(userData);
    await newUser.save();

    // Send OTP via SMS or Email
    const contactInfo = useTwilioSMS ? phone : email;
    const otpResult = await sendOTP(contactInfo, otp, !useTwilioSMS);

    if (!otpResult.success) {
      // If OTP sending fails, delete the created user
      await User.findByIdAndDelete(newUser._id);
      return res.status(500).json({
        success: false,
        message: `Failed to send OTP via ${
          useTwilioSMS ? "SMS" : "Email"
        }. Please try again.`,
        error: otpResult.error,
      });
    }

    const responseData = {
      userId: newUser._id,
      phone: newUser.phone,
      role: newUser.role,
      otpSent: true,
      method: useTwilioSMS ? "SMS" : "Email",
    };

    if (!useTwilioSMS && email) {
      responseData.email = email;
    }

    res.status(201).json({
      success: true,
      message: `User created successfully. OTP sent to ${
        useTwilioSMS ? "phone number" : "email address"
      }.`,
      data: responseData,
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

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const {phone, otp, email} = req.body;
    const useTwilioSMS = process.env.USE_TWILLIO_SMS === "true";

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    if (!useTwilioSMS && !email) {
      return res.status(400).json({
        success: false,
        message: "Email is required when SMS service is disabled",
      });
    }

    // Find user by phone (and email if SMS is disabled)
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

    // Verify OTP
    if (user.otp !== parseInt(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    await user.save();

    const responseData = {
      userId: user._id,
      phone: user.phone,
      role: user.role,
      verified: true,
    };

    if (user.email) {
      responseData.email = user.email;
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: responseData,
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

// Complete user profile
export const completeProfile = async (req, res) => {
  try {
    const {userId} = req.params;
    const {name, avatar, addresses, mess_id} = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if OTP was verified (OTP should be undefined after verification)
    if (user.otp !== undefined) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    // Validate addresses format if provided
    if (addresses && Array.isArray(addresses)) {
      for (const address of addresses) {
        if (
          !address.line1 ||
          !address.city ||
          !address.state ||
          !address.pincode
        ) {
          return res.status(400).json({
            success: false,
            message: "Each address must have line1, city, state, and pincode",
          });
        }
      }
    }

    // Update user profile
    const updateData = {};
    if (name) updateData.name = name;
    if (avatar) updateData.avatar = avatar;
    if (addresses) updateData.addresses = addresses;

    // Handle mess_id based on role
    if (mess_id) {
      if (user.role === "CUSTOMER" || user.role === "SUPER_ADMIN") {
        return res.status(400).json({
          success: false,
          message: "CUSTOMER and SUPER_ADMIN roles cannot have mess_id",
        });
      }

      // Validate mess_id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(mess_id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid mess_id",
        });
      }

      updateData.mess_id = mess_id;
      updateData.is_active = true; // Activate user after mess assignment
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-otp",
    }).populate("mess_id");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Resend OTP
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

    // Find user by phone (and email if SMS is disabled)
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

    // Check if user is already verified
    if (user.otp === undefined) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    // Generate new OTP
    const newOtp = generateOTP();
    user.otp = newOtp;
    await user.save();

    // Send OTP via SMS or Email
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

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const {userId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(userId).select("-otp").populate("mess_id");

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

// Get all users (for admin purposes)
export const getAllUsers = async (req, res) => {
  try {
    const {page = 1, limit = 10, role, is_active} = req.query;

    const query = {};
    if (role) query.role = role;
    if (is_active !== undefined) query.is_active = is_active === "true";

    const users = await User.find(query)
      .select("-otp")
      .populate("mess_id")
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

// Update user status (activate/deactivate)
export const updateUserStatus = async (req, res) => {
  try {
    const {userId} = req.params;
    const {is_active} = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (typeof is_active !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "is_active must be a boolean value",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {is_active},
      {new: true, select: "-otp"}
    ).populate("mess_id");

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

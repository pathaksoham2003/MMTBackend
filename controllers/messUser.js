import mongoose from "../utils/db.js";
import User from "../models/User.js";
import MessDetails from "../models/MessDetails.js";

/**
 * Create a new MESS_OWNER user
 */
export const createMessOwner = async (req, res) => {
  try {
    const { phone, email, name, is_active = true } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const user = new User({
      name,
      phone,
      email,
      role: "MESS_OWNER",
      is_active,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Mess owner created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error creating mess owner:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * Create a new DELIVERY user linked to a mess
 */
export const createDeliveryUser = async (req, res) => {
  try {
    const { phone, email, name, mess_id } = req.body;

    if (!phone || !mess_id) {
      return res.status(400).json({ success: false, message: "Phone and mess_id are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(mess_id)) {
      return res.status(400).json({ success: false, message: "Invalid mess_id" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const user = new User({
      name,
      phone,
      email,
      role: "DELIVERY",
      mess_id,
      is_active: true,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Delivery user created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error creating delivery user:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * Update MESS_OWNER active/inactive status
 */
export const updateMessOwnerStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { is_active } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "MESS_OWNER") {
      return res.status(404).json({ success: false, message: "Mess owner not found" });
    }

    user.is_active = is_active;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Mess owner status updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating mess owner status:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { is_active } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "DELIVERY") {
      return res.status(404).json({ success: false, message: "Delivery user not found" });
    }

    user.is_active = is_active;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Delivery user status updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating delivery status:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};


// helper (reuse same OTP generator from user controller if exported there)
const generateOTP = () => {
  return 1111;
  // return Math.floor(100000 + Math.random() * 900000);
};

// ========== Step 1: Login (Send OTP) ==========
export const loginMessUser = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Valid 10-digit phone number is required",
      });
    }

    // find mess owner
    let user = await User.findOne({ phone, role: "MESS_OWNER" });

    const otp = generateOTP();

    if (user) {
      // existing mess owner → update otp
      user.otp = otp;
      await user.save();
    } else {
      // not found → reject login (only mess owners allowed)
      return res.status(403).json({
        success: false,
        message: "This phone number is not registered as a Mess Owner",
      });
    }

    // TODO: integrate with your SMS/Email sendOTP helper
    console.log(`✅ OTP for Mess Owner ${phone}: ${otp}`);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: {
        phone: user.phone,
        role: user.role,
        otpSent: true,
      },
    });
  } catch (error) {
    console.error("Error in loginMessUser:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========== Step 2: Verify OTP ==========
export const verifyMessUserOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required",
      });
    }

    const user = await User.findOne({ phone, role: "MESS_OWNER" });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Mess owner not found",
      });
    }

   // normalize otp only if string
   console.log(typeof otp)
   console.log(user)
    const otpToCheck = typeof otp === "string" ? parseInt(otp, 10) : otp;

    if (user.otp !== otpToCheck) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP is valid → fetch mess details
    const messDetails = await MessDetails.findOne({ mess_owner: user._id })
      .populate("mess_owner", "-otp -__v")
      .populate("delivery_boys", "name phone");

    if (!messDetails) {
      return res.status(404).json({
        success: false,
        message: "Mess details not found for this owner",
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Mess user logged in successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          email: user.email,
          gender: user.gender,
          dob: user.dob,
        },
        mess: messDetails,
      },
    });
  } catch (error) {
    console.error("Error in verifyMessUserOTP:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

import mongoose from "../utils/db.js";
import User from "../models/User.js";

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
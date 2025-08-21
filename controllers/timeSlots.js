import TimeSlots from "../models/TimeSlots.js";
import mongoose from "mongoose";

// Create a new time slot
export const createTimeSlot = async (req, res) => {
  try {
    const { start_time, end_time, type } = req.body;

    if (!start_time || !end_time || !type) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const timeSlot = await TimeSlots.create({ start_time, end_time, type });

    res.status(201).json({
      success: true,
      message: "Time slot created successfully",
      data: timeSlot,
    });
  } catch (err) {
    console.error("Error creating time slot:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// Get all time slots
export const getTimeSlots = async (req, res) => {
  try {
    const slots = await TimeSlots.find();
    res.status(200).json({
      success: true,
      message: "Time slots fetched successfully",
      data: slots,
    });
  } catch (err) {
    console.error("Error fetching time slots:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// Get a single time slot by ID
export const getTimeSlotById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid time slot ID" });
    }

    const slot = await TimeSlots.findById(id);
    if (!slot) {
      return res.status(404).json({ success: false, message: "Time slot not found" });
    }

    res.status(200).json({ success: true, message: "Time slot fetched successfully", data: slot });
  } catch (err) {
    console.error("Error fetching time slot:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

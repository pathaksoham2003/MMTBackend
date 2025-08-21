import mongoose from "../utils/db.js";

const timeSlotsSchema = new mongoose.Schema({
  start_time: {
    type: String,
    required: true,
    match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // Validates 00:00 to 23:59
  },
  end_time: {
    type: String,
    required: true,
    match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // Validates 00:00 to 23:59
  },
  type: {
    type: String,
    enum: ["EVENING", "AFTERNOON"],
    required: true,
  },
});

export default mongoose.model("TimeSlots", timeSlotsSchema);

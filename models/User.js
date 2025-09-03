import mongoose from "../utils/db.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String, // Link to S3 or image URL
  },
  role: {
    type: String,
    enum: ["DELIVERY", "MESS_OWNER", "CUSTOMER", "SUPER_ADMIN"],
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  otp: {
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  payout_details: {
    razorpay_account_id: { type: String },
    upi_id: { type: String },   // e.g., messowner@upi
    bank_account: { type: String },
    ifsc: { type: String }
  },
  tried_mess: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessDetails',
  }]
}, { timestamps: true });

// Index for better query performance
userSchema.index({ phone: 1 });
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ is_active: 1 });

export default mongoose.model("User", userSchema);

import mongoose from "../utils/db.js";

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSubscription",
    required: true,
  },
  mess_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MessDetails",
    required: true,
  },
  mess_tiffin_contents: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MessTiffinTypeContents",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "IN_PROCESS",
      "READY",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "UN_DELIVERED",
      "RETURNED",
    ],
    default: "IN_PROCESS",
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    label: String,
  },
  delivery_boy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  payment: {
    payment_id: String,
    payment_status: String,
    amount: Number,
  },
  delivered_at: {
    type: Date,
  },
  delivery_details: {
    photo_url: {
      type: String, // URL of uploaded parcel photo
    },
    note: {
      type: String, // delivery note
    },
  },
  amount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

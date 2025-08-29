import mongoose from "../utils/db.js";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // fixed typo
    },
    mess_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessDetails",
      required: true,
    },
    day_slot: {
      type: String,
      enum: ["EVENING", "AFTERNOON"],
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()),
      set: (v) =>
        mongoose.Types.Decimal128.fromString(parseFloat(v).toFixed(2)), // fixed setter
    },
    type: {
      type: String, 
      required: true,
    },
    buffer_days: {
      type: Number,
      required: true,
    },
    provided_tiffins: {
      type: Number,
      required: true,
    },
    time_slots: [
      {
        start_time: {
          type: String,
          required: true,
          match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // HH:mm format
        },
        end_time: {
          type: String,
          required: true,
          match: /^([0-1]\d|2[0-3]):([0-5]\d)$/,
        },
      },
    ],
    veg_only: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);

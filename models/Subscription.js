import mongoose from "../utils/db.js";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    mess_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessDetails",
      required: true,
    },
    day_slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DaySlotTypes",
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()), // optional getter to convert to float
      set: (v) => v.toFixed(2), // stores exactly 2 decimals
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionTypes",
      required: true,
    },
    time_slots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlots",
        required: true,
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
  {timestamps: true}
);

export default mongoose.model("Subscription", subscriptionSchema);

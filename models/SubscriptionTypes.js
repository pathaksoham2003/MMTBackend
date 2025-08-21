import mongoose from "../utils/db.js";

const subscriptionTypesSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly"],
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
});

export default mongoose.model("SubscriptionTypes", subscriptionTypesSchema);

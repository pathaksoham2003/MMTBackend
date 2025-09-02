import mongoose from "../utils/db.js"
import Subscription from "./Subscription.js";

const userSubscriptionSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  start_date: { type: Date, default: Date.now },
  end_date: {
    type: Date,
  },
  delivery_preferences: {
    address: {
      line1: String,
      city: String,
      state: String,
      pincode: String,
      label: String
    }
  },
  total_tiffins_left: {
    type: Number,
    required: true
  },
  user_skips: [{
    date: Date,
    slot: String,
    reason: String
  }],
  mess_skips: [{
    date: Date,
    slot: String,
    reason: String
  }],
  delivery_failed: [{
    date: Date,
    slot: String,
    reason: String
  }],
  payment: {
    payment_id: String,
    payment_status: String,
    amount: Number
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

userSubscriptionSchema.pre("save", async function (next) {
  if (!this.isModified("plan_id") && !this.isNew) return next();

  const plan = await Subscription.findById(this.plan_id);
  if (!plan) return next(new Error("Subscription plan not found"));

  let totalDays = 0;

  if (plan.type.toLowerCase() === "weekly") {
    totalDays = 7;
  } else if (plan.type.toLowerCase() === "monthly") {
    totalDays = 30;
  } else {
    return next(new Error("Invalid subscription type"));
  }

  // Add buffer_days
  totalDays += plan.buffer_days;

  // Calculate final end_date
  this.end_date = new Date(this.start_date);
  this.end_date.setDate(this.end_date.getDate() + totalDays);

  next();
});


export default mongoose.model('UserSubscription', userSubscriptionSchema); 

import UserSubscription from "../models/UserSubscription.js";
import Subscription from "../models/Subscription.js";

// 📌 Create a User Subscription
export const createUserSubscription = async (req, res) => {
  try {
    const { customer_id, plan_id, delivery_preferences, payment } = req.body;

    // Fetch subscription plan
    const plan = await Subscription.findById(plan_id);
    if (!plan) return res.status(404).json({ error: "Subscription plan not found" });

    // Determine subscription days
    let durationDays = 0;
    if (plan.type === "DAILY") durationDays = 1;
    else if (plan.type === "WEEKLY") durationDays = 7;
    else if (plan.type === "MONTHLY") durationDays = 30;

    // Add buffer days
    const totalDays = durationDays + (plan.buffer_days || 0);

    // Calculate end date
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + totalDays);

    // Create user subscription
    const userSub = new UserSubscription({
      customer_id,
      plan_id,
      end_date: endDate,
      delivery_preferences,
      total_tiffins_left: plan.provided_tiffins,
      user_skips: [],
      mess_skips: [],
      delivery_failed: [],
      payment,
      is_active: true,
    });

    await userSub.save();
    res.status(201).json(userSub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 📌 Get all subscriptions for a user
export const getUserSubscriptions = async (req, res) => {
  try {
    const { customerId } = req.params;

    const subscriptions = await UserSubscription.find({ customer_id: customerId })
      .populate("plan_id") // optional: populate subscription plan details
      .lean();

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).json({ message: "No subscriptions found for this user" });
    }

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 📌 Get tiffin consumption progress of a user subscription
export const getTiffinProgress = async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    // Fetch user subscription
    const userSub = await UserSubscription.findById(subscriptionId).populate("plan_id");

    if (!userSub) {
      return res.status(404).json({ error: "User subscription not found" });
    }

    const plan = await Subscription.findById(userSub.plan_id);
    if (!plan) {
      return res.status(404).json({ error: "Subscription plan not found" });
    }

    const totalProvided = plan.provided_tiffins;
    const totalLeft = userSub.total_tiffins_left;
    const totalReceived = totalProvided - totalLeft;

    res.status(200).json({
      subscription_id: userSub._id,
      customer_id: userSub.customer_id,
      plan_id: plan._id,
      total_provided: totalProvided,
      total_received: totalReceived,
      total_left: totalLeft,
      is_active: userSub.is_active,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
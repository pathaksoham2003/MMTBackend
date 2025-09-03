import Subscription from "../models/Subscription.js";
import Tiffin from "../models/Tiffin.js";
import MessDetails from "../models/MessDetails.js";

export const getRecommendation = async (req, res) => {
  try {
    const { subscriptionType, daySlot, tiffinType } = req.query;

    if (!subscriptionType || !daySlot || !tiffinType) {
      return res.status(400).json({
        message: "subscriptionType, daySlot, and tiffinType are required",
      });
    }

    const subscription = await Subscription.findOne({
      subscription_duration: subscriptionType.toUpperCase(),
      day_slot: daySlot.toUpperCase(),
      active: true,
    }).lean();

    if (!subscription) {
      return res.status(404).json({ message: "No matching subscription found" });
    }

    const tiffin = await Tiffin.findOne({
      mess_id: subscription.mess_id,
      type: tiffinType.toUpperCase(),
      active: true,
    }).lean();

    if (!tiffin) {
      return res.status(404).json({ message: "No matching tiffin found" });
    }

    const mess = await MessDetails.findById(subscription.mess_id).lean();

    return res.json({
      subscription,
      tiffin,
      mess,
    });
  } catch (err) {
    console.error("Error in getRecommendation:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
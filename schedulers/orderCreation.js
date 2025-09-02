// schedulers/orderCreation.js
import dotenv from "dotenv";
import UserSubscription from "../models/UserSubscription.js";
import Subscription from "../models/Subscription.js";
import Order from "../models/Order.js";
import MessTiffinTypeContents from "../models/MessTiffinTypeContents.js";

dotenv.config();

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || "50", 10);

/**
 * Creates orders for a set of subscriptions
 */
async function processSubscriptions(filter) {
  let skip = 0;
  let hasMore = true;

  while (hasMore) {
    const subs = await UserSubscription.find(filter)
      .populate("plan_id")
      .limit(BATCH_SIZE)
      .skip(skip)
      .lean();

    if (subs.length === 0) break;

    // Parallel processing
    await Promise.all(
      subs.map(async (sub) => {
        try {
          if (sub.total_tiffins_left <= 0 || !sub.is_active) return;

          const plan = sub.plan_id;
          if (!plan) return;

          // Get tiffin contents for mess
          const messContents = await MessTiffinTypeContents.findOne({
            mess_id: plan.mess_id,
            type: "NORMAL", // or dynamic if needed
          });

          if (!messContents) return;

          const newOrder = new Order({
            customer_id: sub.customer_id,
            user_subscription_id: sub._id,
            mess_id: plan.mess_id,
            mess_tiffin_contents: messContents._id,
            address: sub.delivery_preferences?.address || {},
            amount: plan.price,
          });

          await newOrder.save();

          // Reduce tiffins left
          await UserSubscription.updateOne(
            { _id: sub._id },
            { $inc: { total_tiffins_left: -1 } }
          );

          console.log(`✅ Order created for subscription ${sub._id}`);
        } catch (err) {
          console.error(`❌ Error processing subscription ${sub._id}:`, err);
        }
      })
    );

    skip += subs.length;
    hasMore = subs.length === BATCH_SIZE;
  }
}

export async function morningOrders() {
  console.log("🌅 Morning Order Creation started:", new Date().toLocaleString());
  await processSubscriptions({
    is_active: true,
    total_tiffins_left: { $gt: 0 },
    plan_id: {
      $in: await Subscription.find({
        day_slot: { $in: ["AFTERNOON", "AFTERNOON+EVENING"] },
      }).distinct("_id"),
    },
  });
}

export async function afternoonOrders() {
  console.log("☀️ Afternoon Order Creation started:", new Date().toLocaleString());
  await processSubscriptions({
    is_active: true,
    total_tiffins_left: { $gt: 0 },
    plan_id: {
      $in: await Subscription.find({
        day_slot: { $in: ["EVENING", "AFTERNOON+EVENING"] },
      }).distinct("_id"),
    },
  });
}

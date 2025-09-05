import mongoose from "mongoose";
import Order from "../models/Order.js";
import UserSubscription from "../models/UserSubscription.js";
import { generateFutureOrders } from "../utils/futureOrders.js";

// --------- helpers ----------
const toInt = (v, def) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : def;
};

const startEndOfToday = () => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
};

const startEndOfMonth = (year, month) => {
  // month: 1-12
  const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const end = new Date(year, month, 1, 0, 0, 0, 0);
  return { start, end };
};

// =======================================
// CRUD
// =======================================

/** Create a new order */
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/** Get all orders (paginated optional) */
export const getOrders = async (req, res) => {
  try {
    const page = toInt(req.query.page, 1);
    const limit = toInt(req.query.limit, 10);

    const query = {}; // add filters if needed
    const total = await Order.countDocuments(query);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("customer_id user_subscription_id mess_id mess_tiffin_contents delivery_boy_id");

    res.json({ totalPages, currentPage: page, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Get order by ID */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer_id user_subscription_id mess_id mess_tiffin_contents delivery_boy_id");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Update an order */
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/** Delete an order */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================================
// Business routes
// =======================================

/** Get today's orders of a user */
export const getTodaysOrdersOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { start, end } = startEndOfToday();

    const orders = await Order.find({
      customer_id: userId,
      createdAt: { $gte: start, $lt: end },
    })
      .sort({ createdAt: -1 })
      .populate("mess_id mess_tiffin_contents delivery_boy_id");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Get computed future orders of a user (not stored in DB) */
export const getFutureOrdersOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const subs = await UserSubscription.find({
      customer_id: userId,
      is_active: true,
      total_tiffins_left: { $gt: 0 },
    }).populate("plan_id");

    let futureOrders = [];
    subs.forEach(sub => {
      const subOrders = generateFutureOrders(sub);
      futureOrders = futureOrders.concat(subOrders);
    });

    // Sort date + slot order (AFTERNOON before EVENING)
    futureOrders.sort((a, b) => {
      if (a.date === b.date) {
        const slotOrder = { AFTERNOON: 1, EVENING: 2 };
        return slotOrder[a.slot] - slotOrder[b.slot];
      }
      return new Date(a.date) - new Date(b.date);
    });

    res.json(futureOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Current delivery orders of a mess for a delivery boy (paginated) */
export const getCurrentDeliveryOrdersForDeliveryBoy = async (req, res) => {
  try {
    const { messId, deliveryBoyId } = req.query;
    const page = toInt(req.query.page, 1);
    const limit = toInt(req.query.limit, 10);

    const query = {
      mess_id: messId,
      delivery_boy_id: deliveryBoyId,
      status: { $in: ["IN_PROCESS", "OUT_FOR_DELIVERY"] },
    };

    const total = await Order.countDocuments(query);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const orders = await Order.find(query)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("customer_id mess_tiffin_contents");

    res.json({ totalPages, currentPage: page, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** All orders of a user for a given month (date-wise, paginated) */
export const getOrdersOfUserByMonth = async (req, res) => {
  try {
    const { userId } = req.params;
    const month = toInt(req.query.month, NaN); // 1-12
    const year = toInt(req.query.year, NaN);
    const page = toInt(req.query.page, 1);
    const limit = toInt(req.query.limit, 10);

    if (!Number.isFinite(month) || !Number.isFinite(year))
      return res.status(400).json({ message: "month (1-12) and year are required" });

    const { start, end } = startEndOfMonth(year, month);

    const query = {
      customer_id: userId,
      createdAt: { $gte: start, $lt: end },
    };

    const total = await Order.countDocuments(query);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const orders = await Order.find(query)
      .sort({ createdAt: 1 }) // date-wise ascending
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("mess_id mess_tiffin_contents");

    res.json({ totalPages, currentPage: page, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Place a DAILY/TRIAL order:
 * - validates subscription ownership & type
 * - (atomic) decrements total_tiffins_left
 * - prevents duplicate same-day order for the same subscription
 */
export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const {
      customer_id,
      user_subscription_id,
      mess_id,
      mess_tiffin_contents,
      amount,
      address,
      delivery_boy_id, // optional assignment
      payment,         // optional at creation
    } = req.body;

    const userSub = await UserSubscription.findById(user_subscription_id)
      .populate("plan_id")
      .session(session);

    if (!userSub) return res.status(400).json({ message: "Invalid subscription" });
    if (String(userSub.customer_id) !== String(customer_id))
      return res.status(400).json({ message: "Subscription does not belong to customer" });

    if (userSub?.plan_id && String(userSub.plan_id.mess_id) !== String(mess_id))
      return res.status(400).json({ message: "Subscription is for a different mess" });

    const planType = userSub?.plan_id?.subscription_duration;
    if (!["DAILY", "TRIAL"].includes(planType))
      return res.status(400).json({ message: "Only DAILY or TRIAL orders allowed on this route" });

    // prevent duplicate order today for this subscription
    const { start, end } = startEndOfToday();
    const existing = await Order.findOne({
      customer_id,
      user_subscription_id,
      createdAt: { $gte: start, $lt: end },
    }).session(session);

    if (existing) {
      return res.status(409).json({ message: "Order already placed for today for this subscription" });
    }

    await session.withTransaction(async () => {
      // ensure stock of tiffins in subscription
      const dec = await UserSubscription.findOneAndUpdate(
        { _id: user_subscription_id, total_tiffins_left: { $gt: 0 } },
        { $inc: { total_tiffins_left: -1 } },
        { new: true, session }
      );
      if (!dec) throw new Error("No tiffins left in subscription");

      await Order.create([{
        customer_id,
        user_subscription_id,
        mess_id,
        mess_tiffin_contents,
        amount,
        address,
        delivery_boy_id: delivery_boy_id || undefined,
        payment: payment || undefined,
        status: "IN_PROCESS",
      }], { session });
    });

    // fetch created order (last created for this sub today)
    const order = await Order.findOne({
      customer_id,
      user_subscription_id,
      createdAt: { $gte: start, $lt: end },
    }).sort({ createdAt: -1 });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

/** Mark all READY orders of a mess as OUT_FOR_DELIVERY */
export const markOrderOutForDelivery = async (req, res) => {
  try {
    const { messId } = req.params;

    const result = await Order.updateMany(
      { mess_id: messId, status: "READY" }, // only READY orders
      { $set: { status: "OUT_FOR_DELIVERY" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No READY orders found for this mess" });
    }

    res.status(200).json({
      message: `Marked ${result.modifiedCount} orders as OUT_FOR_DELIVERY for mess ${messId}`,
      updatedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Error updating orders:", err);
    res.status(400).json({ message: err.message });
  }
};

// Mark all orders of a mess as READY
export const markOrdersReadyByMess = async (req, res) => {
  try {
    const { messId } = req.params;

    const result = await Order.updateMany(
      { mess_id: messId, status: "IN_PROCESS" }, // only in process orders
      { $set: { status: "READY" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No IN_PROCESS orders found for this mess" });
    }

    return res.status(200).json({
      message: `Orders for mess ${messId} marked as READY`,
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error marking orders ready:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


/**
 * Mark order DELIVERED (accepts delivery_details and optional delivered_at)
 * body: { delivery_details: { photo_url, note }, delivered_at? }
 */
export const markOrderDelivered = async (req, res) => {
  try {
    const { id } = req.params;
    const { delivery_details, delivered_at } = req.body;

    const update = {
      status: "DELIVERED",
      delivered_at: delivered_at ? new Date(delivered_at) : new Date(),
    };
    if (delivery_details) update.delivery_details = delivery_details;

    const order = await Order.findByIdAndUpdate(id, update, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Mark order UN_DELIVERED (optionally store reason/note/photo)
 * body: { delivery_details?: { photo_url, note } }
 */
export const markOrderUndelivered = async (req, res) => {
  try {
    const { id } = req.params;
    const { delivery_details } = req.body;

    const update = { status: "UN_DELIVERED" };
    if (delivery_details) update.delivery_details = delivery_details;

    const order = await Order.findByIdAndUpdate(id, update, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/** Order history of a user (paginated, newest first) */
export const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = toInt(req.query.page, 1);
    const limit = toInt(req.query.limit, 10);

    const query = { customer_id: userId };

    const total = await Order.countDocuments(query);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("mess_id mess_tiffin_contents delivery_boy_id");

    res.json({ totalPages, currentPage: page, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import express from "express";
import {
  // CRUD
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  // Business
  getTodaysOrdersOfUser,
  getCurrentDeliveryOrdersForDeliveryBoy,
  getOrdersOfUserByMonth,
  placeOrder,
  markOrderOutForDelivery,
  markOrderDelivered,
  markOrderUndelivered,
  getOrderHistory,
  getFutureOrdersOfUser,
} from "../controllers/order.js";

const router = express.Router();

// CRUD
router.post("/", createOrder);
router.get("/", getOrders); // ?page=&limit=
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

// Business routes
router.get("/user/:userId/today", getTodaysOrdersOfUser);

router.get("/future/:userId", getFutureOrdersOfUser);

router.get("/delivery/current", getCurrentDeliveryOrdersForDeliveryBoy);
// query: ?messId=&deliveryBoyId=&page=&limit=

router.get("/user/:userId/month", getOrdersOfUserByMonth);
// query: ?month=9&year=2025&page=1&limit=10

router.post("/place", placeOrder); // DAILY/TRIAL only

router.put("/:id/out-for-delivery", markOrderOutForDelivery);
router.put("/:id/delivered", markOrderDelivered);       // body: { delivery_details?, delivered_at? }
router.put("/:id/un-delivered", markOrderUndelivered);  // body: { delivery_details? }

router.get("/user/:userId/history", getOrderHistory);   // ?page=&limit=

export default router;

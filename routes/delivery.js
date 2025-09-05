import express from "express";
import { getOrdersForDeliveryBoy } from "../controllers/delivery.js";

const router = express.Router();

// Route to fetch delivery orders for a specific delivery boy
router.get("/delivery/:deliveryBoyId", getOrdersForDeliveryBoy);

export default router;

import express from "express";
import { createUserSubscription, getTiffinProgress, getUserSubscriptions } from "../controllers/userSubscription.js";

const router = express.Router();

// POST /api/usersubscription/
router.post("/", createUserSubscription);
// Get subscriptions of a user
router.get("/:customerId", getUserSubscriptions);

// Get tiffin progress (received vs provided)
router.get("/progress/:subscriptionId", getTiffinProgress);

export default router;

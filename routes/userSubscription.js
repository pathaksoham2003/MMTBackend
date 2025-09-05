import express from "express";
import { addMessSkips, addUserSkip, createUserSubscription, getTiffinProgress, getUserSubscriptions } from "../controllers/userSubscription.js";

const router = express.Router();

// POST /api/usersubscription/
router.post("/", createUserSubscription);
// Get subscriptions of a user
router.get("/:customerId", getUserSubscriptions);

// Get tiffin progress (received vs provided)
router.get("/progress/:subscriptionId", getTiffinProgress);

// User skips (date, day_slot, reason)
router.post("/:id/user-skip", addUserSkip);

// Mess skips (date, [day_slots])
router.post("/:id/mess-skip", addMessSkips);

export default router;

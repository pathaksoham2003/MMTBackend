import express from "express";
import {
  createSubscription,
  getSubscriptions,
  toggleSubscriptionActive,
  getSubscriptionById,
} from "../controllers/subscriptions.js";

const router = express.Router();

/**
 * @route POST /api/subscriptions
 * @desc Create a subscription
 */
router.post("/", createSubscription);

/**
 * @route GET /api/subscriptions
 * @desc Get all subscriptions (pagination, filters, search)
 * Query params: page, mess_id, day_slot, veg_only, type, time_slot_id, name
 */
router.get("/", getSubscriptions);

/**
 * @route GET /api/subscriptions/:id
 * @desc Get subscription by ID
 */
router.get("/:id", getSubscriptionById);

/**
 * @route PATCH /api/subscriptions/:id/toggle
 * @desc Toggle active/inactive
 */
router.patch("/:id/toggle", toggleSubscriptionActive);

export default router;

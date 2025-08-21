import express from "express";
import {
  createSubscriptionType,
  getSubscriptionTypes,
  getSubscriptionTypeById,
} from "../controllers/subscriptionType.js";

const router = express.Router();

/**
 * @route POST /api/subscription-types
 * @desc Create a new subscription type
 */
router.post("/", createSubscriptionType);

/**
 * @route GET /api/subscription-types
 * @desc Get all subscription types
 */
router.get("/", getSubscriptionTypes);

/**
 * @route GET /api/subscription-types/:id
 * @desc Get a single subscription type by ID
 */
router.get("/:id", getSubscriptionTypeById);

export default router;

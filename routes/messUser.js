import express from "express";
import {
  createMessOwner,
  createDeliveryUser,
  updateMessOwnerStatus,
  updateDeliveryStatus,
} from "../controllers/messUser.js";

const router = express.Router();

// POST /api/users/mess-owner
router.post("/mess-owner", createMessOwner);

// POST /api/users/delivery
router.post("/delivery", createDeliveryUser);

// PATCH /api/users/mess-owner/status/:userId
router.patch("/mess-owner/status/:userId", updateMessOwnerStatus);

// PATCH /api/users/delivery/status/:userId
router.patch("/delivery/status/:userId", updateDeliveryStatus);

export default router;

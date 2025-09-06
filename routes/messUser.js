import express from "express";
import {
  createMessOwner,
  createDeliveryUser,
  updateMessOwnerStatus,
  updateDeliveryStatus,
  loginMessUser,
  verifyMessUserOTP,
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

// Step 1: Login (send OTP)
router.post("/mess-owner/login", loginMessUser);

// Step 2: Verify OTP
router.post("/mess-owner/verify-otp", verifyMessUserOTP);

export default router;

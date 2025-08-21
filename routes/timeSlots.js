import express from "express";
import { createTimeSlot, getTimeSlots, getTimeSlotById } from "../controllers/timeSlots.js";

const router = express.Router();

/**
 * @route POST /api/time-slots
 * @desc Create a new time slot
 */
router.post("/", createTimeSlot);

/**
 * @route GET /api/time-slots
 * @desc Get all time slots
 */
router.get("/", getTimeSlots);

/**
 * @route GET /api/time-slots/:id
 * @desc Get a single time slot by ID
 */
router.get("/:id", getTimeSlotById);

export default router;

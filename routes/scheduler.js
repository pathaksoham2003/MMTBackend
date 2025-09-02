import express from "express";
import {
  getSchedulerStats,
  debugScheduler,
  testOrderProcessing,
} from "../controllers/scheduler.js";

const router = express.Router();

// GET: Queue Stats
router.get("/stats", getSchedulerStats);

// GET: Debug scheduler logs
router.get("/debug", debugScheduler);

// POST: Manually process orders for a slot
router.post("/orders/:slot", testOrderProcessing);

export default router;

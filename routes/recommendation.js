// routes/recommendationRoutes.js
import express from "express";
import { getRecommendation } from "../controllers/recommendation.js";

const router = express.Router();

// GET /api/recommendations?subscriptionType=DAILY&daySlot=AFTERNOON&tiffinType=NORMAL
router.get("/", getRecommendation);

export default router;

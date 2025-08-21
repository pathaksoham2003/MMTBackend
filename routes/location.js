import express from "express";
import {
  createLocation,
  toggleLocationStatus,
  checkUserLocation,
  getAllLocations,
} from "../controllers/location.js";

const router = express.Router();

// Create a location
router.post("/", createLocation);

// Toggle active/inactive
router.patch("/:id/toggle", toggleLocationStatus);

// Check if user is in any active location
router.post("/check", checkUserLocation);

// Get all locations
router.get("/", getAllLocations);

export default router;

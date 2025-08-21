import Location from "../models/Location.js";
import { checkUserWithinLocation } from "../utils/locationUtils.js";

// Create a new location
export const createLocation = async (req, res) => {
  try {
    const { name, latitude, longitude, radius } = req.body;

    if (!name || !latitude || !longitude || !radius) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const location = await Location.create({
      name,
      coordinates: {
        type: "Point",
        coordinates: [longitude, latitude], // GeoJSON [lon, lat]
      },
      radius,
    });

    res.status(201).json({ message: "Location created successfully", location });
  } catch (error) {
    res.status(500).json({ message: "Error creating location", error: error.message });
  }
};

// Toggle active/inactive by ID
export const toggleLocationStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    location.isActive = !location.isActive;
    await location.save();

    res.json({ message: "Location status updated", location });
  } catch (error) {
    res.status(500).json({ message: "Error toggling location", error: error.message });
  }
};

// Check if user is within an active location
export const checkUserLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and Longitude are required" });
    }

    const location = await checkUserWithinLocation(latitude, longitude);

    if (location) {
      return res.json({ inside: true, location });
    }

    res.json({ inside: false, message: "User is not in any active location" });
  } catch (error) {
    res.status(500).json({ message: "Error checking location", error: error.message });
  }
};

// Get all locations
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json({ count: locations.length, locations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations", error: error.message });
  }
};

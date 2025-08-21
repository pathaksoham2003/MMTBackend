import MessDetails from "../models/MessDetails.js";
import User from "../models/User.js";
import { getSignedS3Url, uploadFileToS3 } from "../utils/s3Upload.js";
import mongoose from "mongoose";

export const createMess = async (req, res) => {
  try {
    const { mess_owner } = req.body;
    const files = req.files; // array of photos

    // Validate Mess Owner
    if (!mess_owner || !mongoose.Types.ObjectId.isValid(mess_owner)) {
      return res.status(400).json({ success: false, message: "Valid mess_owner ID is required" });
    }

    const owner = await User.findById(mess_owner);
    if (!owner || owner.role !== "MESS_OWNER") {
      return res.status(400).json({ success: false, message: "Invalid Mess Owner" });
    }

    // Parse address JSON
    let addressData;
    try {
      addressData = typeof req.body.address === "string"
        ? JSON.parse(req.body.address)
        : req.body.address;
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid address format" });
    }

    // Validate address fields
    const { line1, line2, city, state, pincode, phone } = addressData || {};
    if (!line1 || !city || !state || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        message: "All address fields (line1, city, state, pincode, phone) are required",
      });
    }

    // Upload photos to S3
    const mess_photos = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const url = await uploadFileToS3(file.path, "mess_photos");
        mess_photos.push(url);
      }
    }

    // Create Mess
    const newMess = await MessDetails.create({
      mess_owner,
      mess_photos,
      phone,
      address: {
        line1,
        line2,
        city,
        state,
        pincode,
      },
    });

    res.status(201).json({
      success: true,
      message: "Mess created successfully",
      data: newMess,
    });

  } catch (err) {
    console.error("Error creating mess:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
export const getMessById = async (req, res) => {
  try {
    const { messId } = req.params;

    // Validate messId
    if (!mongoose.Types.ObjectId.isValid(messId)) {
      return res.status(400).json({ success: false, message: "Invalid Mess ID" });
    }

    // Find Mess by ID and populate mess_owner details
    const mess = await MessDetails.findById(messId).populate("mess_owner", "name phone email avatar");

    if (!mess) {
      return res.status(404).json({ success: false, message: "Mess not found" });
    }

    // Generate signed URLs for photos
    const signedPhotos = await Promise.all(
      mess.mess_photos.map(async (key) => {
        try {
          return await getSignedS3Url(key); // default expiresIn 1 hour
        } catch (err) {
          console.error("Error generating signed URL for photo:", key, err);
          return null;
        }
      })
    );

    // Replace mess_photos array with signed URLs
    const messWithSignedPhotos = {
      ...mess.toObject(),
      mess_photos: signedPhotos.filter((url) => url !== null),
    };

    res.status(200).json({
      success: true,
      message: "Mess details fetched successfully",
      data: messWithSignedPhotos,
    });
  } catch (err) {
    console.error("Error fetching mess details:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
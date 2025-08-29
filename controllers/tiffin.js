import Tiffin from "../models/Tiffin.js";

// Create a new Tiffin
export const createTiffin = async (req, res) => {
  try {
    const { items, ...rest } = req.body;

    // Ensure items is always an array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items must be a non-empty array" });
    }

    const tiffin = new Tiffin({ items, ...rest });
    const savedTiffin = await tiffin.save();
    res.status(201).json(savedTiffin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Tiffins (with mess info)
export const getTiffins = async (req, res) => {
  try {
    const tiffins = await Tiffin.find().populate("mess_id", "name address"); // only basic mess fields
    res.status(200).json(tiffins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Tiffin by ID
export const getTiffinById = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id).populate("mess_id", "name address");
    if (!tiffin) return res.status(404).json({ message: "Tiffin not found" });
    res.status(200).json(tiffin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Tiffin by ID
export const updateTiffin = async (req, res) => {
  try {
    const { items, ...rest } = req.body;

    // If items provided, ensure it's an array
    if (items && !Array.isArray(items)) {
      return res.status(400).json({ error: "Items must be an array" });
    }

    const updatedTiffin = await Tiffin.findByIdAndUpdate(
      req.params.id,
      { items, ...rest },
      { new: true, runValidators: true }
    );

    if (!updatedTiffin) return res.status(404).json({ message: "Tiffin not found" });
    res.status(200).json(updatedTiffin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Tiffin by ID
export const deleteTiffin = async (req, res) => {
  try {
    const deletedTiffin = await Tiffin.findByIdAndDelete(req.params.id);
    if (!deletedTiffin) return res.status(404).json({ message: "Tiffin not found" });
    res.status(200).json({ message: "Tiffin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Tiffins for a specific Mess
export const getTiffinsByMessId = async (req, res) => {
  try {
    const { messId } = req.params;

    // Fetch only tiffin details (excluding mess_id)
    const tiffins = await Tiffin.find({ mess_id: messId }).select("-__v -mess_id");

    if (!tiffins || tiffins.length === 0) {
      return res.status(404).json({ message: "No tiffins found for this mess" });
    }

    res.status(200).json({
      messId,
      count: tiffins.length,
      tiffins,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

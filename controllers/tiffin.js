import Tiffin from "../models/Tiffin.js";

// Create a new Tiffin
export const createTiffin = async (req, res) => {
  try {
    const tiffin = new Tiffin(req.body);
    const savedTiffin = await tiffin.save();
    res.status(201).json(savedTiffin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Tiffins
export const getTiffins = async (req, res) => {
  try {
    const tiffins = await Tiffin.find().populate("mess_id");
    res.status(200).json(tiffins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Tiffin by ID
export const getTiffinById = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id).populate("mess_id");
    if (!tiffin) return res.status(404).json({ message: "Tiffin not found" });
    res.status(200).json(tiffin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Tiffin by ID
export const updateTiffin = async (req, res) => {
  try {
    const updatedTiffin = await Tiffin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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

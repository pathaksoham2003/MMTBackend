import TiffinTypes from "../models/TiffinTypes.js";

export const createType = async (req, res) => {
  try {
    const {name, description} = req.body;
    const tiffinType = new TiffinTypes({name: name.toUpperCase(), description});
    await tiffinType.save();
    res.status(201).json(tiffinType);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
export const getTypes = async (req, res) => {
  try {
    const tiffinTypes = await TiffinTypes.find();
    res.status(200).json(tiffinTypes);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

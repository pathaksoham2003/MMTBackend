import MessTiffinTypeContents from "../models/MessTiffinTypeContents.js";

// ✅ Create Tiffin Content
export const createTiffinTypeContents = async (req, res) => {
  try {
    const { mess_id, type, general_contents } = req.body;

    // Check if content for this mess + type already exists
    const exists = await MessTiffinTypeContents.findOne({ mess_id, type });
    if (exists) {
      return res.status(400).json({ message: "Tiffin type content already exists for this mess" });
    }

    const newContent = new MessTiffinTypeContents({
      mess_id,
      type,
      general_contents,
    });

    await newContent.save();

    return res.status(201).json(newContent);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Error creating tiffin content" });
  }
};

// ✅ Get Tiffin Content (already provided by you but adjusted a bit)
export const getTiffinTypeContents = async (req, res) => {
  try {
    const { mess_id, type } = req.query;
    const data = await MessTiffinTypeContents.findOne({ mess_id, type });

    if (!data) {
      return res.status(404).json({ message: "Tiffin content not found" });
    }

    return res.status(200).json(data.general_contents);
  } catch (e) {
    return res.status(400).json({ message: "Error with the tiffin content" });
  }
};


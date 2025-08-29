import mongoose from "../utils/db.js"

const tiffinSchema = new mongoose.Schema({
  mess_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessDetails',
    required: true
  },
  items: [
    {
      name: { type: String, required: true }, // e.g. "Roti", "Dal"
      quantity: { type: Number, required: true },
      unit: { type: String, required: true }, // e.g. "pieces", "grams", "ml"
      nutrition: { type: String }, // optional nutrition info
      protein: { type: String }    // optional protein info
    }
  ],
  type: {
    type: String,
    enum: ["NORMAL", "SPECIAL"],
    default: "NORMAL"
  },
  is_veg: {
    type: Boolean,
    required: true
  },
  photos: [
    {
      type: String // Array of S3 links 
    }
  ],
  maximum_price: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Tiffin', tiffinSchema);

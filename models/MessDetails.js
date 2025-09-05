import mongoose from "../utils/db.js"

const messDetailsSchema = new mongoose.Schema({
  mess_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mess_name: {
    type: String,
    required: true
  },
  mess_photos: [{
    type: String
  }],
  phone: {
    type: String,
    required: true
  },
  address: {
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  delivery_boys: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  open: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('MessDetails', messDetailsSchema);

import mongoose from "../utils/db.js";

const LiveTiffin = new mongoose.Schema({
    delivered_at: {
        type: Date,
    },
    mess_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MessDetails',
        required: true
    },
    day_slot: {
        type: String
    },
    type: {
        type: String,
        enum: ["NORMAL", "SPECIAL"],
        required: true,
    },
    general_contents: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            unit: { type: String, required: true },
            photo: { type: String },
            approx_nutrition_per_item: { type: mongoose.Schema.Types.Mixed },
        }
    ]
})

export default mongoose.model('LiveTiffin', LiveTiffin);

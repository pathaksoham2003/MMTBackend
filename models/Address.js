import mongoose from "../utils/db.js";

const addressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
    },
    instructions: {
      type: String,
    },
    tag: {
      type: String,
      default: "HOME",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {timestamps: true}
);

// Geo index for location queries
addressSchema.index({location: "2dsphere"});

export default mongoose.model("Address", addressSchema);

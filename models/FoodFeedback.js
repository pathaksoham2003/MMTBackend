import mongoose from "../utils/db.js"
 
const foodFeedbackSchema = new mongoose.Schema({ 
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  tiffin_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tiffin', 
    required: true 
  }, 
  feedback_image: { 
    type: String // Link to S3 
  }, 
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }, 
  comment: { 
    type: String, 
    required: true 
  }
}, {timestamps:true}); 
 
export default mongoose.model('FoodFeedback', foodFeedbackSchema); 

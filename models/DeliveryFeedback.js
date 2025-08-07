import mongoose from "../utils/db.js"
 
const deliveryFeedbackSchema = new mongoose.Schema({ 
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  feedback_image: { 
    type: String // Link to S3 
  }, 
  delivery_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
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
  }, 
}, {timestamps:true}); 
 
export default mongoose.model('DeliveryFeedback', deliveryFeedbackSchema); 

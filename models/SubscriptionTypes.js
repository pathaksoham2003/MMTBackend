import mongoose from "../utils/db.js"
 
const subscriptionTypesSchema = new mongoose.Schema({ 
  time: { 
    type: String, 
    required: true 
  }, 
  type: { 
    type: String, 
    enum: ['Daily', 'Weekly', 'Monthly'], 
    required: true 
  } 
}); 
 
export default mongoose.model('SubscriptionTypes', subscriptionTypesSchema); 

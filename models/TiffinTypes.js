import mongoose from "../utils/db.js"
 
const tiffinTypesSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    enum: ['Special', 'General'], 
    required: true 
  }, 
  description: { 
    type: String, 
    required: true 
  } 
}); 
 
export default mongoose.model('TiffinTypes', tiffinTypesSchema); 

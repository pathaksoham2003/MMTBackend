import mongoose from "../utils/db.js"
 
const daySlotTypesSchema = new mongoose.Schema({ 
  time: { 
    type: String, 
    required: true 
  }, 
  type: { 
    type: String, 
    enum: ['Evening', 'Afternoon'], 
    required: true 
  } 
}); 
 
export default mongoose.model('DaySlotTypes', daySlotTypesSchema); 

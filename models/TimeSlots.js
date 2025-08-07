import mongoose from "../utils/db.js"
 
const timeSlotsSchema = new mongoose.Schema({ 
  time: { 
    type: String, 
    required: true 
  }, 
  type: { 
    type: String, 
    enum: ['EVENING', 'AFTERNOON'], 
    required: true 
  } 
}); 
 
export default mongoose.model('TimeSlots', timeSlotsSchema); 

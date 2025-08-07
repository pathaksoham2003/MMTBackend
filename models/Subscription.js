import mongoose from "../utils/db.js"
 
const subscriptionSchema = new mongoose.Schema({ 
  day_slot: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'DaySlotTypes', 
    required: true 
  }, 
  price: { 
    type: Number, 
    required: true 
  }, 
  time_slot: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TimeSlots', 
    required: true 
  }, 
  buffer_days: { 
    type: Number, 
    required: true 
  }, 
  provided_tiffins: { 
    type: Number, 
    required: true 
  }, 
  veg_only: { 
    type: Boolean, 
    required: true 
  }, 
  created_at: { 
    type: Date, 
    default: Date.now 
  }, 
  updated_at: { 
    type: Date, 
    default: Date.now 
  } 
}); 
 
export default mongoose.model('Subscription', subscriptionSchema); 

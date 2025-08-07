import mongoose from "../utils/db.js"
 
const userSubscriptionSchema = new mongoose.Schema({ 
  customer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  plan_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subscription', 
    required: true 
  }, 
  mess_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MessDetails', 
    required: true 
  }, 
  end_date: { 
    type: Date, 
    required: true 
  }, 
  delivery_preferences: { 
    address: { 
      line1: String, 
      city: String, 
      state: String, 
      pincode: String, 
      label: String 
    } 
  }, 
  total_tiffins_left: { 
    type: Number, 
    required: true 
  }, 
  user_skips: [{ 
    date: Date, 
    slot: String, 
    reason: String 
  }], 
  mess_skips: [{ 
    date: Date, 
    slot: String, 
    reason: String 
  }], 
  delivery_failed: [{ 
    date: Date, 
    slot: String, 
    reason: String 
  }], 
  payment: { 
    payment_id: String, 
    payment_status: String, 
    amount: Number 
  }, 
  is_active: { 
    type: Boolean, 
    default: true 
  }
}, {timestamps:true}); 
 
export default mongoose.model('UserSubscription', userSubscriptionSchema); 

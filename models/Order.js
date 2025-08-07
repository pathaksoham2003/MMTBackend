import mongoose from "../utils/db.js"
 
const orderSchema = new mongoose.Schema({ 
  customer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  user_subscription_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'UserSubscription', 
    required: true 
  }, 
  mess_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MessDetails', 
    required: true 
  }, 
  tiffin_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tiffin', 
    required: true 
  }, 
  status: { 
    type: String, 
    enum: ['in_process', 'accepted', 'not_accepted', 'out_of_delivery', 'delivered', 'delivered_returned'], 
    default: 'in_process' 
  }, 
  address: { 
    line1: String, 
    line2: String, 
    city: String, 
    state: String, 
    pincode: String, 
    label: String 
  }, 
  delivery_boy_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }, 
  payment: { 
    payment_id: String, 
    payment_status: String, 
    amount: Number 
  }, 
  delivered_at: { 
    type: Date 
  }, 
  amount: { 
    type: Number, 
    required: true 
  }
}, {timestamps:true}); 
 
export default mongoose.model('Order', orderSchema); 

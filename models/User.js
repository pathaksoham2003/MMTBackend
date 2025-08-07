import mongoose from "../utils/db.js"
 
const userSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true 
  }, 
  avatar: { 
    type: String // Link to S3 or image URL 
  }, 
  role: { 
    type: String, 
    enum: ['DELIVERY', 'MESS_OWNER', 'CUSTOMER', 'SUPER_ADMIN'], 
    required: true 
  }, 
  phone: { 
    type: Number, 
    required: true, 
    unique: true 
  }, 
  mess_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MessDetails' 
  }, 
  otp: { 
    type: Number 
  }, 
  addresses: [{ 
    line1: String, 
    line2: String, 
    city: String, 
    state: String, 
    pincode: String 
  }], 
  is_active: { 
    type: Boolean, 
    default: true 
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
 
export default mongoose.model('User', userSchema); 

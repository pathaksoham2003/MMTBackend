import mongoose from "../utils/db.js"
 
const messDetailsSchema = new mongoose.Schema({ 
  mess_owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  mess_photos: [{ 
    type: String // Array of S3 links 
  }], 
  menu: { 
    special_array_of_menu_items_offered: [String] 
  }, 
  phone: { 
    type: String, 
    required: true 
  }, 
  address: { 
    line1: { type: String, required: true }, 
    line2: String, 
    city: { type: String, required: true }, 
    state: { type: String, required: true }, 
    pincode: { type: String, required: true } 
  }
}, {timestamps:true}); 
 
export default mongoose.model('MessDetails', messDetailsSchema); 

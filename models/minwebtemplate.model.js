import mongoose from "mongoose";
const SocialLinksSchema = new mongoose.Schema({
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    googleMap:{ type:String, default: "" },
  });
const UserProfileSchema=new mongoose.Schema({
   userId:{
    type: String,
    required:true,
    ref: "User"
   },
   banner: { type: [String], required: true },  
   socialLinks: { type: SocialLinksSchema, default: {} },
   logo: { type: String, required: true },    // URL or file path
   name: { type: String, required: true },
   position: { type: String, required: true },
   aboutUs: { type: String, required: true },
   call: { type: String, required: true },
   whatsapp: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   website: { type: String, default: "" },
   address: { type: String, default: "" },
},{timestamps:true})

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
export default UserProfile;
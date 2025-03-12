import mongoose, { Mongoose } from "mongoose";

const userAuthSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    token:{
        type:String,
    },
    otp:{
        type:Number,
        required:true,
    },
    businessId: {
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toHexString(),
      },
})
const userAuth=mongoose.model('User',userAuthSchema);

export default userAuth
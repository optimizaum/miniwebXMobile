import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;
// ANSI escape code for red text
const red = '\x1b[31m%s\x1b[0m';

 const connectDB = async ()=>{
    try {
        const result = await mongoose.connect("mongodb://localhost:27017/miniMobileX");
       
        if(result){
            console.log("connected to the database")
        }else{
            throw new Error("Problem connecting to the database");
        }
    } catch (error) {
        console.error(red,`Error: ${error.message}`)
    }
}

export default connectDB
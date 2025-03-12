import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import db from './db/dbconfig.js'
config();
db();
import index from './routes/index.js'

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
     return  res.status(200).json({
            message: 'Welcome to the API!'
         });
     })

app.use("/api",index)
app.listen(process.env.PORT || 7000,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${process.env.PORT}`);
})
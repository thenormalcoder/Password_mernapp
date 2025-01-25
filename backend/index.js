import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from "cors";
const app=express();

import userroute from "./route/user_route.js"
import passwroute from "./route/password_route.js"
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT=process.env.PORT ;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders:["Content-Type",
        "Authorization"]
}))
app.use(express.json());
app.use(cookieParser())

const URI=process.env.MONGODBURI;

try {
   await mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    }
    );
    console.log("connnected to mongodb")
} catch (error) {
    console.log("error: ",error);
}
// app.get("/",(req,res)=>{
//     res.send("Hello")
// })
app.use("/user",userroute);
app.use("/pass",passwroute);

app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`);
})
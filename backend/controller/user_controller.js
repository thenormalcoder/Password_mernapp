import { generateTokenAndSaveInCookies } from "../jwt/token.js";
import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";
export const signup=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashpass=await bcryptjs.hash(password,10);
        const createduser=new User({
            username:username,
            email:email,
            password:hashpass
        })
        await createduser.save();
        if(createduser){
           const token=await  generateTokenAndSaveInCookies(createduser._id,res);
            res.status(201).json({message:"user created successfully",user:{
                _id:createduser._id,
                username:createduser.username,
                email:createduser.email,
                password:createduser.password
            }
        ,token});
        }
        
       
       
    } catch (error) {
        console.log("error"+error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        const ismatchp=await bcryptjs.compare(password,user.password);
        if(!user){
             res.status(400).json({message:"Invalid username"});
        }
        else if(!ismatchp){
            res.status(400).json({message:"Invalid password"});
        }
        else{
            const token=await  generateTokenAndSaveInCookies(user._id,res);
            res.status(200).json({message:"Login successful",user:{
                _id:user._id,
                username:user.username,
                email:user.email
            },token})
        }
    } catch (error) {
        console.log("error"+error.message);
        res.status(500).json({message:"Internal server error,try again, check your credentials properly"});
    }
}

export const logout=(req,res)=>{
    try {
        res.clearCookie("jwt",{
            path:"/"
        })
        res.status(200).json({message:"user logged out successfully"});
        } catch (error) {
            console.log("error"+error.message);
            res.status(500).json({message:"error in logging out"});
    }
}
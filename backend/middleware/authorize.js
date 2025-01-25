import jwt from "jsonwebtoken"
import User from "../models/user_model.js";

export const authenticate=async(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"unauthorized user"})
    }
    try {
      const decoded=  jwt.verify(token,process.env.JWT_SECRET_KEY)
    //   console.log(decoded)

    req.user=await User.findById(decoded.userid)
    } catch (error) {
        return res.status(401).json({message:""+error.message})
    }
    next();
};

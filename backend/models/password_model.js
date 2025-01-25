import mongoose from "mongoose";
const PasswordSchema=mongoose.Schema(
    
        {
        website:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    }
    
)
const Password=mongoose.model("Password",PasswordSchema);
export default Password;
import Password from "../models/password_model.js";
export const passwords=async (req,res)=>{
    
   
    try {
        const {website,username,password}=req.body;
    const p= await Password.findOne({website})
    if(p){
        return res.status(401).json({message:"You already have password for this website(change password or websitename"})
    }
    const createdp = new Password({
        website:website,
        username:username,
        password:password,
        user:req.user._id,
    })
        await createdp.save();
        res.status(201).json({message:"Password added successfully"});
    } catch (error) {
        console.log("error"+error.message)
        res.status(400).json({message:"internal server error"})
    }
}

export const getpasswords=async(req,res)=>{
    try {
        const tpassword=await Password.find({user:req.user._id});
        res.status(201).json({message: "All passwords fetched successfully",tpassword})
    } catch (error) {
        console.log("error"+error.message)
        res.status(400).json({message:"server error in fetching password"})
    }
}

export const updatepass=async(req,res)=>{

    try {
        const tpass=await Password.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        res.status(201).json({message:" Password updated successfully",tpass})
    } catch (error) {
        console.log("error"+error.message)
        res.status(400).json({message:"server error in updating password"})
    }
}

export const deletepass=async(req,res)=>{
    try {
        await Password.findByIdAndDelete(req.params.id);
        res.status(201).json({message:" Password deleted successfully"})
    } catch (error) {
        console.log("error"+error.message)
        res.status(400).json({message:"server error in deleting password"})
    }
}
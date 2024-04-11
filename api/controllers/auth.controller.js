import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashPassword =bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashPassword});
  
    try {
        await newUser.save();
        res.status(201).json({message:"user created"})
    } catch (error) {
        next(error);
        
    }
}
export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    
    try {
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"user not found"));
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"wrong credetial"));
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:pass,...others}=validUser._doc;
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(others);
        

    } catch (error) {
        next(error);
    }
}

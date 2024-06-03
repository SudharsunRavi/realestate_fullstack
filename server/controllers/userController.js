const { errorHandler } = require("../middlewares/error");
const bcryptjs=require('bcryptjs');
const User = require("../models/userModel");
const Listing = require("../models/listingModel");

const updateUser=async(req,res)=>{
    const {id}=req.params;
    console.log(id, req.user.id)
    if(req.user.id!==id) return errorHandler(403,'You are not allowed to update other users profile');
    if(req.body.password) password=await bcryptjs.hash(req.body.password,12);
    try{
        const updatedUser=await User.findByIdAndUpdate(id, {
            $set: {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true});

        const {password,...others}=updatedUser._doc;
        return res.status(200).json(others)
    }catch(error){
        return errorHandler(500,error.message);
    }

}

const deleteUser=async(req,res)=>{
    const {id}=req.params;
    if(req.user.id!==id) return errorHandler(403,'You are not allowed to delete other users profile');
    try{
        await User.findByIdAndDelete(id);
        res.clearCookie('token');
        return res.status(200).json({message:"User has been deleted"});
    }catch(error){
        return errorHandler(500,error.message);
    }
}

const userListing=async(req,res)=>{
    const {id}=req.params;
    if(req.user.id!==id) return errorHandler(403,'You are not allowed to view other users profile');
    try{
        const listing=await Listing.find({userRef:id});
        return res.status(200).json(listing);
    }catch(error){
        return errorHandler(500,error.message);
    }
}

module.exports={updateUser, deleteUser, userListing}


const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");

const regsiter=async(req,res,next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json("User registered successfully");
    } catch (error) {
        next(error);
    }

}
    

module.exports={regsiter}
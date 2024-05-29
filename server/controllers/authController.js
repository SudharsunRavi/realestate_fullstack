const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { errorHandler } = require("../middlewares/error");

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

const login=async(req,res,next)=>{
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "Email doesn't exist"));

        const correctPassword=await bcryptjs.compare(password, validUser.password);
        if(!correctPassword) return next(errorHandler(400, "Invalid credentials"));

        const {password: userPassword, ...information} = validUser._doc;

        const token=jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: "30d"});
        res.cookie("token", token, {httpOnly: true}).status(200).json(information);
    } catch (error) {
      next(error);  
    }
}

const googleLogin=async(req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(user){
            const token=jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});
            const {password: userPassword, ...information} = user._doc;
            res.cookie("token", token, {httpOnly: true}).status(200).json(information);
        }else{
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(generatedPassword, 12);
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token=jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});
            const {password: userPassword, ...information} = user._doc;
            res.cookie("token", token, {httpOnly: true}).status(200).json(information);
        }
    } catch (error) {
        next(error);
    }
}
    

module.exports={regsiter, login, googleLogin}
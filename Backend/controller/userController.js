const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async(req, res)=>{
   const {name, email, password, pic} = req.body; 

   if(!name || !email || !password){
    res.status(400);
    throw new Error("Please enter all details");
   }

   const userExists = await User.findOne({email});
   if(userExists){
    res.status(400);
    throw new Error("User exist");
   }
   
   const user = await User.create({
    name,
    email,
    password,
    pic,
   });

   if(user){
    res.status(201).json({
        _id : user.id,
        name : user.name,
        email : user.email,
        pic: user.pic,
        token : generateToken(user._id),
    });
   }else{
     throw new Error("failed to create user");
   }
  
});

const authUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
  
    if(user && (await user.matchPassword(password))){
      res.json({
        _id : user.id,
        name : user.name,
        email : user.email,
        pic: user.pic,
        token : generateToken(user._id),
      })
    }
});

const allUser = asyncHandler(async(req, res)=>{
    const keyword = req.query.search ? {
     $or : [
      {name : {$regex:req.query.search, $options: "i"}},
      {email :{$regex:req.query.search, $options: "i"}}
     ]
    } : {}

    const user = await User.find(keyword).find({_id:{$ne : req.user.id}});
    res.send(user);
}) 

module.exports = {registerUser, authUser, allUser};
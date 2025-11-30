const express = require("express")
const authrouter = express.Router()
const User = require ("../model/user.model.js");
const { validator_singup } = require("../utils/validator.js")

authrouter.post("/singup",async (req,res) =>{
  try {
    validator_singup(req)
    const {firstname,lastname,emailID,password} = req.body
    const Hashpassword = await bcrypt.hash(password,10)
    const user = new User({
      firstname,
      lastname,
      emailID,
      password : Hashpassword
    })
    await user.save();
    res.status(200).json({
      message : "you are registered"
    });
  }catch(err){
    res.status(400).json({
      message : err.message
    });
  }
});


authrouter.post("/login",async(req,res)=>{
  try{
    const {emailID,password} = req.body
    const user = await User.findOne({emailID})
    if(!user){
      throw new Error("not valie emailid")
    }
    const ispasswordvalid = await user.becriptpassword() 
    if(!ispasswordvalid){
      throw new Error("enter the correct password")
    }
    const token = await user.getjwt() 
    res.cookie("token",token,{
      expires : new Date(Date.now() + 1 * 3600000)
    }).status(200).json({
      message : "login succesfully"
    })
  }catch(err){
    res.status(400).json({
      message : err.message
    })
  }
})

authrouter.post("/logout",async(req,res)=>{ 
    try{
        res.cookie("token",null,{
            expires : new Date(now.Date())
        })
        .status(200).json({
            message : "logout succesfully"
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

module.exports = { authrouter } 


const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database");
const User = require ("./model/user.model.js");
const { message } = require("statuses");
const isvalidator = require("./utils/validator.js")
const bcrypt = require("bcrypt")
const cookieisparser = require("cookie-parser") 
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middleware/auth.js")
const PORT = process.env.PORT || 3000;



app.use(express.json())
app.use(cookieisparser())
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

app.post("/singup",async (req,res) =>{
  try {
    isvalidator(req)
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


app.post("/login",async(req,res)=>{
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



app.get("/profile",userAuth,async (req,res)=>{
  try{
    const user = req.user
    res.status(200).json(user)
  }catch(err){
    res.status(400).json({
      message : err.message
    })
  }
})

app.get("/connectionrequiest",userAuth,async(req,res)=>{
  try{
    const user = req.user
    res.status(200).json({
      message : user.firstname + "send the request"
    })
  }catch(err){
    res.status(400).json({
      message : err.message
    })
  }
})

connectDB()
  .then(()=>{
     app.listen(PORT,() =>{
      console.log(`server is sucssesfully listen to the port ${PORT}`);
    });
  })
  .catch((err)=>{
    console.error("error can not connected to DB!!!");
  });


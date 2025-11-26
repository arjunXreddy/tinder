const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database");
const User = require ("./model/user.model.js");
const { message } = require("statuses");
const isvalidator = require("./utils/validator.js")
const bcrypt = require("bcrypt")
const PORT = process.env.PORT || 3000;



app.use(express.json())
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
    const user = await User.findOne(emailID)
    if(!user){
      throw new Error("not valie emailid")
    }
    const ispasswordvalid = await bcrypt.compare(password,user.password)
    if(!ispasswordvalid){
      throw new Error("enter the correct password")
    }else{
      res.status(200).json({
        message : "login succesfully"
      })
    }
  }catch(err){
    res.status(400).json({
      message : err.message
    })
  }
})


app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailID;
  try {
    const user = await User.findOne({emailID : userEmail});
    if(!user){
      throw new Error("user is not found")
    }else{
      res.status(200).json(user);
    }
  }catch(err){
    res.status(400).json({
      message : err.message
    });
  }
});


app.get("/feed",async(req,res)=>{
  const userEmail = req.body.emailID;
  try{
    const user = await User.find({});
    if(user.length === 0){
      throw new Error("No data found")
    }else{
      res.status(200).json(user);
    }
  }catch(err){
    res.status(400).json({
      message : "something went wrong"
    });
  }
});


app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{
    const users = await User.findById(userId);

    // if(!users){
    //   res.status(404).json({
    //     message : "user is not found"
    //   });

    await User.findByIdAndDelete(userId)
    res.status(200).json({
      message : "user deleted succesfully"
    });

  }catch(err){
    res.status(400).json({
      message : "something went wrong"
    });
  } 
});


app.patch("/user-data/:userID",async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body; 
  try{
    
    const cheackuser = await User.findById(userId);
    if(!cheackuser){
      res.status(404).json({
        message : "user is not found"
      });
    }


    const Allowed_update = ["Password","skill","Gender","about","age"]
    const IsupdateAllowed = Object.keys(data).every((k)=>{
      Allowed_update.includes(k)
    })
    if(!IsupdateAllowed){
      throw new Error("Update Not Allowed")
    };
    
    await User.findByIdAndUpdate(userId,data,{
      returnDocument : "after",
      runValidators : true
    })

    res.status(200).json({
      message : "updated successfully"
    }) 

  }catch(err){
    res.status(400).json({
      message : "something went wrong"
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


const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database");
const User = require ("./model/user.js");
const { message } = require("statuses");
const PORT = process.env.PORT || 3000;



app.use(express.json())
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

app.post("/singup",async (req,res) =>{
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully ");
  }catch(err){
    res.status(400).json({
      message : "something went wrong"
    });
  }
});



app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailID;
  try {
    const user = await User.findOne({emailID : userEmail});
    if(!user){
      res.status(404).json({
        message : "user is not found"
      })
    }else{
      res.status(200).json(user);
    }
  }catch(err){
    res.status(400).json({
      message : "something went wrong"
    })
  }
})


app.get("/feed",async(req,res)=>{
  const userEmail = req.body.emailID;
  try{
    const user = await User.find({});
    if(user.length === 0){
      req.status(404).json({
        message : "no user found"
      });
    }else{
      res.status(200).json(user)
    }
  }catch(err){
    res.status(400).json({
      message : "something went wrong"
    });
  }
})


connectDB()
  .then(()=>{
     app.listen(PORT,() =>{
      console.log(`server is sucssesfully listen to the port ${PORT}`)
    })
  })
  .catch((err)=>{
    console.error("error fuck!!!")
  })


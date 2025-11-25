const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database");
const User = require ("./model/user.js")
const PORT = process.env.PORT || 3000;

app.post("/singup",async (req,res) =>{
    const user = new User ({
        firstName : "Arjun",
        lastName : "Reddy",
        emailID : "Arjun@Reddy.com",
        password : "Arjun@123",
        age : 18,
    })
    try {
      await user.save()
      res.send("user added successfully ")
    }
    catch(err){
      res.status(400).json({
        message : "something went wrong"
      })
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


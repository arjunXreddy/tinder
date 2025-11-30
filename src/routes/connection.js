const express = require("express")
const connectionRouter = express.Router()
const { userAuth } = require("../middleware/auth.js")

connectionRouter.get("/connectionrequiest",userAuth,async(req,res)=>{
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


module.exports = { connectionRouter }
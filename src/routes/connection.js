const express = require("express")
const connectionRouter = express.Router()
const { userAuth } = require("../middleware/auth.js")
const { connectionRequest } = require("../model/conectionRequest.js")
const User = require ("../model/user.model.js");

connectionRouter.get("/request/send/:status/:toUserID",userAuth,async(req,res)=>{
  try{
    const fromUserID = req.user._id;
    const toUserID = req.params.toUserID;
    const connectionStatus = req.params.status;

    const fromUser = await User.findById({_id : req.user._id});
    const toUser = await User.findById({_id:req.params.toUserID});

    if (!fromUser || !toUser) {
      return res.status(404).json({ 
        message: "One or both users not found" 
      });
    }
    
    const isallowed = ["ignore","intrested"]
    if(!isallowed.includes(connectionStatus.toLowerCase())){
      return res.status(400).json({
        message : "wrong status"
      })
    }

    const existingConnectionRequest = await connectionRequest.findOne({
      $or : [
        {fromUserID , toUserID},
        {fromUserID : toUserID ,toUserID : fromUserID}
      ]
    })
    
    if(existingConnectionRequest){
      return res.status(400).json({
        message : "request already exist"
      })
    }

    const  connectctionRequest = new connectctionRequest({
      fromUserID,
      toUserID,
      connectionStatus
    })

    const data = await connectctionRequest.save();  
    res.status(200).json({
      message : req.user.firstname + "is" + connectionStatuss + "in" + toUserID.firstname
    })
  }catch(err){
    res.status(400).json({
      message : err.message
    })
  }
})


module.exports = { connectionRouter }
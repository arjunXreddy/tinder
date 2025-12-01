const express = require("express")
const profileRouter = express.Router()
const { userAuth } = require("../middleware/auth.js")
const { validator_update,validator_update_data } = require("../utils/validator.js")

profileRouter.get("/profile/view",userAuth,async (req,res)=>{
  try{
    const user = req.user
    res.status(200).json(user)
  }catch(err){
    res.status(400).json({
      message : err.message
    })
  }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        validator_update(req)
        validator_update_data(req)
        const logedinuser = req.user  
        Object.keys(req.body).forEach(key => logedinuser[key] = req.body[key])
        await logedinuser.save()
        res.status(200).json({
            message : "user data updated succesfully",
            data : logedinuser
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})


profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        
    }catch(err){
        res.status(404).json({
            message : err.message
        })
    }
})

module.exports = { profileRouter }
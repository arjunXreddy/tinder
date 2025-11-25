const mogoose = require("mongoose")

const userSchema = new mogoose.Schema({
    firstNmae : {
        type : String,
    },
    lastName : {
        type : String, 
    },
    emailID : {
        type : String, 
    },
    password : {
        type : String, 
    },
    age : {
        type : Number, 
    },
    gender : {
        type : String,
    }
})

module.exports = mogoose.model("user",userSchema) 



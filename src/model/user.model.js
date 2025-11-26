const mogoose = require("mongoose")
const validator = require("validator")

const userSchema = new mogoose.Schema({
    firstNmae : {
        type : String,
        require : true,
        mixlength : 4,
        maxlength : 20
    },
    lastName : {
        type : String, 
    },
    emailID : {
        type : String,
        require : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("please enter valied email address")
            }
        }
    },
    password : {
        type : String, 
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("plz enter a strong password") 
            }
        }
    },
    age : {
        type : Number, 
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!([male,female,other].includes(value))){
                throw new Error("plz give correct email address")
            }
        }
    },
    about : {
        type : String,
        default : "Thing Given in the about "
    },
    skill : {
        type : [String]
    }
},
{
    timestamps : true
})

module.exports = mogoose.model("user",userSchema) 



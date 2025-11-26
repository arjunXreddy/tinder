const mogoose = require("mongoose")

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
            if (!(value.includes("@"))){
                throw new Error("plz enter correct email address")
            }
        } 
    },
    password : {
        type : String, 
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
    }
},
{
    timestamps : True
})

module.exports = mogoose.model("user",userSchema) 



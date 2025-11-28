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


userSchema.method.getjwt = function (){
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{
      expiresIn : "7d",
    }) 
    return token 
}


userSchema.method.decriptpassword = function (passwordinputbyuser){
    const user = this
    const hashpassword = user.password
    const ispasswordvalid = bcrypt.compare(passwordinputbyuser,hashpassword)
    return ispasswordvalid
}

module.exports = mogoose.model("user",userSchema) 



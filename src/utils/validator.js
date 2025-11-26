const validator = require("validator")


const validator_singup = (req) =>{
    const {firstname,lastname,emailID,password} = req.body;

    if(!firstname || !lastname){
        throw new Error("name is not valied")
    }else if (!(validator.isEmail(emailID))){
        throw new Error("Email is not valid")
    }else if(!(validator.isStrongPassword(password))){
        throw new Error("password is not strong")
    }
}

module.exports = validator_singup
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

const validator_update = (req) => {
    const allowedupdate = ["firstname","lastName","age","gender","about","skill"]
    const isallowed = Object.key(req.body).every( (fields)=> allowedupdate.include(fields))
    if(!isallowed){
        throw new Error("you cant update this feed")
    }
}

const validator_update_data = (req) => {
    const {firstname,lastname,age,gender,about,skill} = req.body
    if(!firstname || !lastname){
        throw new Error("not valid name")
    }else if(NaN(age)){
        throw new Error("age is not a number")
    }else if(!(["male","female","other"].includes(age))){
        throw new Error("wrong gender")
    }else if (about.length() == 0){
        throw new Error("must something put in the about")
    }else if (skill.length() == 0){
        throw new Error("put some thing in the skills")
    }
}

module.exports = {validator_singup,validator_update,validator_update_data}
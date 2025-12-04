const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("no token found");
    }
    const decodededdata = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodededdata) {
      throw new Error("invalied Token");
    }
    const { _id } = decodededdata;
    const user = await User.findbyID(_id);
    if (!user) {
      throw new Error("no user found");
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  userAuth,
};

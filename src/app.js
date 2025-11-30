const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database.js");
const { message } = require("statuses");
const cookieisparser = require("cookie-parser") 
const PORT = process.env.PORT || 3000;



app.use(express.json())
app.use(cookieisparser())
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

const {authrouter} = require("./routes/auth.js")
const {connectionRouter} = require("./routes/connection.js")
const {profileRouter} = require("./routes/profile.js")


app.use("/",authrouter)
app.use("/",connectionRouter)
app.use("/",profileRouter)



connectDB()
.then(()=>{
  app.listen(PORT,() =>{
    console.log(`server is sucssesfully listen to the port ${PORT}`);
  });
})
.catch((err)=>{
  console.error("error can not connected to DB!!!");
});


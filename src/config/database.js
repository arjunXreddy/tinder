const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("connected to the db")
};

module.exports = connectDB;

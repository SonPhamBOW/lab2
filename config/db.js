const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connect to mongodb successful!");
    });
  } catch (error) {
    console.log(`Connect failed, Error: ${error.message}`);
    process.exit(1)
  }
};

module.exports = connectDB;

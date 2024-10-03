const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error while connecting to the database:", error.message);
    process.exit(1);
  }
};

module.exports = connectionDB;

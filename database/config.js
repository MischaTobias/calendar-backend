const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB Online");
  } catch (err) {
    console.log(err);
    throw new Error("DB Initialization Error");
  }
};

module.exports = { dbConnection };

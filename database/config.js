const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    console.log("Connecting to DB...");
    const { DB_URI } = process.env;
    await mongoose.connect(DB_URI);

    console.log("DB Online");
  } catch (err) {
    console.log(err);
    throw new Error("DB Initialization Error");
  }
};

module.exports = { dbConnection };

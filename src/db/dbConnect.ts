const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to Database");
    })
    .catch((error: Error) => {
      console.log("Unable to connected to Database");
      console.error(error);
    });
}

module.exports = dbConnect;
export {};

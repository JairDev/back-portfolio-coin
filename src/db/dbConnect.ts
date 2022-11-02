import { config } from "dotenv";
import mongoose from "mongoose";

config({ path: "/home/alfredo/Documentos/projects/back-coin-api/src/.env" });
const DB_URL = process.env.DB_URL as string;

async function dbConnect() {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Successfully connected to Database");
    })
    .catch((error) => {
      console.log("Unable to connected to Database");
      console.error(error);
    });
}

export default dbConnect;

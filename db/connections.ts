import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL as string);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error connecting to the database:", err);
    process.exit(1);
  }
}

import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./models/userModel.js";

dotenv.config();

async function run() {
  try {
    // connect to your DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Replace this with the decoded JWT id
    const userId = "68ae08dbb15319f68e5b32de";

    const user = await userModel.findById(userId);

    if (user) {
      console.log("✅ User found:", user);
    } else {
      console.log("❌ No user found with id:", userId);
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();

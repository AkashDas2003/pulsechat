import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB database connected`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // stop the server — no point running without a DB
  }
};
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo DB successfully.");
  } catch (e) {
    console.error("Failed to connect to mongo DB");
    process.exit(1);
  }
}
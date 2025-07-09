// MongoDB connection
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000 });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });
    if (error.name === "MongoServerSelectionError") {
      console.error("Check your network connection.");
    } else if (error.name === "MongoParseError") {
      console.error("Invalid connection string.");
    } else if (error.name === "MongoError" && error.code === 18) {
      console.error("Authentication failed.");
    }
    process.exit(1);
  }
};

export default connectDB;

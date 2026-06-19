import mongoose from "mongoose";

let mongoConnected = false;

export const usingMongo = () => mongoConnected;

export function markMongoUnavailable(error) {
  if (!mongoConnected) return;

  mongoConnected = false;
  console.warn("MongoDB became unavailable. Switching to in-memory demo data.");
  if (error?.message) {
    console.warn(error.message);
  }
}

export async function connectDb() {
  if (!process.env.MONGO_URI) {
    console.log("No MONGO_URI found. Using in-memory demo data.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000
    });
    mongoConnected = true;
    console.log("MongoDB connected.");
  } catch (error) {
    mongoConnected = false;
    console.warn("MongoDB connection failed. Using in-memory demo data instead.");
    console.warn(error.message);
  }
}

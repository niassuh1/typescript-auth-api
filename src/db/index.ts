import mongoose from "mongoose";

export async function connect() {
  const connection = await mongoose.connect("mongodb://localhost:27017/auth");
  if (connection) {
    console.log("MongoDB Connected");
  }
}

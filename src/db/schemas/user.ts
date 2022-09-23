import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    password: String,
  },
  { timestamps: { createdAt: true }, id: true }
);

export const User = model("user", userSchema);

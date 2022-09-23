import { RequestHandler } from "express";
import { User } from "../../../db/schemas/user";

export const userExits: RequestHandler = async (req, res, next) => {
  const { name } = req.body.user;
  const existingUser = await User.findOne({ name: name });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  next();
};

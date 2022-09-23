import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../../db/schemas/user";
const authr = express.Router();
import crypto from "crypto";
import { token } from "./middlewares/token";
import bcrypt from "bcrypt";
import { userExits } from "./middlewares/user-exists";
import { userNotFound } from "./middlewares/user-not-found";
crypto.randomBytes(64).toString("base64");

authr.post("/register", userExits, async (req, res) => {
  // Get the user from the request
  const { name, password } = req.body.user;

  // Generate salt, and hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save to MongoDB database
  const user = new User({ name, password: hashedPassword });
  const u = await user.save();

  // Return the user object
  res.status(201).send(u.toObject());
});

authr.post("/login", userNotFound, async (req, res) => {
  // Get the user from the request
  const auth = req.body.user;

  // Get the user
  const user = await User.findOne({
    name: auth.name,
  });

  // Compare passwords
  if (await bcrypt.compare(auth.password, user.password)) {
    const token = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET);
    return res.json({ token });
  } else {
    return res.status(400).json({ error: "Password incorrect" });
  }
});

authr.get("/user", token, async (req, res) => {
  // Get the token
  const token = req.body.token;
  // Decode it
  const user = jwt.decode(token);
  res.json(user);
});

export default authr;

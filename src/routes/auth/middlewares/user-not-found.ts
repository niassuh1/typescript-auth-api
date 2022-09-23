import { RequestHandler } from "express";
import { User } from "../../../db/schemas/user";

export const userNotFound: RequestHandler = async (req, res, next) => {
  const user = req.body.user;
  const userDb = await User.findOne({ name: user.name });
  if (userDb) {
    return next();
  }

  res.sendStatus(404);
};

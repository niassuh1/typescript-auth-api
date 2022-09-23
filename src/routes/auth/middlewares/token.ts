import { RequestHandler } from "express";

/**
 * If token does not exist, then send a 401 response code
 */
export const token: RequestHandler = (req, res, next) => {
  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }
  req.body = { token };
  next();
};

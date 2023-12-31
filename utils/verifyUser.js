import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies)
  console.log(token)

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(process.env.SECRET)
    console.log(err)
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    console.log(req.user)
    next();
  });
};
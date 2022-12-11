import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../secretKey.js";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers.authorization?.split(" ")[1]

  const jwtPayload = <any>jwt.verify(token, SECRET_KEY);

  if (!jwtPayload) throw Error("Not authorized!");

  const { userId, email, role } = jwtPayload;

  const newToken = jwt.sign({ userId, email, role }, SECRET_KEY, {
    expiresIn: "1 day",
  });
  res.setHeader("token", newToken);

  next();
};

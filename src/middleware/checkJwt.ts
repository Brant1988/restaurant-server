import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = process.env.SECRET_KEY;
  const token = <string>req.headers.authorization?.split(" ")[1];

  const jwtPayload = <any>jwt.verify(token, secretKey);

  if (!jwtPayload) throw Error("Not authorized!");

  const { userId, email, role } = jwtPayload;

  const newToken = jwt.sign({ userId, email, role }, secretKey, {
    expiresIn: "1 day",
  });
  res.setHeader("token", newToken);

  next();
};

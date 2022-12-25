import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers.authorization?.split(" ")[1];

    const jwtDecoded = <any>jwt.decode(token);

    const { role } = jwtDecoded;

    if (role !== requiredRole) throw Error("You have no access");

    next();
  };
};

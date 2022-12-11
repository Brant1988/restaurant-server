import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "../secretKey.js";

const prisma = new PrismaClient();

const signJwt = (id: number, email: string, role: string) => {
  return jwt.sign({ id, email, role }, SECRET_KEY, {
    expiresIn: "1 day",
  });
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const candidate = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (candidate) throw Error("Пользователь существует");
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    const token = signJwt(user.id, user.email, user.role);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw Error("Пользователь не найден");

    const isPassWordCorrect = await bcrypt.compare(password, user.password);

    if (!isPassWordCorrect) throw Error("Пароль неверный");

    const token = signJwt(user.id, user.email, user.role);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
};

import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await prisma.category.findMany();
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const response = await prisma.category.create({
      data: {
        name,
      },
    });
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const categoryId = parseInt(id)
    const response = await prisma.category.delete({
      where: {
        id: categoryId
      }
    });
    
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

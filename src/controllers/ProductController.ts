import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.query;

    let response;
    if (categoryId) {
      const catId = parseInt(categoryId as string);
      response = await prisma.product.findMany({
        where: {
          categoryId: catId,
        },
      });
    } else {
      response = await prisma.product.findMany();
    }
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const catId = parseInt(categoryId);
    
    const response = await prisma.product.create({
      data: {
        name,
        description,
        price,
        img: req.file?.fieldname as string,
        category: {
          connect: {
            id: catId,
          },
        },
      },
      include: {
        category: true,
      },
    });
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const productId = parseInt(id)
    const response = await prisma.product.delete({
      where: {
        id: productId
      }
    });
    
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

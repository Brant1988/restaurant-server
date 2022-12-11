import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories
} from "../controllers/CategoryController.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { checkRole } from "../middleware/checkRole.js";

const categoryRouter = express.Router();

categoryRouter.get("/category", getCategories);
categoryRouter.post("/category/add", checkJwt, checkRole("ADMIN"), createCategory);
categoryRouter.delete("/category/delete",checkJwt, checkRole("ADMIN"), deleteCategory)

export default categoryRouter;

import express from "express";
import categoryRouter from "./CategoryRouter.js";
import productRouter from "./ProductRouter.js";
import userRouter from "./UserRouter.js";

const router = express.Router();

router.use("/", categoryRouter);
router.use("/", productRouter);
router.use("/", userRouter);

export default router;

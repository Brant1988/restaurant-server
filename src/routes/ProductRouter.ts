import express from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  deleteProduct,
  getProducts
} from "../controllers/ProductController.js";
import { checkJwt } from "../middleware/checkJwt.js";
import { checkRole } from "../middleware/checkRole.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(process.cwd() + "/static"))
  },
  filename: function (req, file, cb) {
   
    cb( null, file.originalname + '-' + Date.now()+".jpg");
  }
})
const upload = multer({ storage: storage })

const productRouter = express.Router();

productRouter.get("/product", getProducts);
productRouter.post(
  "/product/add",
  checkJwt, checkRole("ADMIN"),
  upload.single("file"),
  createProduct
);
productRouter.delete("/product/delete",  checkJwt, checkRole("ADMIN"),
upload.single("file"),deleteProduct)

export default productRouter;

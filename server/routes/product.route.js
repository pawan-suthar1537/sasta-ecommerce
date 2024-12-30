import express from "express";
import {
  AddProduct,
  GetAllProducts,
} from "../controller/product.controller.js";
import { Auth } from "../middlewares/auth.js";
import Upload from "../middlewares/multer.js";

const ProductROuter = express.Router();

ProductROuter.post("/add", Auth, Upload.array("image"), AddProduct);
ProductROuter.post("/get", GetAllProducts);

export default ProductROuter;

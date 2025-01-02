import express from "express";
import {
  AddProduct,
  GetAllProducts,
  GetAllProductsbyCat,
} from "../controller/product.controller.js";
import { Auth } from "../middlewares/auth.js";
import Upload from "../middlewares/multer.js";

const ProductROuter = express.Router();

ProductROuter.post("/add", Auth, Upload.array("image"), AddProduct);
ProductROuter.post("/get", GetAllProducts);
ProductROuter.post("/getbyid", GetAllProductsbyCat);

export default ProductROuter;

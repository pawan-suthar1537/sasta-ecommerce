import express from "express";
import {
  AddProduct,
  DeleteProductById,
  GetAllProducts,
  GetAllProductsbyCat,
  GetProductbyCategoryandSuncategoryId,
  GetProductDetailsbyid,
  SerchProduct,
  UpdateProductByID,
} from "../controller/product.controller.js";
import { Auth } from "../middlewares/auth.js";
import Upload from "../middlewares/multer.js";

const ProductROuter = express.Router();

ProductROuter.post("/add", Auth, Upload.array("image"), AddProduct);
ProductROuter.post("/get", GetAllProducts);
ProductROuter.post("/search", SerchProduct);
ProductROuter.post("/getbyid", GetAllProductsbyCat);
ProductROuter.post("/getbycidsid", GetProductbyCategoryandSuncategoryId);
ProductROuter.post("/getDetails", GetProductDetailsbyid);
ProductROuter.put("/update", Upload.array("image"), UpdateProductByID);
ProductROuter.delete("/delete", DeleteProductById);

export default ProductROuter;

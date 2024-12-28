import express from "express";
import {
  AddSubcategory,
  getAllSubcategory,
} from "../controller/subcategory.controller.js";
import { Auth } from "../middlewares/auth.js";
import Upload from "../middlewares/multer.js";
const subcategoryRouter = express.Router();

subcategoryRouter.post(
  "/addsubcategory",
  Auth,
  Upload.single("image"),
  AddSubcategory
);
subcategoryRouter.get(
  "/getallsubcategory",
  Auth,

  getAllSubcategory
);

export default subcategoryRouter;

import express from "express";
import {
  AddSubcategory,
  DeleteSubcategory,
  getAllSubcategory,
  UpdateSubcategory,
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

  getAllSubcategory
);
subcategoryRouter.put(
  "/updatesubcategory",
  Auth,
  Upload.single("image"),

  UpdateSubcategory
);
subcategoryRouter.delete(
  "/deletesubcategory",
  Auth,

  DeleteSubcategory
);

export default subcategoryRouter;

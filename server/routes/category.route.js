import express from "express";
import { CreateCategory } from "../controller/category.controller.js";
import { Auth } from "../middlewares/auth.js";
import Upload from "../middlewares/multer.js";
const CategoryRouter = express.Router();

CategoryRouter.post(
  "/add_category",
  Auth,
  Upload.single("image"),
  CreateCategory
);

export default CategoryRouter;

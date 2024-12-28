import mongoose from "mongoose";
import Subcategorymodel from "../models/subcategory-model.js";
import { uploadSubCategoryImage } from "../utils/imageuploadcloudinary.js";

export const AddSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const image = req.file;
    if (!name || !image || !category) {
      return res.status(400).json({
        message: "Please provide all fields",
        success: false,
      });
    }

    const categoryArray = Array.isArray(category)
      ? category
      : JSON.parse(category);

    if (!categoryArray.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res
        .status(400)
        .json({ message: "Invalid category IDs", success: false });
    }

    const upload = await uploadSubCategoryImage(image, name);
    if (!upload) {
      return res
        .status(400)
        .json({ message: "Image upload failed", success: false });
    }

    const payload = {
      name,
      image: upload.secure_url,
      category: categoryArray,
    };

    const subcategory = await Subcategorymodel.create(payload);
    await subcategory.save();
    res.status(201).json({
      message: "Subcategory created successfully",
      success: true,
      data: subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const getAllSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategorymodel.find({})
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).json({
      message: "Subcategory fetched successfully",
      success: true,
      data: subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

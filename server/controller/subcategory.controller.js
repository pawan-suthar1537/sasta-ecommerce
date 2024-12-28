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

export const UpdateSubcategory = async (req, res) => {
  try {
    const { _id, name, category } = req.body;

    const image = req.file;
    if (!_id) {
      return res.status(400).json({
        message: "Please provide _id for update",
        success: false,
      });
    }

    const checksub = await Subcategorymodel.findById(_id);
    if (!checksub) {
      return res
        .status(404)
        .json({ message: "Subcategory not found", success: false });
    }

    const payload = {};

    if (name) {
      payload.name = name;
    }

    if (category) {
      const categoryArray = Array.isArray(category)
        ? category
        : JSON.parse(category);

      if (!categoryArray.every((id) => mongoose.Types.ObjectId.isValid(id))) {
        return res
          .status(400)
          .json({ message: "Invalid category IDs", success: false });
      }
      payload.category = categoryArray;
    }

    if (image) {
      const upload = await uploadSubCategoryImage(image, name || checksub.name);
      if (!upload) {
        return res
          .status(400)
          .json({ message: "Image upload failed", success: false });
      }
      payload.image = upload.secure_url || checksub.image;
    }

    if (Object.keys(payload).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields to update", success: false });
    }

    const updatedsubcategory = await Subcategorymodel.findByIdAndUpdate(
      _id,
      payload,
      { new: true }
    ).populate("category");

    res.status(200).json({
      message: "Subcategory updated successfully",
      success: true,
      data: updatedsubcategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const DeleteSubcategory = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        message: "Please provide _id for deletion",
        success: false,
      });
    }
    const subcategory = await Subcategorymodel.findByIdAndDelete(_id);
    if (!subcategory) {
      return res.status(404).json({
        message: `Subcategory  not found`,
        success: false,
      });
    }

    res.status(200).json({
      message: `${subcategory.name} deleted successfully`,
      success: true,
      data: subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

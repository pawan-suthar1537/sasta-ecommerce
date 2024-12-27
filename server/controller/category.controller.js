import Categorymodel from "../models/category-model.js";
import { uploadCategoryImage } from "../utils/imageuploadcloudinary.js";

export const CreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file;

    if (!image || !name) {
      return res.status(400).json({
        message: "Please provide all fields",
        success: false,
      });
    }

    const category = await Categorymodel.findOne({ name });

    if (category) {
      return res.status(400).json({
        message: `Category already exists with name ${name}`,
        success: false,
      });
    }

    const upload = await uploadCategoryImage(image, name);

    if (!upload) {
      return res
        .status(400)
        .json({ message: "Failed to upload Category image", success: false });
    }
    const newCategory = Categorymodel({
      name,
      image: upload.secure_url,
    });

    if (!newCategory) {
      return res.status(400).json({
        message: "Category not created",
        success: false,
      });
    }
    await newCategory.save();
    res.status(200).json({
      message: "Category created successfully",
      success: true,
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const GetAllCategory = async (req, res) => {
  try {
    const categories = await Categorymodel.find();

    res.status(200).json({
      message: "All Categories",
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const Updatecategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;
    const image = req.file;

    console.log(categoryId, name);
    console.log(image);

    if (!categoryId || !name) {
      return res
        .status(400)
        .json({ message: "Category ID and name are required", success: false });
    }

    const category = await Categorymodel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    category.name = name;

    if (image) {
      const upload = await uploadCategoryImage(image, name);
      if (!upload) {
        return res
          .status(400)
          .json({ message: "Failed to upload Category image", success: false });
      }
      category.image = upload.secure_url;
    }

    await category.save();

    res.status(200).json({
      message: `Category ${category.name} updated successfully`,
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

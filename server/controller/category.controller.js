import Categorymodel from "../models/category-model.js";
import Productmodel from "../models/product-model.js";
import Subcategorymodel from "../models/subcategory-model.js";
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
    const categories = await Categorymodel.find().sort({ createdAt: -1 });

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

export const DeleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res
        .status(400)
        .json({ message: "Category ID is required", success: false });
    }

    const checksubcategory = await Subcategorymodel.find({
      category: {
        $in: [categoryId],
      },
    }).countDocuments();
    const checkproduct = await Productmodel.find({
      category: {
        $in: [categoryId],
      },
    }).countDocuments();

    if (checksubcategory > 0 || checkproduct > 0) {
      return res.status(400).json({
        message:
          "Category cannot be deleted because it has subcategories or products associated with it",
        success: false,
      });
    }

    const Delcategory = await Categorymodel.findById(categoryId);
    if (!Delcategory) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }
    await Categorymodel.deleteOne({ _id: categoryId });
    res.status(200).json({
      message: `Category ${Delcategory.name} deleted successfully`,
      success: true,
      data: Delcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

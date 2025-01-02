import mongoose from "mongoose";
import Productmodel from "../models/product-model.js";
import { uploadProductimagesImage } from "../utils/imageuploadcloudinary.js";

export const AddProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Images are required" });
    }

    const {
      name,
      price,
      unit,
      stock,
      discount,
      description,
      category,
      subcategory,
      more_details,
    } = req.body;
    const images = req.files;
    console.log("req bodyy", req.body);

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Product price is required",
      });
    }
    if (!unit) {
      return res.status(400).json({
        success: false,
        message: "Product unit is required",
      });
    }
    if (!stock) {
      return res.status(400).json({
        success: false,
        message: "Product stock is required",
      });
    }
    if (!discount) {
      return res.status(400).json({
        success: false,
        message: "Product discount is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Product description is required",
      });
    }
    if (!category[0]) {
      return res.status(400).json({
        success: false,
        message: "Product category is required",
      });
    }
    if (!subcategory[0]) {
      return res.status(400).json({
        success: false,
        message: "Product subcategory is required",
      });
    }
    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product images are required",
      });
    }

    const isexistinging = await Productmodel.findOne({ name });
    if (isexistinging) {
      return res.status(400).json({
        success: false,
        message: `Product already exists with the same name ${name}`,
      });
    }

    const uploadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const uploadedImage = await uploadProductimagesImage(image, name);
      uploadedImages.push(uploadedImage.secure_url);
    }

    const categoryData = Array.isArray(category)
      ? category.map((id) => new mongoose.Types.ObjectId(id))
      : [new mongoose.Types.ObjectId(category)];
    const subcategoryData = Array.isArray(subcategory)
      ? subcategory.map((id) => new mongoose.Types.ObjectId(id))
      : [new mongoose.Types.ObjectId(subcategory)];

    const moreDetails =
      typeof more_details === "string"
        ? JSON.parse(more_details)
        : more_details;

    const newProduct = new Productmodel({
      name,
      price: parseFloat(price),
      unit,
      stock: parseInt(stock),
      discount: parseFloat(discount),
      description,
      category: categoryData,
      subcategory: subcategoryData,
      more_details: moreDetails,
      image: uploadedImages,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const GetAllProducts = async (req, res) => {
  try {
    let { page, limit, search } = req.body;
    page = page || 1;
    limit = limit || 10;

    let query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};
    let skip = (page - 1) * limit;
    let [data, totalcount] = await Promise.all([
      Productmodel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Productmodel.countDocuments(query),
    ]);

    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      totalcount: totalcount,
      totalpages: Math.ceil(totalcount / limit),
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const GetAllProductsbyCat = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(req.body);
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Category id is required",
      });
    }
    const product = await Productmodel.find({
      category: {
        $in: _id,
      },
    }).limit(20);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "category fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

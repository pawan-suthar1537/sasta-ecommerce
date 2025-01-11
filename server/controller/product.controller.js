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

export const GetProductbyCategoryandSuncategoryId = async (req, res) => {
  try {
    const { categoryId, subcategoryId, page, limit } = req.body;
    if (!categoryId || !subcategoryId) {
      return res.status(400).json({
        success: false,
        message: "Category id and subcategory id is required",
      });
    }

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }

    const query = {
      category: {
        $in: categoryId,
      },
      subcategory: {
        $in: subcategoryId,
      },
    };
    const skip = (page - 1) * limit;

    const [data, count] = await Promise.all([
      Productmodel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Productmodel.countDocuments(query),
    ]);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: data,
      totalcount: count,
      page: page,
      limit: limit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const GetProductDetailsbyid = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const product = await Productmodel.findById(_id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
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

export const UpdateProductByID = async (req, res) => {
  try {
    const {
      _id,
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
    console.log("req.body", req.body);

    // Handle images
    const images = req.files;
    console.log("images", images);

    // Ensure _id is valid
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const objectId = new mongoose.Types.ObjectId(_id);

    // Validate required fields
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Product name is required" });
    if (!price)
      return res
        .status(400)
        .json({ success: false, message: "Product price is required" });
    if (!description)
      return res
        .status(400)
        .json({ success: false, message: "Product description is required" });
    if (!category || !category[0])
      return res
        .status(400)
        .json({ success: false, message: "Product category is required" });
    if (!subcategory || !subcategory[0])
      return res
        .status(400)
        .json({ success: false, message: "Product subcategory is required" });

    // Parse more_details if it's a string
    const parsedMoreDetails =
      typeof more_details === "string"
        ? JSON.parse(more_details)
        : more_details;

    // Handle category and subcategory data
    const categoryData = Array.isArray(category)
      ? category.map((id) => new mongoose.Types.ObjectId(id))
      : [new mongoose.Types.ObjectId(category)];
    const subcategoryData = Array.isArray(subcategory)
      ? subcategory.map((id) => new mongoose.Types.ObjectId(id))
      : [new mongoose.Types.ObjectId(subcategory)];

    // Handle images

    const uploadedImages = [];
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const uploadedImage = await uploadProductimagesImage(image, name);
        uploadedImages.push(uploadedImage.secure_url);
      }
    }

    // Update product in database
    const updatedProduct = await Productmodel.findByIdAndUpdate(
      objectId,
      {
        name,
        price: parseFloat(price),
        unit,
        stock: parseInt(stock),
        discount: parseFloat(discount),
        description,
        category: categoryData,
        subcategory: subcategoryData,
        more_details: parsedMoreDetails,
        image: uploadedImages,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const DeleteProductById = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const product = await Productmodel.findByIdAndDelete(_id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
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

export const SerchProduct = async (req, res) => {
  try {
    let { search, page, limit } = req.body;
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }

    const query = search
      ? { $text: { $search: search } } // Use $text for full-text search
      : {};

    const [data, count] = await Promise.all([
      Productmodel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Productmodel.countDocuments(query),
    ]);
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: data,
      totalcount: count,
      totalpages: Math.ceil(count / limit),
      page: page,
      limit: limit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

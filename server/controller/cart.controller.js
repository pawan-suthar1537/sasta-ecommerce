import Cartmodel from "../models/cart-model.js";
import Usermodel from "../models/user-model.js";

export const AddtoCart = async (req, res) => {
  try {
    const userid = req.userId;
    const { productId } = req.body;
    console.log("userid ", userid);
    console.log("productId ", productId);
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Please provide productId", success: false });
    }

    const checkcartitem = await Cartmodel.findOne({
      userId: userid,
      productId: productId,
    });

    if (checkcartitem) {
      return res.status(400).json({
        message: "Product already exists in cart",
        success: false,
      });
    }

    const cartitem = new Cartmodel({
      quantity: 1,
      userId: userid,
      productId: productId,
    });
    const savedCartItem = await cartitem.save();
    const updateuserscart = await Usermodel.updateOne(
      { _id: userid },
      { $push: { shopping_cart: savedCartItem._id } }
    );
    res.status(200).json({
      message: "Product added to cart",
      success: true,
      data: savedCartItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const GetCartItems = async (req, res) => {
  try {
    const userid = req.userId;
    const cartItems = await Cartmodel.find({ userId: userid }).populate(
      "productId"
    );
    if (!cartItems || cartItems.length === 0) {
      return res
        .status(400)
        .json({ message: "No cart items found", success: false });
    }
    res.status(200).json({
      message: "Cart items fetched successfully",
      success: true,
      data: cartItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const UpdateQty = async (req, res) => {
  try {
    const userid = req.userId;
    const { cartId, quantity } = req.body;
    if (!cartId || !quantity) {
      return res.status(400).json({
        message: "Please provide cartId and quantity",
        success: false,
      });
    }
    const updatedCartItem = await Cartmodel.updateOne(
      { _id: cartId, userId: userid },
      { $set: { quantity } }
    );
    if (!updatedCartItem) {
      return res.status(400).json({
        message: "Cart item not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Cart item updated successfully",
      success: true,
      data: updatedCartItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const DeleteCart = async (req, res) => {
  try {
    const userid = req.userId;
    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({
        message: "Please provide cartId",
        success: false,
      });
    }
    const deletedCartItem = await Cartmodel.deleteOne({
      _id: cartId,
      userId: userid,
    });
    if (!deletedCartItem) {
      return res.status(400).json({
        message: "Cart item not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Cart item deleted successfully",
      success: true,
      data: deletedCartItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Cartmodel = mongoose.model("cart", CartSchema);
export default Cartmodel;

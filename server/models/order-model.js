import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    orderId: {
      type: String,
      required: [true, "please provide order id"],
      unique: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    product_details: {
      name: String,
      image: Array,
    },
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
    subtotal_amount: {
      type: Number,
      default: 0,
    },
    total_amount: {
      type: Number,
      default: 0,
    },
    invoice_recept: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Ordermodel = mongoose.model("order", orderSchema);
export default Ordermodel;

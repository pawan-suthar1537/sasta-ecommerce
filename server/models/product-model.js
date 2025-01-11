import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name of product "],
    maxlength: 200,
  },
  image: {
    type: Array,
    default: [],
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  subcategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
    },
  ],
  unit: {
    type: String,
    default: null,
  },
  stock: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: null,
  },
  discount: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    default: "",
  },
  more_details: {
    type: Object,
    default: {},
  },
  published: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.index(
  {
    name: "text",
    description: "text",
  },
  {
    weights: {
      name: 10,
      description: 5,
    },
  }
);

const Productmodel = mongoose.model("product", ProductSchema);
export default Productmodel;

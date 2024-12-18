import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subcategorymodel = mongoose.model("subcategory", SubcategorySchema);
export default Subcategorymodel;

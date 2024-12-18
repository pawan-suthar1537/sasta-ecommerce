import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Categorymodel = mongoose.model("category", CategorySchema);
export default Categorymodel;

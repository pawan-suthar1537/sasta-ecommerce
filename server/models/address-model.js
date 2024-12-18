import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    // },
    address_line: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },
    number: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Addressmodel = mongoose.model("address", AddressSchema);
export default Addressmodel;

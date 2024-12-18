import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      match: [/\S+@\S+\.\S+/, "please provide a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      required: [true, "please provide a mobile number"],
      unique: true,
      minlength: 10,
      maxlength: 15,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    address_details: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
      },
    ],
    order_history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    forgot_password_otp: {
      type: String,
      default: "",
    },
    forgot_password_otp_expire: {
      type: Date,
      default: "",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const Usermodel = mongoose.model("user", UserSchema);
export default Usermodel;

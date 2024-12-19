import express from "express";
import {
  Loginuser,
  Logout,
  Registeruser,
  Verifyemail,
  UploadAvatar,
} from "../controller/user.controller.js";
import { Auth } from "../middlewares/auth.js";
import Upload from "../middlewares/multer.js";
const userrouter = express.Router();

userrouter.post("/register", Registeruser);
userrouter.post("/verify-email", Verifyemail);
userrouter.post("/login", Loginuser);
userrouter.get("/logout", Auth, Logout);
userrouter.put("/avatar", Auth, Upload.single("avatar"), UploadAvatar);

export default userrouter;

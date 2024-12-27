import express from "express";
import {
  Loginuser,
  Logout,
  Registeruser,
  Verifyemail,
  UploadAvatar,
  updateuserdetails,
  Forgotpassword,
  VerifyForgotpasswordOTP,
  Resetpassword,
  RefreshAccessToken,
  getloginuserdetails,
} from "../controller/user.controller.js";
import { Auth } from "../middlewares/auth.js";
import Upload from "../middlewares/multer.js";
const userrouter = express.Router();

userrouter.post("/register", Registeruser);
userrouter.post("/verify-email", Verifyemail);
userrouter.post("/refreshAccessToken", RefreshAccessToken);
userrouter.post("/login", Loginuser);
userrouter.get("/logout", Logout);
userrouter.put("/update", Auth, updateuserdetails);
userrouter.get("/user_detail", Auth, getloginuserdetails);
userrouter.put("/forgotpassword", Forgotpassword);
userrouter.put("/verifyforgotpassword", VerifyForgotpasswordOTP);
userrouter.put("/resetpassword", Resetpassword);
userrouter.put("/avatar", Auth, Upload.single("avatar"), UploadAvatar);

export default userrouter;

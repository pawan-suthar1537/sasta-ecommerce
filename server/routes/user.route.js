import express from "express";
import {
  Loginuser,
  Logout,
  Registeruser,
  Verifyemail,
} from "../controller/user.controller.js";
const userrouter = express.Router();

userrouter.post("/register", Registeruser);
userrouter.post("/verify-email", Verifyemail);
userrouter.post("/login", Loginuser);
userrouter.get("/logout", Logout);

export default userrouter;

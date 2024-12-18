import Usermodel from "../models/user-model.js";
import crypto from "crypto";

import Sendemail from "../utils/sendemail.js";
import VerifyEmailTemplate from "../utils/varifyemailtemplate.js";
import {
  GenrateAccessToken,
  GenrateRefreshToken,
} from "../utils/genrateTokens.js";

const hashPassword = (password, salt) => {
  const iterations = 10000;
  const keyLength = 64;
  const digest = "sha256";
  const hashedPassword = crypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    keyLength,
    digest
  );
  return hashedPassword.toString("hex");
};

const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const Registeruser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    if (!email || !password || !name || !mobile) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        success: false,
      });
    }

    const existingUser = await Usermodel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: `User already exists with email: ${email}`,
        success: false,
      });
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const newUser = new Usermodel({
      name,
      email,
      password: hashedPassword,
      mobile,
      salt,
    });

    await newUser.save();

    const varifyemaulurl = `${process.env.CLIENT_URL}/verify-email?code=${newUser._id}`;

    await Sendemail({
      to: email,
      subject: "Verify your email",
      html: VerifyEmailTemplate({
        name: name,
        url: varifyemaulurl,
      }),
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const Loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
        success: false,
      });
    }
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }
    if (user.status !== "active") {
      return res.status(400).json({
        message: "Contact to admin",
        success: false,
      });
    }

    const isPasswordValid = await hashPassword(password, user.salt);
    if (isPasswordValid !== user.password) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    const accesstoken = await GenrateAccessToken(user._id);
    const refreshtoken = await GenrateRefreshToken(user._id);

    const cookies_option = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accesstoken, cookies_option);
    res.cookie("refreshToken", refreshtoken, cookies_option);

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: {
        accesstoken,
        refreshtoken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const Verifyemail = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Invalid code", success: false });
    }

    const user = await Usermodel.findById({ _id: code });

    if (!user) {
      return res.status(400).json({ message: "Invalid code", success: false });
    }

    if (user.verify_email) {
      return res
        .status(400)
        .json({ message: "Email already verified", success: false });
    }

    const updateduser = await Usermodel.findByIdAndUpdate(
      { _id: code },
      { verify_email: true },
      { new: true }
    );

    res.status(201).json({
      message: "Email verified successfully",
      success: true,
      //   data: updateduser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const Logout = async (req, res) => {
  try {
    const cookies_option = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookies_option);
    res.clearCookie("refreshToken", cookies_option);
    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

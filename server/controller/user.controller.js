import Usermodel from "../models/user-model.js";

import bcrypt from "bcryptjs";

import Sendemail from "../utils/sendemail.js";
import VerifyEmailTemplate from "../utils/varifyemailtemplate.js";
import {
  GenrateAccessToken,
  GenrateRefreshToken,
} from "../utils/genrateTokens.js";
import uploadImage from "../utils/imageuploadcloudinary.js";

const hashPassword = async (password, saltRounds = 10) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
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

    const hashedPassword = await hashPassword(password);

    const newUser = new Usermodel({
      name,
      email,
      password: hashedPassword,
      mobile,
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

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    const accesstoken = await GenrateAccessToken(user._id, user.name);
    const refreshtoken = await GenrateRefreshToken(user._id, user.name);

    const cookies_option = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
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
    const userId = req.userId; // middleware
    const cookies_option = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    };
    res.clearCookie("accessToken", cookies_option);
    res.clearCookie("refreshToken", cookies_option);

    const removeRefreshtoken = await Usermodel.findOneAndUpdate(
      { _id: userId },
      { refresh_token: "" }
    );
    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const UploadAvatar = async (req, res) => {
  try {
    const avatar = req.file;
    const userId = req.userId;
    const username = req.username;

    if (!avatar) {
      return res
        .status(400)
        .json({ message: "No avatar provided", success: false });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ message: "No user id provided", success: false });
    }

    const upload = await uploadImage(avatar, username);
    if (!upload) {
      return res
        .status(400)
        .json({ message: "Failed to upload avatar", success: false });
    }

    const updateduser = await Usermodel.findOneAndUpdate(
      { _id: userId },
      { avatar: upload.url }
    );

    res.status(200).json({
      message: "Avatar uploaded successfully",
      data: {
        _id: userId,
        avatar: upload.url,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

export const updateuserdetails = async (req, res) => {
  try {
    const userId = req.userId;

    const { name, email, mobile, password } = req.body;
    const user = await Usermodel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    let hashpass = "";

    if (password) {
      hashpass = await hashPassword(password);
    }

    const updateduser = await Usermodel.findOneAndUpdate(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashpass }),
      },
      { new: true }
    );
    res.status(200).json({
      message: "User details updated successfully",
      data: updateduser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || error, success: false });
  }
};

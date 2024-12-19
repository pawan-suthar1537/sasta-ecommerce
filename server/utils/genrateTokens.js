import jwt from "jsonwebtoken";
import Usermodel from "../models/user-model.js";

export const GenrateAccessToken = async (userId, username) => {
  const token = await jwt.sign(
    { id: userId, username: username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );
  return token;
};

export const GenrateRefreshToken = async (userId, username) => {
  const token = await jwt.sign(
    { id: userId, username: username },
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15d",
    }
  );

  const updatetoekninusermodel = await Usermodel.updateOne(
    { _id: userId },
    {
      refresh_token: token,
    },
    { new: true }
  );
  return token;
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const Auth = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "token not found" });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decode) {
      return res.status(403).json({ message: "Invalid token please login" });
    }
    req.userId = decode.id;
    req.username = decode.username;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || error, success: false });
  }
};

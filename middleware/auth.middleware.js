import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
    console.log("🍪 req.cookies:", req.cookies);
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Access token missing");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;
  next();
});

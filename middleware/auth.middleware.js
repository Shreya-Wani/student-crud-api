import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }
});

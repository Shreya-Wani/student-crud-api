import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
    //read access token from cookies
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
        throw new ApiError(401, "Access token missing");
    }

    let decoded;
    try {
        decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );
    } catch (error) {
        throw new ApiError(401, "Invalid or expired access token");
    }

    //find user by id in token
    const user = await User.findById(decoded._id.toString());
    if (!user) {
        throw new ApiError(401, "User not found");
    }

    //attach user to request object
    req.user = user;
    next();
});

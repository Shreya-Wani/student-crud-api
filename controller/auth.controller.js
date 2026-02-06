import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import { signupValidation, loginValidation } from "../validations/auth.validation.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/asyncHandler.js";

export const signupUser = asyncHandler(async (req, res) => {
    //joi validation
    const { error } = signupValidation.validate(req.body);
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }

    const { email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const user = await User.create({
        email,
        password: hashedPassword
    })

    //Success response
    return res
        .status(201)
        .json(new ApiResponse(201, null, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
    //joi validation
    const { error } = loginValidation.validate(req.body);
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }

    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    //Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    //Success response
    return res
        .status(200)
        .json(new ApiResponse(200, null, "User logged in successfully"));
})
import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import { signupValidation } from "../validations/auth.validation.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const signupUser = asyncHandler(async (requestAnimationFrame, res) => {
    //joi validation
    const { error } = signupValidation.validate(req.body);
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }

    const { email, password } = req.body;

    //check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const User = await User.create({
        email,
        password: hashedPassword
    })

    //Success response
    return res
        .status(201)
        .json(new ApiResponse(201, null, "User registered successfully"));
});


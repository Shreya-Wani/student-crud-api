import bcrypt from "bcrypt";
import { User } from "../model/user.model.js";
import { signupValidation, loginValidation } from "../validations/auth.validation.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util.js";
import { refreshTokenValidation } from "../validations/auth.validation.js";
import jwt from "jsonwebtoken";
import { generateOTP, hashOTP, otpExpiryTime } from "../utils/otp.util.js";
import { sendOtpEmail } from "../utils/email.util.js";

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

    //generate OTP
    const otp = generateOTP();

    //hash OTP and save to DB with expiry
    user.otp = hashOTP(otp);
    user.otpExpiry = otpExpiryTime();
    await user.save();

    //send OTP to email
    await sendOtpEmail(user.email, otp);

    return res.status(200).json(
    new ApiResponse(200, null, "OTP sent to your registered email")
    );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    
    // retrieve refresh token from cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new ApiError(401, "Refresh token missing");
    }

    // verify refresh token
    let decoded;
    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    // find user and match refresh token
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Refresh token not recognized");
    }

    // generate new access token
    const newAccessToken = generateAccessToken(user);

    // set new access token in http-only cookie
    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 20 * 60 * 1000, // 20 min
    })

    // send response
    return res.status(200).json(
        new ApiResponse(
        200,
        null,
        "Access token refreshed"
        )
    );
    });

export const verifyOtp = asyncHandler (async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    const user = await User.findOne({ email });
    if( !user || !user.otp || !user.otpExpiry) {
        throw new ApiError(400, "OTP verification failed");
    }

    //check expiry
    if (user.otpExpiry < new Date()) {
        throw new ApiError(400, "OTP has expired");
    }

    //hash otp given by user and compare with DB
    const hashedOtp = hashOTP(otp);
    if (hashedOtp !== user.otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    //it OTP verified then clear otp in db
    user.otp = null;
    user.otpExpiry = null;

    //Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    //Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    //set access token in http-only cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 20 * 60 * 1000,
    });

    //set refresh token in http-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //Success response
    return res.status(200).json(
    new ApiResponse(
      200, null ,"Login successful"
    ));
})

export const logoutUser = asyncHandler(async (req, res) => {

  const userId = req.user._id;

  // remove refresh token from DB
  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });

  // clear cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json(
    new ApiResponse(200, null, "Logged out successfully")
  );
});

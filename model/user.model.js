import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            default: null
        },
        otp:{
            type: String,
            default: null,
        },
        otpExpiry: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model("User", userSchema);
import crypto from "crypto";

//generatye random 6 digit OTP
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

//Hash OTP using SHA256
export const hashOTP = (otp) => {
    return crypto.createHash("sha256").update(otp).digest("hex");   
};

//otp expiry ( 5 min )
export const otpExpiiryTime = () => {
    return new Date(Date.now() + 5 * 60 * 1000);
};
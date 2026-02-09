# Student CRUD API (Secure Backend)

A production-style REST API built with **Node.js, Express, and MongoDB** implementing  
**OTP-based authentication**, **JWT (Access & Refresh Tokens via HTTP-only cookies)**, and  
**Student CRUD operations with Cloudinary image uploads**.

---

## 🔐 Authentication Flow

1. User logs in with email & password  
2. OTP is sent to the registered email  
3. User verifies OTP  
4. On success:
   - Access Token (short-lived)
   - Refresh Token (long-lived)
5. Tokens are stored securely in **HTTP-only cookies**
6. Protected APIs validate access token
7. Refresh token rotates access token
8. Logout clears cookies and invalidates session

---

## ✨ Features

- User signup & login  
- OTP-based verification via email  
- Secure JWT authentication  
- HTTP-only cookie-based auth  
- Refresh token rotation  
- Protected student CRUD APIs  
- Image upload using Multer + Cloudinary  
- Centralized error handling  
- Joi validation  

---

## 🧱 Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT  
- Nodemailer  
- Multer  
- Cloudinary  

---

## 🔗 API Endpoints

### Auth
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/verify-otp`
- `POST /api/v1/auth/refresh-token`
- `POST /api/v1/auth/logout`

### Students (Protected)
- `POST /api/v1/students`
- `GET /api/v1/students`
- `GET /api/v1/students/:id`
- `PUT /api/v1/students/:id`
- `DELETE /api/v1/students/:id`

---

## ⚙️ Environment Variables

```env
PORT=8000
MONGO_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=10m
REFRESH_TOKEN_EXPIRY=7d

EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

---

## 📝 Notes

- Access tokens are short-lived for security  
- Refresh tokens allow seamless re-authentication  
- OTP adds an extra security layer  
- `.env` file is excluded from GitHub  

---

## 👩‍💻 Author

**Shreya Wani**  
Backend Developer | Node.js | Secure REST APIs

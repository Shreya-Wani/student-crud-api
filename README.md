Student CRUD API with JWT Authentication

A REST API built using Node.js, Express, and MongoDB that implements JWT-based authentication and protected student CRUD operations.

Features

User signup and login

Password hashing using bcrypt

JWT authentication with access & refresh tokens

Secure refresh token storage in database

Protected student APIs using auth middleware

Student CRUD operations

Joi validation and centralized error handling

Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

JWT

bcrypt

Joi

API Endpoints
Auth
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token

Students (Protected)
POST   /api/v1/students
GET    /api/v1/students
GET    /api/v1/students/:id
PUT    /api/v1/students/:id
DELETE /api/v1/students/:id

Environment Variables
PORT=8000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=20m
REFRESH_TOKEN_EXPIRY=7d

Run Locally
npm install
npm run dev

Author

Shreya Wani

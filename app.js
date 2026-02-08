import express from "express";
import studentRoutes from "./routes/student.routes.js";
import authRoutes from "./routes/auth.routes.js";
import ApiError from "./utils/api-error.js";
import cookieParser from "cookie-parser";

const app = express();

/* Middleware */
app.use(express.json());
app.use(cookieParser());

/* Routes */
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/auth", authRoutes);

/* 404 Handler */
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;

import express from "express";
import studentRoutes from "./routes/student.routes.js";
import ApiError from "./utils/api-error.js";
import router from "./routes/student.routes.js";

const app = express();

/* Middleware */
app.use(express.json());

/* Routes */
app.use("/api", studentRoutes);

/* 404 Handler */
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;

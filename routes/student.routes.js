import { Router } from "express";
import {createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent} from "../controller/student.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createStudent);
router.get("/", authMiddleware, getAllStudents);
router.get("/:id", authMiddleware, getStudentById);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);

export default router;
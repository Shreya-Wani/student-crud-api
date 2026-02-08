import { Router } from "express";
import {createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent} from "../controller/student.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/", authMiddleware, upload.single("profile"), createStudent);
router.get("/", authMiddleware, getAllStudents);
router.get("/:id", authMiddleware, getStudentById);
router.put("/:id", authMiddleware, upload.single("profile"), updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);

export default router;
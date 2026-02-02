import { Router } from "express";
import {createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent} from "../controller/student.controller.js";

const router = Router();

router.post("/students", createStudent);
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

export default router;
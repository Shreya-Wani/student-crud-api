import Student from "../model/student.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";

/* Create Student */
export const createStudent = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // ✅ check duplicate email
  const existingStudent = await Student.findOne({ email });
  if (existingStudent) {
    throw new ApiError(409, "Student with this email already exists");
  }

  const student = await Student.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, student, "Student created successfully"));
});

/* Get All Students */
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json(new ApiResponse(200, students));
});

/* Get Student By ID */
export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  res.json(new ApiResponse(200, student));
});

/* Update Student */
export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  res.json(new ApiResponse(200, student, "Student updated successfully"));
});

/* Delete Student */
export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  res.json(new ApiResponse(200, null, "Student deleted successfully"));
});
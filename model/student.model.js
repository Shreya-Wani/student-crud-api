import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number,
      required: true
    },
    course: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model("student", studentSchema);

export default Student;
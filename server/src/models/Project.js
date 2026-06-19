import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    studentName: { type: String, required: true },
    facultyGuide: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending"
    },
    tags: [String],
    links: [String],
    feedback: String
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

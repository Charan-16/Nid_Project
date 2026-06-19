import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty", "admin"], required: true },
    department: { type: String, required: true },
    semester: String,
    skills: [String],
    portfolio: String,
    title: String
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

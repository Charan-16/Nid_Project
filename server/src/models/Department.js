import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    lead: String,
    students: { type: Number, default: 0 },
    projects: { type: Number, default: 0 },
    focusAreas: [String],
    labs: [String],
    mvpModules: [String],
    nextModules: [String],
    programmeLevel: String,
    campusRole: String,
    facultyNote: String
  },
  { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);

import dotenv from "dotenv";
import mongoose from "mongoose";
import { demoDepartments, demoProjects, demoUsers } from "./demoStore.js";
import { Department } from "../models/Department.js";
import { Project } from "../models/Project.js";
import { User } from "../models/User.js";

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Add your MongoDB Atlas URL in server/.env first.");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);

await Promise.all([Department.deleteMany({}), Project.deleteMany({}), User.deleteMany({})]);

const users = await User.insertMany(
  demoUsers.map(({ id, ...user }) => ({
    ...user,
    email: user.email.toLowerCase()
  }))
);

const student = users.find((user) => user.email === "student@nid.edu");

await Department.insertMany(
  demoDepartments.map(({ id, ...department }) => ({
    ...department,
    slug: id
  }))
);

await Project.insertMany(
  demoProjects.map(({ id, studentId, createdAt, ...project }) => ({
    ...project,
    studentId: student?._id,
    createdAt: createdAt ? new Date(createdAt) : new Date()
  }))
);

console.log("MongoDB seeded successfully.");
console.log("Demo login: student@nid.edu / password123");
console.log("Demo login: faculty@nid.edu / password123");
console.log("Demo login: admin@nid.edu / password123");

await mongoose.disconnect();

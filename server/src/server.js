import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb, usingMongo } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import campusRoutes from "./routes/campusRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

await connectDb();

app.get("/", (req, res) => {
  res.json({
    app: "NID Bengaluru Campus Portal API",
    status: "running",
    frontend: process.env.CLIENT_URL || "http://localhost:5173",
    health: "/api/health"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "NID Bengaluru Campus Portal",
    database: usingMongo() ? "mongodb" : "demo-memory"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/campus", campusRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Something went wrong"
  });
});

app.listen(port, () => {
  console.log(`NID Campus Portal API running on http://localhost:${port}`);
});
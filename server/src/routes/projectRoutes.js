import express from "express";
import {
  createProject,
  listProjects,
  updateProjectStatus
} from "../controllers/projectController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, listProjects);
router.post("/", requireAuth, requireRole("student", "admin"), createProject);
router.patch("/:id/status", requireAuth, requireRole("faculty", "admin"), updateProjectStatus);

export default router;

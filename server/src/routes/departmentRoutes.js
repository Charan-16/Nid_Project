import express from "express";
import { getDepartment, listDepartments } from "../controllers/departmentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, listDepartments);
router.get("/:id", requireAuth, getDepartment);

export default router;

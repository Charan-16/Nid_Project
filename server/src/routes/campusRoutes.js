import express from "express";
import {
  listClasses,
  createClass,
  deleteClass,
  listFaculty,
  createFaculty,
  deleteFaculty,
  updateClass,
  updateFaculty,
  updateStaff,
  listMapLocations,
  listStaff,
  listStudentBatches,
  listWorkshops
} from "../controllers/campusController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/faculty", requireAuth, listFaculty);
router.post("/faculty", requireAuth, requireRole("admin"), createFaculty);
router.delete("/faculty/:id", requireAuth, requireRole("admin"), deleteFaculty);
router.patch("/faculty/:id", requireAuth, requireRole("admin"), updateFaculty);
router.patch("/staff/:id", requireAuth, requireRole("admin"), updateStaff);

router.get("/staff", requireAuth, listStaff);
router.get("/students", requireAuth, listStudentBatches);
router.get("/workshops", requireAuth, listWorkshops);
router.get("/classes", requireAuth, listClasses);
router.post("/classes", requireAuth, requireRole("admin"), createClass);
router.patch("/classes/:id", requireAuth, requireRole("admin"), updateClass);
router.delete("/classes/:id", requireAuth, requireRole("admin"), deleteClass);
router.get("/map", requireAuth, listMapLocations);

export default router;

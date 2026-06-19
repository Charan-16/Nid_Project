import express from "express";
import { listUsers, createUser, deleteUser, updateUser } from "../controllers/userController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, requireRole("admin", "faculty"), listUsers);
router.post("/", requireAuth, requireRole("admin"), createUser);
router.delete("/:id", requireAuth, requireRole("admin"), deleteUser);
router.patch("/:id", requireAuth, requireRole("admin"), updateUser);

export default router;
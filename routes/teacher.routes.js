import { Router } from "express";
import { getAllTeachers } from "../controllers/Teacher.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowTeacherOrAdmin } from "../middlewares/allowTeacherOrAdmin.middleware.js";

const router = Router();

router.get("/allTeachers", authMiddleware, allowTeacherOrAdmin, getAllTeachers);

export default router;

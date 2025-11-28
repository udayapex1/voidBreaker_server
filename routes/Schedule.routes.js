import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowAdmin, allowTeacherOrAdmin } from "../middlewares/allowTeacherOrAdmin.middleware.js";
import { createSchedule, getAllSchedules } from "../controllers/Schedule.controller.js";

const router = Router();

router.post("/createSchedule", authMiddleware, allowAdmin, createSchedule);
router.get("/getAllSchedules", authMiddleware, allowTeacherOrAdmin, getAllSchedules);

export default router;
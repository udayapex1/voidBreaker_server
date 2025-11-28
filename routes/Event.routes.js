import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowTeacherOrAdmin } from "../middlewares/allowTeacherOrAdmin.middleware.js";
import { createEvent, getAllEvents } from "../controllers/Event.controller.js";
const router = Router();

router.post("/createEvent", authMiddleware, allowTeacherOrAdmin, createEvent)
router.get("/getAllEvents", authMiddleware, allowTeacherOrAdmin, getAllEvents);
export default router;
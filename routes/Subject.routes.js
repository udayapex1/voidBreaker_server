import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowAdmin, allowTeacherOrAdmin } from "../middlewares/allowTeacherOrAdmin.middleware.js";
import { createSubject, getAllSubjects } from "../controllers/Subject.controller.js";


const router = Router()

router.post("/createSubject", authMiddleware, allowAdmin, createSubject)
router.get("/getAllSubjects", authMiddleware, allowTeacherOrAdmin, getAllSubjects)
export default router;
import ClassModel from "../models/Class.model.js";
import { Router } from "express";
import { createClass, getAllClasses } from "../controllers/Class.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowAdmin, allowTeacherOrAdmin } from "../middlewares/allowTeacherOrAdmin.middleware.js";

const router = Router();
router.post("/createClass", authMiddleware, allowAdmin, createClass);
router.get("/getAllClasses", authMiddleware, allowTeacherOrAdmin, getAllClasses)


export default router;
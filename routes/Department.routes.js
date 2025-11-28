import { createDepartment, getAllDepartments } from "../controllers/Department.controller.js";
import { allowAdmin, allowTeacherOrAdmin } from "../middlewares/allowTeacherOrAdmin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";


const router = Router();

router.post("/createDepartment", authMiddleware, allowAdmin, createDepartment);
router.get("/getAllDepartments", authMiddleware, allowTeacherOrAdmin, getAllDepartments)


export default router;
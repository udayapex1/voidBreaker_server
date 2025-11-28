import { Router } from "express";
import {
    getUsers,
    loginUser,
    logoutUser,
    myProfile,
    registerUser,
    testAPI,
} from "../controllers/User.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowTeacherOrAdmin } from "../middlewares/allowTeacherOrAdmin.middleware.js";

const router = Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, myProfile);
router.post("/logout", authMiddleware, logoutUser);
router.get("/test", authMiddleware, allowTeacherOrAdmin, testAPI);

export default router;


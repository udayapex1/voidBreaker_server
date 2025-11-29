import { Router } from "express";
import { createResource } from "../controllers/Resources.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/createResource", authMiddleware, createResource);

export default router;
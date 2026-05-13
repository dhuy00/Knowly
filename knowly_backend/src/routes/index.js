import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import projectRoutes from "../modules/projects/project.routes.js";
import taskRoutes from "../modules/task/task.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);

export default router;
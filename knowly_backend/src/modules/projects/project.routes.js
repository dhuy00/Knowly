import { Router } from "express";

import * as projectController from "./project.controller.js";

import {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema,
} from "./project.validation.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createProjectSchema),
  projectController.createProject,
);

router.get("/", projectController.getProjects);

router.get("/:id", projectController.getProjectDetail);

router.patch(
  "/:id",
  validate(updateProjectSchema),
  projectController.updateProject,
);

router.delete("/:id", projectController.deleteProject);

router.post(
  "/:id/members",
  validate(addMemberSchema),
  projectController.addMember,
);

router.delete("/:id/members/:memberId", projectController.removeMember);

export default router;

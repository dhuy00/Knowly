import express from "express";

import * as taskController from "./task.controller.js";

import {
  createTaskSchema,
  updateTaskSchema,
} from "./task.validation.js";

import validate from "../../middlewares/validate.middleware.js";

const router = express.Router();

router.post(
  "/",
  validate(createTaskSchema),
  taskController.createTask
);

router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getTaskById);

router.put(
  "/:id",
  validate(updateTaskSchema),
  taskController.updateTask
);

router.delete("/:id", taskController.deleteTask);

export default router;
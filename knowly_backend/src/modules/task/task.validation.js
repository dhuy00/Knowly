import { z } from "zod";

export const createTaskSchema = z.object({
  projectId: z.number(),
  parentTaskId: z.number().optional(),

  title: z.string().min(1),
  description: z.string().optional(),

  status: z.string().optional(),
  priority: z.string().optional(),
  taskType: z.string().optional(),

  assigneeId: z.number().optional(),
  reporterId: z.number().optional(),

  startDate: z.string().optional(),
  dueDate: z.string().optional(),

  estimatedHours: z.number().optional(),
  spentHours: z.number().optional(),

  progress: z.number().min(0).max(100).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
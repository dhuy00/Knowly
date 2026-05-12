import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(100),

  key: z
    .string()
    .min(2)
    .max(10)
    .regex(/^[A-Z0-9]+$/),

  description: z.string().optional(),

  color: z.string().optional(),

  icon: z.string().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().optional(),

  description: z.string().optional(),

  status: z.enum([
    "ACTIVE",
    "ARCHIVED",
    "COMPLETED",
  ]).optional(),

  color: z.string().optional(),

  icon: z.string().optional(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),
});

export const addMemberSchema = z.object({
  email: z.email(),

  role: z.enum([
    "ADMIN",
    "MEMBER",
  ]),
});
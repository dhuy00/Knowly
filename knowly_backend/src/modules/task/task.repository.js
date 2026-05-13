import prisma from "../../prisma/prisma.js";

export const createTask = async (data) => {
  return prisma.task.create({
    data,
    include: {
      assignee: true,
      reporter: true,
      project: true,
    },
  });
};

export const getAllTasks = async () => {
  return prisma.task.findMany({
    include: {
      assignee: true,
      reporter: true,
      project: true,
      subtasks: true,
      labels: {
        include: {
          label: true,
        },
      },
    },
  });
};

export const getTaskById = async (id) => {
  return prisma.task.findUnique({
    where: { id },
    include: {
      assignee: true,
      reporter: true,
      project: true,
      subtasks: true,
      comments: {
        include: {
          user: true,
        },
      },
      labels: {
        include: {
          label: true,
        },
      },
      attachments: true,
      timeEntries: true,
      activities: true,
    },
  });
};

export const updateTask = async (id, data) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTask = async (id) => {
  return prisma.task.delete({
    where: { id },
  });
};
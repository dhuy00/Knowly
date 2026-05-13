import * as taskRepo from "./task.repository.js";

export const createTask = async (body) => {
  return taskRepo.createTask({
    ...body,

    startDate: body.startDate
      ? new Date(body.startDate)
      : null,

    dueDate: body.dueDate
      ? new Date(body.dueDate)
      : null,
  });
};

export const getAllTasks = async () => {
  return taskRepo.getAllTasks();
};

export const getTaskById = async (id) => {
  const task = await taskRepo.getTaskById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

export const updateTask = async (id, body) => {
  await getTaskById(id);

  return taskRepo.updateTask(id, {
    ...body,

    startDate: body.startDate
      ? new Date(body.startDate)
      : undefined,

    dueDate: body.dueDate
      ? new Date(body.dueDate)
      : undefined,
  });
};

export const deleteTask = async (id) => {
  await getTaskById(id);

  return taskRepo.deleteTask(id);
};
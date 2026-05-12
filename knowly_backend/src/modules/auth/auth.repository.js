import prisma from "../../prisma/prisma.js";

export const findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });
};

export const createUser = (data) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });
};
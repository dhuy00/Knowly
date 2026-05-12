import prisma from "../../prisma/prisma.js";

export const findProjectByKey = (key) => {
  return prisma.project.findUnique({
    where: { key },
  });
};

export const createProject = (data) => {
  return prisma.project.create(data);
};

export const getProjectsByUser = (userId) => {
  return prisma.project.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },

    include: {
      owner: true,

      _count: {
        select: {
          tasks: true,
          members: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findProjectDetail = (
  projectId,
  userId
) => {
  return prisma.project.findFirst({
    where: {
      id: Number(projectId),

      members: {
        some: {
          userId,
        },
      },
    },

    include: {
      owner: true,

      members: {
        include: {
          user: true,
        },
      },

      tasks: true,
    },
  });
};

export const updateProject = (
  projectId,
  data
) => {
  return prisma.project.update({
    where: {
      id: Number(projectId),
    },

    data,
  });
};

export const deleteProject = (
  projectId
) => {
  return prisma.project.delete({
    where: {
      id: Number(projectId),
    },
  });
};

export const findProjectMember = (
  projectId,
  userId
) => {
  return prisma.projectMember.findFirst({
    where: {
      projectId,
      userId,
    },
  });
};

export const addMember = (data) => {
  return prisma.projectMember.create({
    data,

    include: {
      user: true,
    },
  });
};

export const removeMember = (memberId) => {
  return prisma.projectMember.delete({
    where: {
      id: Number(memberId),
    },
  });
};
import * as projectRepo from "./project.repository.js";
import * as authRepo from "../auth/auth.repository.js";

export const createProject = async (userId, body) => {
  const existing = await projectRepo.findProjectByKey(body.key);

  if (existing) {
    throw new Error("Project key already exists");
  }

  return projectRepo.createProject({
    data: {
      name: body.name,
      key: body.key,
      description: body.description,
      color: body.color,
      icon: body.icon,
      ownerId: userId,

      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  });
};

export const getProjects = async (userId) => {
  return projectRepo.getProjectsByUser(userId);
};

export const getProjectDetail = async (projectId, userId) => {
  const project = await projectRepo.findProjectDetail(projectId, userId);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const updateProject = async (projectId, userId, body) => {
  const member = await projectRepo.findProjectMember(Number(projectId), userId);

  if (!member) {
    throw new Error("Access denied");
  }

  if (!["OWNER", "ADMIN"].includes(member.role)) {
    throw new Error("Permission denied");
  }

  return projectRepo.updateProject(projectId, body);
};

export const deleteProject = async (projectId, userId) => {
  const member = await projectRepo.findProjectMember(Number(projectId), userId);

  if (!member) {
    throw new Error("Access denied");
  }

  if (member.role !== "OWNER") {
    throw new Error("Only owner can delete project");
  }

  await projectRepo.deleteProject(projectId);

  return {
    message: "Project deleted successfully",
  };
};

export const addProjectMember = async (projectId, currentUserId, body) => {
  const permission = await projectRepo.findProjectMember(
    Number(projectId),
    currentUserId,
  );

  if (!permission || !["OWNER", "ADMIN"].includes(permission.role)) {
    throw new Error("Permission denied");
  }

  const user = await authRepo.findByEmail(body.email);

  if (!user) {
    throw new Error("User not found");
  }

  const existing = await projectRepo.findProjectMember(
    Number(projectId),
    user.id,
  );

  if (existing) {
    throw new Error("User already in project");
  }

  return projectRepo.addMember({
    projectId: Number(projectId),
    userId: user.id,
    role: body.role,
  });
};

export const removeProjectMember = async (
  projectId,
  memberId,
  currentUserId,
) => {
  const permission = await projectRepo.findProjectMember(
    Number(projectId),
    currentUserId,
  );

  if (!permission || !["OWNER", "ADMIN"].includes(permission.role)) {
    throw new Error("Permission denied");
  }

  await projectRepo.removeMember(memberId);

  return {
    message: "Member removed successfully",
  };
};

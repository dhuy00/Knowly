import * as projectService from "./project.service.js";

export const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.user.id, req.body);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects(req.user.id);

    return res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectDetail = async (req, res) => {
  try {
    const project = await projectService.getProjectDetail(
      req.params.id,
      req.user.id,
    );

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.user.id,
      req.body,
    );

    return res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const result = await projectService.deleteProject(
      req.params.id,
      req.user.id,
    );

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addMember = async (req, res) => {
  try {
    const member = await projectService.addProjectMember(
      req.params.id,
      req.user.id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeMember = async (req, res) => {
  try {
    const result = await projectService.removeProjectMember(
      req.params.id,
      req.params.memberId,
      req.user.id,
    );

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

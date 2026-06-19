import { markMongoUnavailable, usingMongo } from "../config/db.js";
import { demoProjects } from "../data/demoStore.js";
import { Project } from "../models/Project.js";

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.trim()).filter(Boolean);
  }

  return String(tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function listProjects(req, res) {
  const { department, status } = req.query;

  if (!usingMongo()) {
    let projects = [...demoProjects];
    if (department) {
      projects = projects.filter((project) => project.department === department);
    }
    if (status) {
      projects = projects.filter((project) => project.status === status);
    }
    return res.json(projects);
  }

  const filter = {};
  if (department) filter.department = department;
  if (status) filter.status = status;

  try {
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    return res.json(projects);
  } catch (error) {
    markMongoUnavailable(error);
    let projects = [...demoProjects];
    if (department) {
      projects = projects.filter((project) => project.department === department);
    }
    if (status) {
      projects = projects.filter((project) => project.status === status);
    }
    return res.json(projects);
  }
}

export async function createProject(req, res) {
  const { title, description, department, facultyGuide, tags, links } = req.body;

  if (!title || !description || !department || !facultyGuide) {
    return res.status(400).json({ message: "Please fill all required project fields" });
  }

  const projectData = {
    title,
    description,
    department,
    studentId: req.user.id || req.user._id,
    studentName: req.user.name,
    facultyGuide,
    status: "pending",
    tags: normalizeTags(tags),
    links: Array.isArray(links) ? links : String(links || "").split(",").filter(Boolean),
    feedback: ""
  };

  if (!usingMongo()) {
    const project = {
      id: `p-${Date.now()}`,
      ...projectData,
      createdAt: new Date().toISOString()
    };
    demoProjects.unshift(project);
    return res.status(201).json(project);
  }

  try {
    const project = await Project.create(projectData);
    return res.status(201).json(project);
  } catch (error) {
    markMongoUnavailable(error);
    const project = {
      id: `p-${Date.now()}`,
      ...projectData,
      createdAt: new Date().toISOString()
    };
    demoProjects.unshift(project);
    return res.status(201).json(project);
  }
}

export async function updateProjectStatus(req, res) {
  const { id } = req.params;
  const { status, feedback } = req.body;
  const allowedStatuses = ["pending", "approved", "rejected", "completed"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  if (!usingMongo()) {
    const project = demoProjects.find((item) => item.id === id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.status = status;
    project.feedback = feedback || project.feedback;
    return res.json(project);
  }

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { status, feedback },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(project);
  } catch (error) {
    markMongoUnavailable(error);
    const project = demoProjects.find((item) => item.id === id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.status = status;
    project.feedback = feedback || project.feedback;
    return res.json(project);
  }
}

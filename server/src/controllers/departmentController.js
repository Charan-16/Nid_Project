import { markMongoUnavailable, usingMongo } from "../config/db.js";
import { demoDepartments, demoProjects } from "../data/demoStore.js";
import { Department } from "../models/Department.js";
import { Project } from "../models/Project.js";

function enrichDepartment(department) {
  const plainDepartment = department.toObject ? department.toObject() : department;
  const demoDepartment = demoDepartments.find(
    (item) => item.id === plainDepartment.slug || item.name === plainDepartment.name
  );

  return {
    ...plainDepartment,
    focusAreas: plainDepartment.focusAreas?.length ? plainDepartment.focusAreas : demoDepartment?.focusAreas || [],
    labs: plainDepartment.labs?.length ? plainDepartment.labs : demoDepartment?.labs || [],
    mvpModules: plainDepartment.mvpModules?.length ? plainDepartment.mvpModules : demoDepartment?.mvpModules || [],
    nextModules: plainDepartment.nextModules?.length
      ? plainDepartment.nextModules
      : demoDepartment?.nextModules || [],
    programmeLevel: plainDepartment.programmeLevel || demoDepartment?.programmeLevel || "",
    campusRole: plainDepartment.campusRole || demoDepartment?.campusRole || "",
    facultyNote: plainDepartment.facultyNote || demoDepartment?.facultyNote || ""
  };
}

export async function listDepartments(req, res) {
  if (!usingMongo()) {
    return res.json(demoDepartments);
  }

  try {
    const departments = await Department.find().sort({ name: 1 });
    return res.json(departments.map(enrichDepartment));
  } catch (error) {
    markMongoUnavailable(error);
    return res.json(demoDepartments);
  }
}

export async function getDepartment(req, res) {
  const { id } = req.params;

  if (!usingMongo()) {
    const department = demoDepartments.find((item) => item.id === id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const projects = demoProjects.filter((project) => project.department === department.name);
    return res.json({ ...enrichDepartment(department), projectList: projects });
  }

  try {
    const filter = id.match(/^[0-9a-fA-F]{24}$/) ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };
    const department = await Department.findOne(filter);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const projects = await Project.find({ department: department.name }).sort({ createdAt: -1 });
    return res.json({ ...enrichDepartment(department), projectList: projects });
  } catch (error) {
    markMongoUnavailable(error);
    const department = demoDepartments.find((item) => item.id === id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const projects = demoProjects.filter((project) => project.department === department.name);
    return res.json({ ...enrichDepartment(department), projectList: projects });
  }
}

import {
  demoClasses,
  demoFaculty,
  demoMapLocations,
  demoStaff,
  demoStudentBatches,
  demoWorkshops
} from "../data/demoStore.js";

function byDepartment(items, department) {
  if (!department) return items;
  return items.filter((item) => item.department === department);
}

export function listFaculty(req, res) {
  res.json(byDepartment(demoFaculty, req.query.department));
}

export function createFaculty(req, res) {
  const newFaculty = {
    id: `f-${demoFaculty.length}`,
    ...req.body,
    sourceStatus: "Verified"
  };
  demoFaculty.push(newFaculty);
  res.status(201).json(newFaculty);
}

export function deleteFaculty(req, res) {
  const { id } = req.params;
  const index = demoFaculty.findIndex(f => f.id === id);
  if (index !== -1) {
    demoFaculty.splice(index, 1);
    return res.status(204).send();
  }
  res.status(404).json({ message: "Faculty not found" });
}

export function listStaff(req, res) {
  res.json(byDepartment(demoStaff, req.query.department));
}

export function listStudentBatches(req, res) {
  res.json(byDepartment(demoStudentBatches, req.query.department));
}

export function listWorkshops(req, res) {
  res.json(byDepartment(demoWorkshops, req.query.department));
}

export function listClasses(req, res) {
  res.json(byDepartment(demoClasses, req.query.department));
}

export function createClass(req, res) {
  const newClass = {
    id: `c-${Date.now()}`,
    ...req.body
  };
  demoClasses.unshift(newClass);
  res.status(201).json(newClass);
}

export function updateClass(req, res) {
  const { id } = req.params;
  const index = demoClasses.findIndex((item) => item.id === id);
  if (index !== -1) {
    demoClasses[index] = { ...demoClasses[index], ...req.body };
    return res.json(demoClasses[index]);
  }
  res.status(404).json({ message: "Class not found" });
}

export function deleteClass(req, res) {
  const { id } = req.params;
  const index = demoClasses.findIndex((item) => item.id === id);
  if (index !== -1) {
    demoClasses.splice(index, 1);
    return res.status(204).send();
  }
  res.status(404).json({ message: "Class not found" });
}

export function listMapLocations(req, res) {
  res.json(demoMapLocations);
}


export function updateFaculty(req, res) {
  const { id } = req.params;
  const index = demoFaculty.findIndex(f => f.id === id);
  if (index !== -1) {
    demoFaculty[index] = { ...demoFaculty[index], ...req.body };
    return res.json(demoFaculty[index]);
  }
  res.status(404).json({ message: 'Faculty not found' });
}

export function updateStaff(req, res) {
  const { id } = req.params;
  const index = demoStaff.findIndex(s => s.id === id);
  if (index !== -1) {
    demoStaff[index] = { ...demoStaff[index], ...req.body };
    return res.json(demoStaff[index]);
  }
  res.status(404).json({ message: 'Staff not found' });
}

import React from "react";
import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Edit2, Plus, Save, Trash2, UserPlus, X } from "lucide-react";
import { api } from "../lib/api.js";

const emptyFaculty = {
  name: "",
  title: "",
  department: "",
  email: "",
  room: "",
  expertise: "",
  type: "Visiting",
  photoUrl: ""
};

const emptyStudent = {
  name: "",
  email: "",
  department: "",
  semester: "Semester 1"
};

const emptyClass = {
  title: "",
  topic: "",
  department: "",
  faculty: "",
  facultyType: "Permanent",
  date: "",
  time: "",
  room: "",
  batch: ""
};

function splitExpertise(value) {
  return typeof value === "string" ? value.split(",").map((item) => item.trim()).filter(Boolean) : value;
}

export default function Admin({ user }) {
  const [users, setUsers] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [deptFilter, setDeptFilter] = useState("");
  const [openForm, setOpenForm] = useState("");
  const [facultyFormData, setFacultyFormData] = useState(emptyFaculty);
  const [studentFormData, setStudentFormData] = useState(emptyStudent);
  const [classFormData, setClassFormData] = useState(emptyClass);
  const [editingFacultyId, setEditingFacultyId] = useState(null);
  const [editFacultyData, setEditFacultyData] = useState({});
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editStudentData, setEditStudentData] = useState({});

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  async function loadData() {
    try {
      const [usersRes, facultyRes, deptRes, classesRes] = await Promise.all([
        api.get("/users"),
        api.get("/campus/faculty"),
        api.get("/departments"),
        api.get("/campus/classes")
      ]);
      setUsers(usersRes.data);
      setFaculty(facultyRes.data);
      setDepartments(deptRes.data);
      setClasses(classesRes.data);
    } catch (error) {
      console.error("Failed to load admin data", error);
    }
  }

  const filteredFaculty = useMemo(
    () => faculty.filter((item) => (deptFilter ? item.department === deptFilter : true)),
    [faculty, deptFilter]
  );

  const filteredStudents = useMemo(
    () => users.filter((item) => item.role === "student").filter((item) => (deptFilter ? item.department === deptFilter : true)),
    [users, deptFilter]
  );

  const filteredClasses = useMemo(
    () => classes.filter((item) => (deptFilter ? item.department === deptFilter : true)),
    [classes, deptFilter]
  );

  const counts = {
    students: users.filter((item) => item.role === "student").length,
    faculty: faculty.length,
    visiting: faculty.filter((item) => item.type === "Visiting").length,
    sessions: classes.length
  };

  async function handleAddFaculty(event) {
    event.preventDefault();
    const payload = { ...facultyFormData, expertise: splitExpertise(facultyFormData.expertise) };
    const { data } = await api.post("/campus/faculty", payload);
    setFaculty((current) => [...current, data]);
    setFacultyFormData(emptyFaculty);
    setOpenForm("");
  }

  async function handleSaveFaculty() {
    const payload = { ...editFacultyData, expertise: splitExpertise(editFacultyData.expertise) };
    const { data } = await api.patch(`/campus/faculty/${editingFacultyId}`, payload);
    setFaculty((current) => current.map((item) => (item.id === editingFacultyId ? data : item)));
    setEditingFacultyId(null);
  }

  async function handleDeleteFaculty(id) {
    if (!confirm("Remove this faculty record?")) return;
    await api.delete(`/campus/faculty/${id}`);
    setFaculty((current) => current.filter((item) => item.id !== id));
  }

  async function handleAddStudent(event) {
    event.preventDefault();
    const { data } = await api.post("/users", { ...studentFormData, role: "student" });
    setUsers((current) => [...current, data]);
    setStudentFormData(emptyStudent);
    setOpenForm("");
  }

  async function handleSaveStudent() {
    const { data } = await api.patch(`/users/${editingStudentId}`, editStudentData);
    setUsers((current) => current.map((item) => (item.id === editingStudentId ? data : item)));
    setEditingStudentId(null);
  }

  async function handleDeleteUser(id) {
    if (!confirm("Remove this student account?")) return;
    await api.delete(`/users/${id}`);
    setUsers((current) => current.filter((item) => item.id !== id));
  }

  async function handleAddClass(event) {
    event.preventDefault();
    const { data } = await api.post("/campus/classes", classFormData);
    setClasses((current) => [data, ...current]);
    setClassFormData(emptyClass);
    setOpenForm("");
  }

  async function handleDeleteClass(id) {
    if (!confirm("Remove this class session?")) return;
    await api.delete(`/campus/classes/${id}`);
    setClasses((current) => current.filter((item) => item.id !== id));
  }

  if (!isAdmin) {
    return (
      <div className="empty-state">
        Only the admin account can edit campus information. Faculty accounts can review projects from the Review screen.
      </div>
    );
  }

  return (
    <div className="page-stack">
      <div className="page-actions">
        <div className="page-title">
          <span>Admin control room</span>
          <h2>Campus Data Management</h2>
        </div>
        <select className="compact-select" value={deptFilter} onChange={(event) => setDeptFilter(event.target.value)}>
          <option value="">All departments</option>
          {departments.map((department) => (
            <option key={department.id} value={department.name}>{department.name}</option>
          ))}
        </select>
      </div>

      <section className="admin-summary-grid">
        <div><span>Students</span><strong>{counts.students}</strong></div>
        <div><span>Faculty records</span><strong>{counts.faculty}</strong></div>
        <div><span>Visiting faculty</span><strong>{counts.visiting}</strong></div>
        <div><span>Scheduled classes</span><strong>{counts.sessions}</strong></div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h3>Faculty & Visiting Faculty</h3>
          <button className="primary-button fit" onClick={() => setOpenForm(openForm === "faculty" ? "" : "faculty")}>
            <Plus size={18} />
            Faculty
          </button>
        </div>

        {openForm === "faculty" && (
          <form className="form-panel" onSubmit={handleAddFaculty}>
            <div className="form-grid">
              <label><span>Name</span><input required value={facultyFormData.name} onChange={(e) => setFacultyFormData({ ...facultyFormData, name: e.target.value })} /></label>
              <label><span>Designation</span><input required value={facultyFormData.title} onChange={(e) => setFacultyFormData({ ...facultyFormData, title: e.target.value })} /></label>
              <label><span>Department</span><select required value={facultyFormData.department} onChange={(e) => setFacultyFormData({ ...facultyFormData, department: e.target.value })}><option value="">Select</option>{departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}</select></label>
              <label><span>Type</span><select value={facultyFormData.type} onChange={(e) => setFacultyFormData({ ...facultyFormData, type: e.target.value })}><option>Visiting</option><option>Permanent</option></select></label>
              <label><span>Email</span><input type="email" value={facultyFormData.email} onChange={(e) => setFacultyFormData({ ...facultyFormData, email: e.target.value })} /></label>
              <label><span>Topic / Expertise</span><input required value={facultyFormData.expertise} onChange={(e) => setFacultyFormData({ ...facultyFormData, expertise: e.target.value })} placeholder="UX, accessibility, critique" /></label>
              <label><span>Room</span><input value={facultyFormData.room} onChange={(e) => setFacultyFormData({ ...facultyFormData, room: e.target.value })} /></label>
              <label><span>Photo URL</span><input value={facultyFormData.photoUrl} onChange={(e) => setFacultyFormData({ ...facultyFormData, photoUrl: e.target.value })} /></label>
            </div>
            <button className="primary-button fit" type="submit"><Save size={18} />Save faculty</button>
          </form>
        )}

        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Department</th><th>Type</th><th>Expertise</th><th>Action</th></tr></thead>
            <tbody>
              {filteredFaculty.map((item) => (
                <tr key={item.id}>
                  {editingFacultyId === item.id ? (
                    <>
                      <td><input value={editFacultyData.name} onChange={(e) => setEditFacultyData({ ...editFacultyData, name: e.target.value })} /></td>
                      <td><select value={editFacultyData.department} onChange={(e) => setEditFacultyData({ ...editFacultyData, department: e.target.value })}>{departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}</select></td>
                      <td><select value={editFacultyData.type} onChange={(e) => setEditFacultyData({ ...editFacultyData, type: e.target.value })}><option>Permanent</option><option>Visiting</option></select></td>
                      <td><input value={Array.isArray(editFacultyData.expertise) ? editFacultyData.expertise.join(", ") : editFacultyData.expertise} onChange={(e) => setEditFacultyData({ ...editFacultyData, expertise: e.target.value })} /></td>
                      <td className="row-actions"><button className="icon-button" onClick={handleSaveFaculty}><Save size={16} /></button><button className="icon-button" onClick={() => setEditingFacultyId(null)}><X size={16} /></button></td>
                    </>
                  ) : (
                    <>
                      <td><strong>{item.name}</strong><small>{item.title}</small></td>
                      <td>{item.department}</td>
                      <td><span className={`status-badge ${item.type === "Visiting" ? "pending" : "approved"}`}>{item.type || "Permanent"}</span></td>
                      <td>{item.expertise?.join(", ")}</td>
                      <td className="row-actions"><button className="icon-button" onClick={() => { setEditingFacultyId(item.id); setEditFacultyData(item); }}><Edit2 size={16} /></button><button className="icon-button danger" onClick={() => handleDeleteFaculty(item.id)}><Trash2 size={16} /></button></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h3>Student Database</h3>
          <button className="primary-button fit blue" onClick={() => setOpenForm(openForm === "student" ? "" : "student")}>
            <UserPlus size={18} />
            Student
          </button>
        </div>

        {openForm === "student" && (
          <form className="form-panel" onSubmit={handleAddStudent}>
            <div className="form-grid">
              <label><span>Name</span><input required value={studentFormData.name} onChange={(e) => setStudentFormData({ ...studentFormData, name: e.target.value })} /></label>
              <label><span>Email</span><input required type="email" value={studentFormData.email} onChange={(e) => setStudentFormData({ ...studentFormData, email: e.target.value })} /></label>
              <label><span>Department</span><select required value={studentFormData.department} onChange={(e) => setStudentFormData({ ...studentFormData, department: e.target.value })}><option value="">Select</option>{departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}</select></label>
              <label><span>Semester</span><select value={studentFormData.semester} onChange={(e) => setStudentFormData({ ...studentFormData, semester: e.target.value })}><option>Semester 1</option><option>Semester 2</option><option>Semester 3</option><option>Semester 4</option></select></label>
            </div>
            <button className="primary-button fit blue" type="submit"><Save size={18} />Save student</button>
          </form>
        )}

        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Department</th><th>Semester</th><th>Email</th><th>Action</th></tr></thead>
            <tbody>
              {filteredStudents.map((item) => (
                <tr key={item.id}>
                  {editingStudentId === item.id ? (
                    <>
                      <td><input value={editStudentData.name} onChange={(e) => setEditStudentData({ ...editStudentData, name: e.target.value })} /></td>
                      <td><select value={editStudentData.department} onChange={(e) => setEditStudentData({ ...editStudentData, department: e.target.value })}>{departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}</select></td>
                      <td><select value={editStudentData.semester} onChange={(e) => setEditStudentData({ ...editStudentData, semester: e.target.value })}><option>Semester 1</option><option>Semester 2</option><option>Semester 3</option><option>Semester 4</option></select></td>
                      <td><input value={editStudentData.email} onChange={(e) => setEditStudentData({ ...editStudentData, email: e.target.value })} /></td>
                      <td className="row-actions"><button className="icon-button" onClick={handleSaveStudent}><Save size={16} /></button><button className="icon-button" onClick={() => setEditingStudentId(null)}><X size={16} /></button></td>
                    </>
                  ) : (
                    <>
                      <td><strong>{item.name}</strong></td><td>{item.department}</td><td>{item.semester}</td><td><code>{item.email}</code></td>
                      <td className="row-actions"><button className="icon-button" onClick={() => { setEditingStudentId(item.id); setEditStudentData(item); }}><Edit2 size={16} /></button><button className="icon-button danger" onClick={() => handleDeleteUser(item.id)}><Trash2 size={16} /></button></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h3>Class & Visiting Faculty Schedule</h3>
          <button className="primary-button fit amber" onClick={() => setOpenForm(openForm === "class" ? "" : "class")}>
            <CalendarPlus size={18} />
            Class
          </button>
        </div>

        {openForm === "class" && (
          <form className="form-panel" onSubmit={handleAddClass}>
            <div className="form-grid">
              <label><span>Class title</span><input required value={classFormData.title} onChange={(e) => setClassFormData({ ...classFormData, title: e.target.value })} /></label>
              <label><span>Topic</span><input required value={classFormData.topic} onChange={(e) => setClassFormData({ ...classFormData, topic: e.target.value })} /></label>
              <label><span>Department</span><select required value={classFormData.department} onChange={(e) => setClassFormData({ ...classFormData, department: e.target.value })}><option value="">Select</option>{departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}</select></label>
              <label><span>Faculty</span><input required value={classFormData.faculty} onChange={(e) => setClassFormData({ ...classFormData, faculty: e.target.value })} /></label>
              <label><span>Faculty type</span><select value={classFormData.facultyType} onChange={(e) => setClassFormData({ ...classFormData, facultyType: e.target.value })}><option>Permanent</option><option>Visiting</option></select></label>
              <label><span>Date</span><input required type="date" value={classFormData.date} onChange={(e) => setClassFormData({ ...classFormData, date: e.target.value })} /></label>
              <label><span>Start time</span><input required type="time" value={classFormData.time} onChange={(e) => setClassFormData({ ...classFormData, time: e.target.value })} /></label>
              <label><span>Room</span><input required value={classFormData.room} onChange={(e) => setClassFormData({ ...classFormData, room: e.target.value })} /></label>
              <label><span>Batch</span><input required value={classFormData.batch} onChange={(e) => setClassFormData({ ...classFormData, batch: e.target.value })} /></label>
            </div>
            <button className="primary-button fit amber" type="submit"><Save size={18} />Save class</button>
          </form>
        )}

        <div className="table-wrap">
          <table>
            <thead><tr><th>Class</th><th>Topic</th><th>Faculty</th><th>Date</th><th>Room</th><th>Action</th></tr></thead>
            <tbody>
              {filteredClasses.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong><small>{item.department}</small></td>
                  <td>{item.topic}</td>
                  <td>{item.faculty} <span className={`status-badge ${item.facultyType === "Visiting" ? "pending" : "approved"}`}>{item.facultyType}</span></td>
                  <td>{item.date} {item.time}</td>
                  <td>{item.room}</td>
                  <td><button className="icon-button danger" onClick={() => handleDeleteClass(item.id)}><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

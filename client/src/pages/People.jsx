import React from "react";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { Edit2, Save, X } from "lucide-react";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function People({ user }) {
  const [faculty, setFaculty] = useState([]);
  const [staff, setStaff] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const canEdit = user?.role === "admin";

  useEffect(() => {
    async function loadPeople() {
      try {
        const [facultyResponse, staffResponse] = await Promise.all([
          api.get("/campus/faculty"),
          api.get("/campus/staff")
        ]);
        setFaculty(facultyResponse.data);
        setStaff(staffResponse.data);
      } catch (error) {
        console.error("Failed to load people", error);
      }
    }

    loadPeople();
  }, []);

  const handleEdit = (person, type) => {
    setEditingId(person.id);
    setEditForm({ ...person, _type: type });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    try {
      const isFaculty = editForm._type === "faculty";
      const endpoint = isFaculty ? `/campus/faculty/${editingId}` : `/campus/staff/${editingId}`;
      
      const payload = { ...editForm };
      if (isFaculty && typeof payload.expertise === "string") {
        payload.expertise = payload.expertise.split(",").map(i => i.trim());
      }
      delete payload._type;

      const { data } = await api.patch(endpoint, payload);
      
      if (isFaculty) {
        setFaculty(faculty.map(f => f.id === editingId ? data : f));
      } else {
        setStaff(staff.map(s => s.id === editingId ? data : s));
      }
      
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      alert("Failed to save changes");
    }
  };

  const permanentFaculty = faculty.filter(f => f.type === "Permanent" || !f.type);
  const visitingFaculty = faculty.filter(f => f.type === "Visiting");

  const renderFacultyCard = (person) => {
    const isEditing = editingId === person.id;

    if (isEditing) {
      return (
        <article key={person.id} className="person-card editing">
          <div className="form-stack">
            <input 
              value={editForm.name} 
              onChange={e => setEditForm({...editForm, name: e.target.value})}
              placeholder="Name"
            />
            <input 
              value={editForm.title} 
              onChange={e => setEditForm({...editForm, title: e.target.value})}
              placeholder="Title"
            />
            <input 
              value={editForm.department} 
              onChange={e => setEditForm({...editForm, department: e.target.value})}
              placeholder="Department"
            />
            <input 
              value={Array.isArray(editForm.expertise) ? editForm.expertise.join(", ") : editForm.expertise} 
              onChange={e => setEditForm({...editForm, expertise: e.target.value})}
              placeholder="Expertise (comma separated)"
            />
            <div className="button-row" style={{ marginTop: "12px" }}>
              <button className="icon-button" onClick={handleSave} style={{ color: "var(--green)" }}><Save size={18} /></button>
              <button className="icon-button" onClick={handleCancel}><X size={18} /></button>
            </div>
          </div>
        </article>
      );
    }

    return (
      <article key={person.id} className="person-card">
        <div style={{ position: "absolute", top: "12px", right: "12px" }}>
          {canEdit && (
            <button className="icon-button" onClick={() => handleEdit(person, "faculty")}>
              <Edit2 size={14} />
            </button>
          )}
        </div>
        <div className="person-photo">
          {person.photoUrl ? <img src={person.photoUrl} alt={person.name} /> : initials(person.name)}
        </div>
        <div>
          <span>{person.department}</span>
          <h3>{person.name}</h3>
          <p>{person.title}</p>
        </div>
        <div className="tag-list">
          {person.expertise.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <footer>{person.sourceStatus || "Admin maintained"}</footer>
      </article>
    );
  };

  return (
    <div className="page-stack">
      <div className="page-title">
        <span>Campus directory</span>
        <h2>Faculty & Staff</h2>
        <p>Permanent and visiting faculty records are maintained by the campus admin office.</p>
      </div>

      <div className="panel-heading">
        <h3>Permanent Faculty</h3>
      </div>
      <section className="people-grid">
        {permanentFaculty.map(renderFacultyCard)}
      </section>

      {visitingFaculty.length > 0 && (
        <>
          <div className="panel-heading" style={{ marginTop: "32px" }}>
            <h3>Visiting Faculty</h3>
          </div>
          <section className="people-grid">
            {visitingFaculty.map(renderFacultyCard)}
          </section>
        </>
      )}

      <section className="panel" style={{ marginTop: "32px" }}>
        <div className="panel-heading">
          <h3>Staff Directory</h3>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Desk</th>
                {canEdit && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {staff.map((person) => (
                <tr key={person.id}>
                  {editingId === person.id ? (
                    <>
                      <td><input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} /></td>
                      <td><input value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} /></td>
                      <td><input value={editForm.department} onChange={e => setEditForm({...editForm, department: e.target.value})} /></td>
                      <td><input value={editForm.desk} onChange={e => setEditForm({...editForm, desk: e.target.value})} /></td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button className="icon-button" onClick={handleSave} style={{ color: "var(--green)" }}><Save size={16} /></button>
                          <button className="icon-button" onClick={handleCancel}><X size={16} /></button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{person.name}</td>
                      <td>{person.role}</td>
                      <td>{person.department}</td>
                      <td>{person.desk}</td>
                      {canEdit && (
                        <td>
                          <button className="icon-button" onClick={() => handleEdit(person, "staff")}>
                            <Edit2 size={16} />
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { api } from "../lib/api.js";

export default function NewProject({ user }) {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    department: user.department || "Interaction Design",
    facultyGuide: "Faculty Coordinator",
    tags: "",
    links: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/departments").then((response) => setDepartments(response.data));
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await api.post("/projects", form);
      navigate("/projects");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not create project");
    }
  }

  return (
    <div className="page-stack narrow">
      <div className="page-title">
        <span>Student submission</span>
        <h2>New Project</h2>
      </div>

      <form className="form-panel" onSubmit={handleSubmit}>
        <label>
          <span>Project title</span>
          <input value={form.title} onChange={(event) => updateField("title", event.target.value)} />
        </label>

        <label>
          <span>Description</span>
          <textarea
            rows="5"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </label>

        <div className="form-grid">
          <label>
            <span>Department</span>
            <select
              value={form.department}
              onChange={(event) => updateField("department", event.target.value)}
            >
              {departments.map((department) => (
                <option key={department.id || department._id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Faculty guide</span>
            <input
              value={form.facultyGuide}
              onChange={(event) => updateField("facultyGuide", event.target.value)}
            />
          </label>
        </div>

        <label>
          <span>Tags</span>
          <input
            placeholder="UX Research, Prototype, Campus"
            value={form.tags}
            onChange={(event) => updateField("tags", event.target.value)}
          />
        </label>

        <label>
          <span>Links</span>
          <input
            placeholder="https://..."
            value={form.links}
            onChange={(event) => updateField("links", event.target.value)}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button fit">
          <Save size={18} />
          Submit project
        </button>
      </form>
    </div>
  );
}

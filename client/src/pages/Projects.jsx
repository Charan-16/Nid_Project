import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { api } from "../lib/api.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api
      .get("/projects", { params: status ? { status } : {} })
      .then((response) => setProjects(response.data));
  }, [status]);

  return (
    <div className="page-stack">
      <div className="page-actions">
        <div className="page-title">
          <span>Student archive</span>
          <h2>Projects</h2>
        </div>
        <Link className="primary-button fit" to="/projects/new">
          <Plus size={18} />
          New project
        </Link>
      </div>

      <div className="segmented-control" aria-label="Filter projects">
        {[
          ["", "All"],
          ["pending", "Pending"],
          ["approved", "Approved"],
          ["completed", "Completed"]
        ].map(([value, label]) => (
          <button
            key={label}
            className={status === value ? "active" : ""}
            onClick={() => setStatus(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="project-list">
        {projects.map((project) => (
          <article key={project.id || project._id} className="project-card">
            <div className="project-card-top">
              <div>
                <p>{project.department}</p>
                <h3>{project.title}</h3>
              </div>
              <StatusBadge status={project.status} />
            </div>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.tags?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <footer>
              <span>{project.studentName}</span>
              <span>{project.facultyGuide}</span>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
}

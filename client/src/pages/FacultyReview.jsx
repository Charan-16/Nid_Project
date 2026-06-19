import React from "react";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { api } from "../lib/api.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function FacultyReview() {
  const [projects, setProjects] = useState([]);
  const [feedback, setFeedback] = useState({});

  async function loadProjects() {
    const { data } = await api.get("/projects", { params: { status: "pending" } });
    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function reviewProject(project, status) {
    await api.patch(`/projects/${project.id || project._id}/status`, {
      status,
      feedback: feedback[project.id || project._id] || ""
    });
    loadProjects();
  }

  return (
    <div className="page-stack">
      <div className="page-title">
        <span>Faculty workflow</span>
        <h2>Project Review</h2>
      </div>

      <section className="project-list">
        {projects.length === 0 ? (
          <div className="empty-state">No pending projects right now.</div>
        ) : null}

        {projects.map((project) => {
          const projectId = project.id || project._id;
          return (
            <article key={projectId} className="project-card review-card">
              <div className="project-card-top">
                <div>
                  <p>{project.department}</p>
                  <h3>{project.title}</h3>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <p>{project.description}</p>
              <textarea
                rows="3"
                placeholder="Faculty feedback"
                value={feedback[projectId] || ""}
                onChange={(event) =>
                  setFeedback((current) => ({ ...current, [projectId]: event.target.value }))
                }
              />
              <div className="button-row">
                <button className="secondary-button" onClick={() => reviewProject(project, "rejected")}>
                  <X size={18} />
                  Reject
                </button>
                <button className="primary-button fit" onClick={() => reviewProject(project, "approved")}>
                  <Check size={18} />
                  Approve
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

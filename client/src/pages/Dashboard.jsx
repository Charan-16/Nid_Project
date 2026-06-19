import React from "react";
import { useEffect, useState } from "react";
import { Building2, ClipboardList, FolderKanban, ArrowRight, CalendarDays, ShieldCheck } from "lucide-react";
import { api } from "../lib/api.js";
import StatCard from "../components/StatCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import Carousel from "../components/Carousel.jsx";
import { Link } from "react-router-dom";

export default function Dashboard({ user }) {
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [departmentResponse, projectResponse] = await Promise.all([
          api.get("/departments"),
          api.get("/projects")
        ]);
        setDepartments(departmentResponse.data);
        setProjects(projectResponse.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    }

    loadData();
  }, []);

  const pending = projects.filter((project) => project.status === "pending").length;
  const approved = projects.filter((project) => project.status === "approved").length;

  return (
    <div className="page-stack">
      <section className="dashboard-carousel-section">
        <Carousel />
      </section>

      <section className="welcome-banner">
        <div className="welcome-text">
          <span>{user.role} workspace</span>
          <h2>National Institute of Design, Bengaluru</h2>
          <p>
            A focused campus operating portal for the five Bengaluru M.Des disciplines, student archives,
            faculty reviews, visiting faculty sessions, and campus information.
          </p>
        </div>
        <div className="quick-actions">
           <Link to="/projects/new" className="action-card">
              <FolderKanban size={24} />
              <div>
                 <h4>Submit Project</h4>
                 <p>Upload your latest design work</p>
              </div>
              <ArrowRight size={16} />
           </Link>
           <Link to="/map" className="action-card">
              <Building2 size={24} />
              <div>
                 <h4>Campus Map</h4>
                 <p>Find labs and studios</p>
              </div>
              <ArrowRight size={16} />
           </Link>
           <Link to="/classes" className="action-card">
              <CalendarDays size={24} />
              <div>
                 <h4>Class Schedule</h4>
                 <p>Topics, rooms, and visiting faculty</p>
              </div>
              <ArrowRight size={16} />
           </Link>
        </div>
      </section>

      <section className="stats-grid" aria-label="Campus summary">
        <StatCard label="Departments" value={departments.length} detail="Active Disciplines" icon={Building2} />
        <StatCard label="Total Projects" value={projects.length} detail="Archive database" icon={FolderKanban} />
        <StatCard label="Pending Review" value={pending} detail="Faculty action items" icon={ClipboardList} />
        <StatCard label="Approved Works" value={approved} detail="Published archive" icon={ShieldCheck} />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-heading">
            <h3>Recent Projects</h3>
            <Link to="/projects" className="text-link">View all</Link>
          </div>
          <div className="project-list compact">
            {projects.length > 0 ? (
              projects.slice(0, 4).map((project) => (
                <article key={project.id || project._id} className="project-row">
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.department} • {project.studentName}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </article>
              ))
            ) : (
              <p className="empty-msg">No projects found.</p>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <h3>Departments</h3>
            <Link to="/departments" className="text-link">Explore</Link>
          </div>
          <div className="department-mini-list">
            {departments.slice(0, 5).map((department) => (
              <div key={department.id || department._id}>
                <strong>{department.name}</strong>
                <span>{department.projects || 0} projects</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

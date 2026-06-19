import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, FlaskConical, FolderKanban, GraduationCap, ListChecks, Users } from "lucide-react";
import { api } from "../lib/api.js";
import StatusBadge from "../components/StatusBadge.jsx";

export default function DepartmentDetail() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: deptData } = await api.get(`/departments/${id}`);
        setDepartment(deptData);
        
        // Fetch faculty for this specific department
        const { data: facultyData } = await api.get(`/campus/faculty?department=${deptData.name}`);
        setFaculty(facultyData);
      } catch (error) {
        console.error("Failed to load department detail", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return <div className="loading-screen">Loading department...</div>;
  }

  const projects = department.projectList || [];
  const permanentFaculty = faculty.filter(f => f.type === "Permanent" || !f.type);
  const visitingFaculty = faculty.filter(f => f.type === "Visiting");

  return (
    <div className="page-stack">
      <Link className="back-link" to="/departments">
        <ArrowLeft size={18} />
        Departments
      </Link>

      <section className="department-hero">
        <div>
          <span>{department.programmeLevel || department.shortName}</span>
          <h2>{department.name}</h2>
          <p>{department.description}</p>
        </div>
        <div className="department-facts">
          <div>
            <GraduationCap size={20} />
            <strong>{department.students}</strong>
            <span>students</span>
          </div>
          <div>
            <FolderKanban size={20} />
            <strong>{projects.length || department.projects}</strong>
            <span>projects</span>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-heading">
            <h3>Campus Role</h3>
            <ListChecks size={20} />
          </div>
          {department.campusRole ? <p className="panel-copy">{department.campusRole}</p> : null}
          <div className="module-list">
            {department.mvpModules?.map((module) => (
              <div key={module}>{module}</div>
            ))}
          </div>
          
          <div className="panel-heading" style={{ marginTop: "32px" }}>
            <h3>Department Faculty</h3>
            <Users size={20} />
          </div>
          <div className="project-list compact">
            {permanentFaculty.map((f) => (
              <div key={f.id} className="project-row" style={{ alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: 0 }}>{f.name}</h4>
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>{f.title}</p>
                </div>
                <span className="status-badge approved">Permanent</span>
              </div>
            ))}
            {visitingFaculty.map((f) => (
              <div key={f.id} className="project-row" style={{ alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: 0 }}>{f.name}</h4>
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>{f.title}</p>
                </div>
                <span className="status-badge pending">Visiting</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <h3>Labs & Focus</h3>
            <FlaskConical size={20} />
          </div>
          {department.facultyNote ? <p className="panel-copy">{department.facultyNote}</p> : null}
          <div className="tag-list">
            {department.focusAreas?.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
          <div className="department-mini-list">
            {department.labs?.map((lab) => (
              <div key={lab}>
                <strong>{lab}</strong>
                <span>resource mapping later</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h3>Department Projects</h3>
          <Link className="text-link" to="/projects/new">
            Submit project
          </Link>
        </div>
        <div className="project-list compact">
          {projects.map((project) => (
            <article key={project.id || project._id} className="project-row">
              <div>
                <h4>{project.title}</h4>
                <p>{project.studentName} / {project.facultyGuide}</p>
              </div>
              <StatusBadge status={project.status} />
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h3>Expansion After MVP</h3>
        </div>
        <div className="module-list secondary">
          {department.nextModules?.map((module) => (
            <div key={module}>{module}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

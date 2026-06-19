import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get("/departments").then((response) => setDepartments(response.data));
  }, []);

  return (
    <div className="page-stack">
      <div className="page-title">
        <span>Academic structure</span>
        <h2>Departments</h2>
      </div>

      <section className="department-grid">
        {departments.map((department) => (
          <article key={department.id || department._id} className="department-card">
            <div className="department-code">{department.shortName}</div>
            <h3>{department.name}</h3>
            <p>{department.description}</p>
            <dl>
              <div>
                <dt>Lead</dt>
                <dd>{department.lead}</dd>
              </div>
              <div>
                <dt>Students</dt>
                <dd>{department.students}</dd>
              </div>
            </dl>
            <Link className="text-link" to={`/departments/${department.slug || department.id || department._id}`}>
              Open department
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}

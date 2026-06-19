import React from "react";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Students() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    api.get("/campus/students").then((response) => setBatches(response.data));
  }, []);

  return (
    <div className="page-stack">
      <div className="page-title">
        <span>Student database</span>
        <h2>Current & Previous Batches</h2>
        <p>Department-wise batch strength and archive readiness for the five Bengaluru M.Des disciplines.</p>
      </div>

      <section className="batch-grid">
        {batches.map((batch) => (
          <article key={batch.id} className="batch-card">
            <span>{batch.department}</span>
            <div className="batch-card-main">
              <strong>{batch.year}</strong>
              <b>{batch.strength}</b>
            </div>
            <footer>
              <small>{batch.currentSemester}</small>
              <small>{batch.archiveStatus}</small>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
}

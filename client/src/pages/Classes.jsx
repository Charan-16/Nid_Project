import React from "react";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, UserRound } from "lucide-react";
import { api } from "../lib/api.js";

export default function Classes() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    api.get("/campus/classes").then((response) => setClasses(response.data));
  }, []);

  return (
    <div className="page-stack">
      <div className="page-title">
        <span>Academic schedule</span>
        <h2>Upcoming Classes</h2>
        <p>Studio sessions, visiting faculty lectures, review slots, and class topics by department.</p>
      </div>

      <section className="session-grid">
        {classes.map((item) => (
          <article key={item.id} className="session-card">
            <div className="session-card-head">
              <div>
                <span>{item.department}</span>
                <h3>{item.title}</h3>
              </div>
              <span className={`status-badge ${item.facultyType === "Visiting" ? "pending" : "approved"}`}>
                {item.facultyType || "Permanent"}
              </span>
            </div>
            <p>{item.topic}</p>
            <div className="info-strip">
              <span><CalendarDays size={16} />{item.date}</span>
              <span><Clock size={16} />{item.time}</span>
              <span><MapPin size={16} />{item.room}</span>
              <span><UserRound size={16} />{item.batch}</span>
            </div>
            <footer>
              <span>Faculty</span>
              <strong>{item.faculty}</strong>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
}

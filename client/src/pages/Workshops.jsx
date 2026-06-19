import React from "react";
import { useEffect, useState } from "react";
import { CalendarDays, MapPin, UsersRound } from "lucide-react";
import { api } from "../lib/api.js";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    api.get("/campus/workshops").then((response) => setWorkshops(response.data));
  }, []);

  return (
    <div className="page-stack">
      <div className="page-title">
        <span>Workshop conduction</span>
        <h2>Upcoming Workshops</h2>
      </div>

      <section className="project-list">
        {workshops.map((workshop) => (
          <article key={workshop.id} className="project-card">
            <div className="project-card-top">
              <div>
                <p>{workshop.department}</p>
                <h3>{workshop.title}</h3>
              </div>
              <span className={`status-badge ${workshop.status}`}>{workshop.status}</span>
            </div>
            <div className="info-strip">
              <span>
                <CalendarDays size={16} />
                {workshop.date} / {workshop.time}
              </span>
              <span>
                <MapPin size={16} />
                {workshop.venue}
              </span>
              <span>
                <UsersRound size={16} />
                {workshop.seats} seats
              </span>
            </div>
            <footer>
              <span>Facilitator</span>
              <span>{workshop.facilitator}</span>
            </footer>
          </article>
        ))}
      </section>
    </div>
  );
}

import React from "react";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function CampusMap() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.get("/campus/map").then((response) => setLocations(response.data));
  }, []);

  return (
    <div className="page-stack">
      <div className="page-title">
        <span>Campus wayfinding</span>
        <h2>NID Bengaluru Map</h2>
      </div>

      <section className="map-layout">
        <div className="campus-map" aria-label="Campus map">
          {locations.map((location) => (
            <button
              key={location.id}
              className="map-pin"
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
              title={location.name}
            >
              <span>{location.name}</span>
            </button>
          ))}
        </div>

        <div className="panel">
          <div className="panel-heading">
            <h3>Locations</h3>
          </div>
          <div className="department-mini-list">
            {locations.map((location) => (
              <div key={location.id}>
                <strong>{location.name}</strong>
                <span>{location.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

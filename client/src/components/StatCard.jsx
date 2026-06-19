import React from "react";

export default function StatCard({ label, value, detail, icon: Icon }) {
  return (
    <article className="stat-card">
      <div className="stat-info">
        <span className="label">{label}</span>
        <strong className="value">{value}</strong>
        <small className="detail">{detail}</small>
      </div>
      {Icon ? (
        <div className="stat-icon">
          <Icon size={24} />
        </div>
      ) : null}
    </article>
  );
}

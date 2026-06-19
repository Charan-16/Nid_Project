import React from "react";

export default function Profile({ user }) {
  return (
    <div className="page-stack narrow">
      <div className="page-title">
        <span>Account</span>
        <h2>Profile</h2>
      </div>

      <section className="profile-panel">
        <div className="profile-avatar">{user.name?.slice(0, 2).toUpperCase()}</div>
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <dl>
          <div>
            <dt>Role</dt>
            <dd>{user.role}</dd>
          </div>
          <div>
            <dt>Department</dt>
            <dd>{user.department}</dd>
          </div>
          {user.semester ? (
            <div>
              <dt>Semester</dt>
              <dd>{user.semester}</dd>
            </div>
          ) : null}
        </dl>
      </section>
    </div>
  );
}

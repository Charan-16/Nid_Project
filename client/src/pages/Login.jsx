import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, LockKeyhole, Mail } from "lucide-react";
import { api } from "../lib/api.js";

const demoAccounts = [
  { label: "Student", email: "student@nid.edu" },
  { label: "Faculty", email: "faculty@nid.edu" },
  { label: "Admin", email: "admin@nid.edu" }
];

export default function Login({ auth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("student@nid.edu");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });
      auth.setSession(data.token, data.user);
      navigate("/");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-layout">
      <section className="login-panel" aria-label="Login">
        <div className="login-heading">
          <div className="brand-mark large">NID</div>
          <div>
            <p>National Institute of Design Bengaluru</p>
            <h1>Campus Project & Resource Portal</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <span>Email</span>
            <div className="input-with-icon">
              <Mail size={18} />
              <input value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
          </label>

          <label>
            <span>Password</span>
            <div className="input-with-icon">
              <LockKeyhole size={18} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-button" disabled={submitting}>
            <GraduationCap size={18} />
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="demo-switcher">
          {demoAccounts.map((account) => (
            <button key={account.email} onClick={() => setEmail(account.email)}>
              {account.label}
            </button>
          ))}
        </div>
      </section>

      <section className="login-context">
        <div>
          <span>Bengaluru campus MVP</span>
          <h2>Start at the gate: one campus system, one department first.</h2>
          <p>
            This version focuses on student project documentation, department archives, faculty
            review, and admin visibility.
          </p>
        </div>
      </section>
    </main>
  );
}

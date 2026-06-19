import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { api } from "./lib/api.js";
import AppShell from "./components/AppShell.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Departments from "./pages/Departments.jsx";
import DepartmentDetail from "./pages/DepartmentDetail.jsx";
import Projects from "./pages/Projects.jsx";
import NewProject from "./pages/NewProject.jsx";
import FacultyReview from "./pages/FacultyReview.jsx";
import Admin from "./pages/Admin.jsx";
import Profile from "./pages/Profile.jsx";
import People from "./pages/People.jsx";
import Students from "./pages/Students.jsx";
import Workshops from "./pages/Workshops.jsx";
import Classes from "./pages/Classes.jsx";
import CampusMap from "./pages/CampusMap.jsx";

function Protected({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("nid-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("nid-token")));

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        localStorage.setItem("nid-user", JSON.stringify(data.user));
      } catch (error) {
        localStorage.removeItem("nid-token");
        localStorage.removeItem("nid-user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (localStorage.getItem("nid-token")) {
      loadUser();
    }
  }, []);

  const auth = useMemo(
    () => ({
      user,
      setSession(token, nextUser) {
        localStorage.setItem("nid-token", token);
        localStorage.setItem("nid-user", JSON.stringify(nextUser));
        setUser(nextUser);
      },
      logout() {
        localStorage.removeItem("nid-token");
        localStorage.removeItem("nid-user");
        setUser(null);
      }
    }),
    [user]
  );

  if (loading) {
    return <div className="loading-screen">Loading NID Campus Portal...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login auth={auth} />} />
      <Route
        path="/"
        element={
          <Protected user={user}>
            <AppShell auth={auth} />
          </Protected>
        }
      >
        <Route index element={<Dashboard user={user} />} />
        <Route path="departments" element={<Departments />} />
        <Route path="departments/:id" element={<DepartmentDetail />} />
        <Route path="people" element={<People user={user} />} />
        <Route path="students" element={<Students />} />
        <Route path="workshops" element={<Workshops />} />
        <Route path="classes" element={<Classes />} />
        <Route path="map" element={<CampusMap />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<NewProject user={user} />} />
        <Route path="faculty/review" element={<FacultyReview user={user} />} />
        <Route path="admin" element={<Admin user={user} />} />
        <Route path="profile" element={<Profile user={user} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

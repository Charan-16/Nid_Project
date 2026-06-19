import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  ClipboardCheck,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Map,
  Presentation,
  Shield,
  Users,
  UserRound,
  Bell,
  Search
} from "lucide-react";
import Footer from "./Footer.jsx";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/departments", label: "Departments", icon: Building2 },
  { to: "/people", label: "People", icon: Users },
  { to: "/students", label: "Students", icon: UserRound },
  { to: "/workshops", label: "Workshops", icon: Presentation },
  { to: "/classes", label: "Classes", icon: CalendarDays },
  { to: "/map", label: "Map", icon: Map },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/faculty/review", label: "Review", icon: ClipboardCheck },
  { to: "/admin", label: "Admin", icon: Shield }
];

export default function AppShell({ auth }) {
  const navigate = useNavigate();

  function logout() {
    auth.logout();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/">
          <div className="brand-mark">NID</div>
          <span>
            <strong>Campus Portal</strong>
            <small>Bengaluru Campus</small>
          </span>
        </Link>

        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-user">
          <div className="avatar" aria-hidden="true">
            <UserRound size={18} />
          </div>
          <div>
            <strong>{auth.user?.name}</strong>
            <span>{auth.user?.role}</span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
             <div className="search-bar">
                <Search size={16} />
                <input type="text" placeholder="Search resources, projects..." />
             </div>
          </div>
          <div className="topbar-right">
            <button className="icon-button" title="Notifications">
              <Bell size={18} />
            </button>
            <div className="topbar-user-info">
               <p>{auth.user?.department || "General"}</p>
               <h3>Welcome, {auth.user?.name.split(' ')[0]}</h3>
            </div>
            <button className="logout-button" onClick={logout} title="Log out">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="content-wrapper">
          <Outlet />
        </div>
        
        <Footer />
      </main>
    </div>
  );
}

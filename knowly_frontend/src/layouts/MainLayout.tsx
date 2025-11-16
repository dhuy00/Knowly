import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function MainLayout() {
  const [filter, setFilter] = useState("all");

  return (
    <div>
      <nav style={{ display: "flex", gap: 20 }}>
        <Sidebar onSelect={(id) => setFilter(id)}/>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}

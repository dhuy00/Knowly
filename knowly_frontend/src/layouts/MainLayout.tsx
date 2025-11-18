import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function MainLayout() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex font-poppins bg-background-primary">
      <nav style={{ display: "flex", gap: 20 }}>
        <Sidebar onSelect={(id) => setFilter(id)}/>
      </nav>

      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}

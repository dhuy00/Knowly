import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function MainLayout() {

  return (
    <div className="flex font-poppins bg-background-primary p-4 h-screen">
      <nav style={{ display: "flex", gap: 20 }}>
        <Sidebar/>
      </nav>

      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}

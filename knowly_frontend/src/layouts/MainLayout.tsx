import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "../components/common/Navigation";

export default function MainLayout() {

  return (
    <div className="font-inter text-white bg-background-primary p-4 h-screen">
      <Navigation/>

      <div style={{ paddingTop: 20, width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}

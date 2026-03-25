import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "../components/common/Navigation";

export default function MainLayout() {

  return (
    <div className="font-inter text-white bg-background-primary p-4 min-h-screen">
      <Navigation/>

      <div className="h-full" style={{ paddingTop: 20, width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}

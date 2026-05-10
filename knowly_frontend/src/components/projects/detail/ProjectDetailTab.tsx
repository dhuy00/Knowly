import React from "react";
import { useState } from "react";

const ProjectDetailTab = ({activeTab, setActiveTab}) => {

  return (
    <div className="border-b border-[#2A2A2A] px-6 flex items-center gap-6">
      {["overview", "tasks", "board", "timeline"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab as any)}
          className={`py-3 text-sm capitalize border-b-2 transition ${
            activeTab === tab
              ? "text-white border-emerald-500"
              : "text-gray-400 border-transparent hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProjectDetailTab;

import React from "react";
import {
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MemberList from "./MemberList";
import Description from "./Description";
import TaskList from "./TaskList";
import Documents from "./Documents";
import ProgressBar from "./ProgressBar";
import ProjectInfo from "./ProjectInfo";
import Team from "./Team";

const ProjectDetail = () => {
  const navigate = useNavigate();

  const project = {
    name: "Task Management Platform",
    description:
      "A collaborative platform that allows teams to manage projects, track issues, monitor progress and collaborate efficiently.",
    progress: 64,
    estimate: "120h",
    spent: "74h",
    start: "12 Mar 2026",
    due: "30 Apr 2026",
    members: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3",
      "https://i.pravatar.cc/40?img=4",
    ],
  };

  const tasks = [
    {
      title: "Design login UI",
      status: "In Progress",
      priority: "High",
      assignee: "Huy",
      estimate: "6h",
      spent: "3h",
    },
    {
      title: "Implement authentication API",
      status: "Todo",
      priority: "Medium",
      assignee: "Minh",
      estimate: "10h",
      spent: "0h",
    },
    {
      title: "Setup database schema",
      status: "Done",
      priority: "Low",
      assignee: "An",
      estimate: "5h",
      spent: "5h",
    },
  ];

  const documents = [
    { name: "Project_Specification.pdf", size: "2.1MB" },
    { name: "Database_Design.png", size: "540KB" },
    { name: "UI_Mockup.fig", size: "1.3MB" },
  ];

  return (
    <div className="w-full h-full overflow-auto bg-background-primary rounded-xl p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-sm hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-lg font-semibold">{project.name}</h1>
            <p className="text-gray-500 text-xs">Last updated 2 hours ago</p>
          </div>
        </div>

        {/* MEMBERS */}
        <MemberList members={project.members}/>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-4 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-3 space-y-6">
          {/* DESCRIPTION */}
          <Description description={project.description}/>

          {/* TASK LIST */}
          <TaskList/>

          {/* DOCUMENTS */}
          <Documents documents={documents}/>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">
          {/* PROGRESS */}
          <ProgressBar progress={project.progress}/>

          {/* PROJECT INFO */}
          <ProjectInfo start={project.start} due={project.due} estimate={project.estimate} spent={project.spent}/>

          {/* TEAM */}
        <Team members={project.members}/>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

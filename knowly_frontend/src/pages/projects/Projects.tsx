import React, { useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiUsers,
  FiMoreVertical,
} from "react-icons/fi";
import { FaRocket, FaDatabase, FaCloud } from "react-icons/fa";

const projectsData = [
  {
    id: 1,
    name: "Task Management Platform",
    description:
      "A collaborative workspace to manage tasks, sprints and team productivity.",
    icon: <FaRocket className="text-purple-500 text-xl" />,
    status: "Active",
    priority: "High",
    members: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3",
    ],
    tasks: 120,
    completed: 80,
    progress: 67,
    due: "2026-04-12",
  },
  {
    id: 2,
    name: "Weather Analytics",
    description:
      "Visualizing global weather datasets with charts and time-series analysis.",
    icon: <FaCloud className="text-blue-500 text-xl" />,
    status: "Planning",
    priority: "Medium",
    members: [
      "https://i.pravatar.cc/40?img=4",
      "https://i.pravatar.cc/40?img=5",
    ],
    tasks: 60,
    completed: 20,
    progress: 33,
    due: "2026-05-01",
  },
  {
    id: 3,
    name: "Book Management API",
    description:
      "ASP.NET Core Web API for book catalog and inventory management.",
    icon: <FaDatabase className="text-green-500 text-xl" />,
    status: "Completed",
    priority: "Low",
    members: [
      "https://i.pravatar.cc/40?img=6",
      "https://i.pravatar.cc/40?img=7",
      "https://i.pravatar.cc/40?img=8",
      "https://i.pravatar.cc/40?img=9",
    ],
    tasks: 40,
    completed: 40,
    progress: 100,
    due: "2026-02-20",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-600",
  Planning: "bg-yellow-100 text-yellow-600",
  Completed: "bg-blue-100 text-blue-600",
};

const priorityColors = {
  High: "text-red-500",
  Medium: "text-yellow-500",
  Low: "text-green-500",
};

const Projects = () => {
  const [search, setSearch] = useState("");

  const filtered = projectsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-background-primary w-full h-full rounded-xl p-6 shadow-sm flex flex-col gap-6 overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
          + New Project
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center border rounded-lg px-3 py-2 w-72 bg-white">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          className="outline-none w-full"
          placeholder="Search project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-auto pr-2 p-1">

        {filtered.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-sm rounded-xl p-3 flex flex-col gap-3 hover:shadow-xl transition group"
          >

            {/* Top */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">

                <div className="bg-gray-100 p-2 rounded-lg">
                  {project.icon}
                </div>

                <div>
                  <h2 className="font-semibold text-[14px] leading-tight">
                    {project.name}
                  </h2>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <FiMoreVertical className="text-gray-400 cursor-pointer opacity-0 group-hover:opacity-100 transition" />
            </div>

            {/* Description */}
            <p className="text-[13px] text-gray-500 line-clamp-2">
              {project.description}
            </p>

            {/* Info */}
            <div className="flex justify-between text-sm">

              <div className="flex items-center gap-1 text-gray-500 text-[13px]">
                <FiCalendar />
                {project.due}
              </div>

              <div className={`font-medium text-[13px] ${priorityColors[project.priority]}`}>
                {project.priority} Priority
              </div>
            </div>

            {/* Tasks */}
            <div className="flex justify-between text-[13px] text-gray-500">
              <span>{project.completed}/{project.tasks} tasks</span>
              <span>{project.progress}%</span>
            </div>

            {/* Progress */}
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-indigo-500 rounded"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            {/* Members */}
            <div className="flex justify-between items-center mt-2">

              <div className="flex -space-x-2">
                {project.members.map((m, i) => (
                  <img
                    key={i}
                    src={m}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>

              <div className="flex items-center text-sm text-gray-500 gap-1">
                <FiUsers />
                {project.members.length}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
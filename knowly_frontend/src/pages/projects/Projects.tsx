import React, { useState } from "react";
import { FiSearch, FiCalendar, FiUsers, FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../../mock/mockProjects";


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
  const navigate = useNavigate();

  const filtered = projectsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openProjectDetail = (id: number) => {
    navigate(`${id}`)
  }

  return (
    <div className="bg-background-primary w-full h-full rounded-xl p-6 shadow-sm flex flex-col gap-2 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Projects</h1>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md 
        text-xs transition">
          + New Project
        </button>
      </div>

      {/* Search */}
      <div
        className="flex items-center w-72 bg-white rounded-lg px-4 py-2
                border border-gray-200 
                focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400
                transition"
      >
        <FiSearch className="text-gray-400 text-lg mr-2" />

        <input
          className="w-full bg-transparent outline-none text-xs placeholder-gray-400 placeholder:text-xs
          text-gray-600"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-auto pr-2 p-1">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-sm rounded-xl p-3 flex flex-col gap-3 transition group
            transform hover:scale-102 hover:shadow-lg cursor-pointer"
            onClick={() => openProjectDetail(project.id)}
          >
            {/* Top */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="bg-gray-100 p-2 rounded-lg">{project.icon}</div>

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

              <div
                className={`font-medium text-[13px] ${priorityColors[project.priority]}`}
              >
                {project.priority} Priority
              </div>
            </div>

            {/* Tasks */}
            <div className="flex justify-between text-[13px] text-gray-500">
              <span>
                {project.completed}/{project.tasks} tasks
              </span>
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

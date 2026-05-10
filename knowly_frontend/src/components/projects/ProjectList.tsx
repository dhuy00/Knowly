import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { mockProjects, mockUsers } from "../../mock/mockNav";

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.identifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });


  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A]">
      <div className="border-b border-[#2A2A2A] px-6 py-3 grid grid-cols-12 gap-4 text-sm text-gray-500">
        <div className="col-span-4">Project</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Progress</div>
        <div className="col-span-2">Tasks</div>
        <div className="col-span-2">Team</div>
      </div>
      <div className="divide-y divide-[#2A2A2A]">
        {filteredProjects.map((project) => {
          const progress = (project.spentTime / project.estimateTime) * 100;
          const completedTasks = project.tasks.filter(
            (t) => t.status === "done",
          ).length;

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#252525] transition"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="text-2xl">{project.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white mb-0.5">{project.name}</h3>
                  <p className="text-xs text-gray-500">{project.identifier}</p>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <span
                  className={`px-2 py-1 text-xs ${
                    project.status === "active"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-[#2A2A2A]">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: project.color,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-400">
                  {completedTasks} / {project.tasks.length}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="flex -space-x-2">
                  {project.participants.slice(0, 4).map((participantId) => {
                    const user = mockUsers.find((u) => u.id === participantId);
                    return (
                      <img
                        key={participantId}
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-7 h-7 border-2 border-[#1A1A1A]"
                        title={user?.name}
                      />
                    );
                  })}
                  {project.participants.length > 4 && (
                    <div className="w-7 h-7 bg-[#2A2A2A] border-2 border-[#1A1A1A] flex items-center justify-center text-xs text-gray-400">
                      +{project.participants.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;

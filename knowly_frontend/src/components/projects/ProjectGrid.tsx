import { useState } from "react";
import { Link } from "react-router";
import { mockProjects, mockUsers } from "../../mock/mockNav";

const ProjectGrid = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => {
        const progress = (project.spentTime / project.estimateTime) * 100;
        const completedTasks = project.tasks.filter(
          (t) => t.status === "done",
        ).length;
        const lead = mockUsers.find((u) => u.id === project.lead);

        return (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block bg-[#1A1A1A] border border-[#2A2A2A] hover:border-emerald-500/50 
            transition group rounded-md"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  {project.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white mb-1 group-hover:text-emerald-400 transition">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-500">{project.identifier}</p>
                </div>
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

              <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                {project.description
                  .split("\n")
                  .find((line) => !line.startsWith("#") && line.trim())}
              </p>

              <div className="space-y-3 mb-4 text-sm text-gray-500">
                <div className="flex items-center justify-between">
                  <span>Progress</span>
                  <span className="text-white">{progress.toFixed(0)}%</span>
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
                <div className="flex items-center justify-between">
                  <span>
                    {completedTasks} / {project.tasks.length} tasks
                  </span>
                  <span>
                    {project.spentTime}h / {project.estimateTime}h
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Lead:</span>
                  <div className="flex items-center gap-2">
                    <img
                      src={lead?.avatar}
                      alt={lead?.name}
                      className="w-6 h-6"
                    />
                    <span className="text-sm text-gray-400">
                      {lead?.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {project.participants.slice(0, 3).map((participantId) => {
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
                  {project.participants.length > 3 && (
                    <div className="w-7 h-7 bg-[#2A2A2A] border-2 border-[#1A1A1A] flex items-center justify-center text-xs text-gray-400">
                      +{project.participants.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectGrid;

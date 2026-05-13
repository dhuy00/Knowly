import {
  Calendar,
  Clock,
  Target,
  Settings,
  MoreVertical,
} from "lucide-react";
import {
  mockProjects,
  mockUsers,
} from "../../../mock/mockData";

const ProjectHeader = () => {
  const projectId = "3";
  const project = mockProjects.find((p) => p.id === projectId);

  if (!project) {
    console.log(projectId);
    return (
      <div className="min-h-full bg-[#0F0F0F] flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  const progress = (project.spentTime / project.estimateTime) * 100;
  const completedTasks = project.tasks.filter(
    (t) => t.status === "done",
  ).length;
  const lead = mockUsers.find((u) => u.id === project.lead);


  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] px-6 py-4 rounded-md">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1">
          <div
            className="w-14 h-14 flex items-center justify-center text-3xl rounded-sm"
            style={{ backgroundColor: `${project.color}20` }}
          >
            {project.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-lg font-medium text-white">{project.name}</h1>
              <span className="text-sm text-gray-500">
                {project.identifier}
              </span>
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
            <p className="text-gray-400 text-sm mb-4">
              Led by {lead?.name} • Created{" "}
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="size-4" />
                <span>
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="size-4" />
                <span>
                  {project.spentTime}h / {project.estimateTime}h
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Target className="size-4" />
                <span>
                  {completedTasks} / {project.tasks.length} tasks
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-[#2A2A2A] text-gray-400 hover:text-white transition">
            <Settings className="size-5" />
          </button>
          <button className="p-2 hover:bg-[#2A2A2A] text-gray-400 hover:text-white transition">
            <MoreVertical className="size-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Overall Progress</span>
          <span className="text-white">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-[#2A2A2A]">
          <div
            className="h-full transition-all"
            style={{
              width: `${Math.min(progress, 100)}%`,
              backgroundColor: project.color,
            }}
          />
        </div>
      </div>

      {/* Team */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Team:</span>
        <div className="flex -space-x-2">
          {project.participants.map((participantId) => {
            const user = mockUsers.find((u) => u.id === participantId);
            return (
              <img
                key={participantId}
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full border-1 border-gray-700"
                title={user?.name}
              />
            );
          })}
        </div>
        <button className="ml-2 px-3 py-1.5 border border-[#2A2A2A] text-sm text-gray-400 
        hover:text-white hover:border-emerald-500 transition rounded-sm">
          Add Member
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;

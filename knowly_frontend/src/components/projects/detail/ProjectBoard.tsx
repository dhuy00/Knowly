import { MessageSquare } from "lucide-react";
import { mockProjects, mockUsers } from "../../../mock/mockData";
import { Link } from "react-router-dom";

const ProjectBoard = () => {
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

  const priorityColors = {
    urgent: "bg-red-500/10 text-red-400 border-red-500/20",
    high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    low: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return (
    <div className="flex overflow-x-auto gap-4">
      {["backlog", "todo", "in-progress", "in-review", "done"].map((status) => {
        const tasks = project.tasks.filter((t) => t.status === status);
        return (
          <div
            key={status}
            className="bg-[#0F0F0F] border border-[#2A2A2A] min-w-[350px] rounded-md"
          >
            <div className="border-b border-[#2A2A2A] px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-white capitalize">
                {status.replace("-", " ")}
              </span>
              <span className="px-1.5 py-0.5 bg-[#2A2A2A] text-gray-400 text-xs">
                {tasks.length}
              </span>
            </div>
            <div className="p-3 space-y-3 min-h-[400px]">
              {tasks.map((task) => {
                const project = mockProjects.find((p) =>
                  p.tasks.some((t) => t.id === task.id),
                );
                const isOverdue =
                  task.dueDate &&
                  new Date(task.dueDate) < new Date() &&
                  task.status !== "done";

                return (
                  <Link
                    key={task.id}
                    to={`/projects/${project?.id}`}
                    className="block bg-[#0F0F0F] border border-[#2A2A2A]/50 hover:border-emerald-500/30 rounded-xl p-3 transition"
                  >
                    <div className="flex gap-2 mb-2 items-center">
                      <span className="text-sm text-white line-clamp-2">
                        {task.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-md ${priorityColors[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      {task.dueDate && (
                        <span className={isOverdue ? "text-red-400" : ""}>
                          {new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        {task.assignees.slice(0, 3).map((assigneeId) => {
                          const user = mockUsers.find(
                            (u) => u.id === assigneeId,
                          );
                          return (
                            <img
                              key={assigneeId}
                              src={user?.avatar}
                              alt={user?.name}
                              className="w-6 h-6 rounded-full"
                              title={user?.name}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectBoard;

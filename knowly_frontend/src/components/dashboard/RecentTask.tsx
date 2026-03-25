import { Link } from "react-router";
import { Calendar, ArrowUpRight } from "lucide-react";
import {
  mockProjects,
  mockTasks,
  currentUser,
} from "../../mock/mockData";

const RecentTask = () => {
  const myTasks = mockTasks.filter((t) => t.assignees.includes(currentUser.id));

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 w-[465px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[18px] font-semibold text-white mb-1">
            Recent Tasks
          </h2>
          <p className="text-xs text-gray-500">
            Your latest assignments across all projects
          </p>
        </div>
        <Link
          to="/my-work"
          className="text-xs text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-medium"
        >
          View all
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 max-h-[305px] overflow-y-scroll">
        {myTasks.slice(0, 6).map((task) => {
          const statusColors = {
            backlog: "bg-gray-500/20 text-gray-400",
            todo: "bg-gray-500/20 text-gray-400",
            "in-progress": "bg-emerald-500/20 text-emerald-400",
            "in-review": "bg-yellow-500/20 text-yellow-400",
            done: "bg-green-500/20 text-green-400",
            cancelled: "bg-red-500/20 text-red-400",
          };

          const priorityColors = {
            urgent: "border-red-500",
            high: "border-orange-500",
            medium: "border-yellow-500",
            low: "border-gray-500",
          };

          return (
            <Link
              key={task.id}
              to={`/projects/${mockProjects.find((p) => p.tasks.some((t) => t.id === task.id))?.id}`}
              className={`block bg-[#0F0F0F] rounded-xl px-4 py-2 hover:bg-[#252525] transition group`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-small text-gray-500 font-mono">
                      {task.identifier}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[task.status]}`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-white font-medium group-hover:text-emerald-400 transition line-clamp-2">
                    {task.name}
                  </p>
                </div>
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="size-3" />
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTask;

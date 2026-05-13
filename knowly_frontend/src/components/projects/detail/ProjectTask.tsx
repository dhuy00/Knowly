import { useState } from "react";
import { useParams, Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Plus, Calendar, Clock } from "lucide-react";
import { mockProjects, mockUsers, mockSprints } from "../../../mock/mockData";

const ProjectTask = () => {
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

  const statusColors = {
    backlog: "bg-gray-500/10 text-gray-400",
    todo: "bg-gray-500/10 text-gray-400",
    "in-progress": "bg-blue-500/10 text-blue-400",
    "in-review": "bg-yellow-500/10 text-yellow-400",
    done: "bg-green-500/10 text-green-400",
    cancelled: "bg-red-500/10 text-red-400",
  };

  const priorityColors = {
    urgent: "border-l-red-500",
    high: "border-l-orange-500",
    medium: "border-l-yellow-500",
    low: "border-l-gray-500",
  };

  const typeColors = {
    task: "bg-blue-500/10 text-blue-400",
    bug: "bg-red-500/10 text-red-400",
    feature: "bg-purple-500/10 text-purple-400",
    epic: "bg-green-500/10 text-green-400",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          All Tasks ({project.tasks.length})
        </h2>
        <button
          className="flex items-center gap-1.5 px-3.5 py-[8px] bg-emerald-600 hover:bg-emerald-700
           text-white rounded-sm transition text-sm font-medium"
        >
          <Plus className="size-4" />
          New Task
        </button>
      </div>
      <div className="space-y-2">
        {project.tasks.map((task) => {
          const assignee = mockUsers.find((u) => u.id === task.assignees[0]);
          const isOverdue =
            task.dueDate &&
            new Date(task.dueDate) < new Date() &&
            task.status !== "done";

          return (
            <div
              key={task.id}
              className={`border-l-2 ${priorityColors[task.priority]} bg-[#0F0F0F] border border-[#2A2A2A] p-4 hover:border-emerald-500/50 transition`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">
                      {task.identifier}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 text-xs ${typeColors[task.type]}`}
                    >
                      {task.type}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 text-xs ${statusColors[task.status]}`}
                    >
                      {task.status}
                    </span>
                    {task.sprint && (
                      <span className="px-1.5 py-0.5 text-xs bg-purple-500/10 text-purple-400">
                        {
                          mockSprints
                            .find((s) => s.id === task.sprint)
                            ?.name.split(" -")[0]
                        }
                      </span>
                    )}
                  </div>
                  <h3 className="text-white mb-1">{task.name}</h3>
                  {task.description && (
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {task.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  {task.dueDate && (
                    <div
                      className={`flex items-center gap-1.5 text-sm ${
                        isOverdue ? "text-red-400" : "text-gray-400"
                      }`}
                    >
                      <Calendar className="size-4" />
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Clock className="size-4" />
                    {task.spentTime}h / {task.estimateTime}h
                  </div>
                  {assignee && (
                    <img
                      src={assignee.avatar}
                      alt={assignee.name}
                      className="w-8 h-8"
                      title={assignee.name}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTask;

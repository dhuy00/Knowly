import React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Edit3, Save, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  mockProjects,
  mockUsers,
  mockTimeEntries,
  mockSprints,
} from "../../../mock/mockData";

const ProjectOverview = () => {
  const projectId = "3";
  const project = mockProjects.find((p) => p.id === projectId);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(project?.description || "");

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

  // Time spent per task type
  const taskTypeData = [
    {
      type: "Feature",
      hours: project.tasks
        .filter((t) => t.type === "feature")
        .reduce((sum, t) => sum + t.spentTime, 0),
    },
    {
      type: "Bug",
      hours: project.tasks
        .filter((t) => t.type === "bug")
        .reduce((sum, t) => sum + t.spentTime, 0),
    },
    {
      type: "Task",
      hours: project.tasks
        .filter((t) => t.type === "task")
        .reduce((sum, t) => sum + t.spentTime, 0),
    },
  ].filter((d) => d.hours > 0);

  // Active sprint
  const activeSprint = mockSprints.find(
    (s) => s.status === "active" && s.projectId === project.id,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Description</h2>
            <button
              onClick={() => {
                if (isEditingDescription) {
                  setIsEditingDescription(false);
                } else {
                  setIsEditingDescription(true);
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2A2A2A] 
                        hover:bg-[#3A3A3A] text-gray-400 hover:text-white transition text-sm
                        rounded-sm"
            >
              {isEditingDescription ? (
                <>
                  <Save className="size-4" />
                  Save
                </>
              ) : (
                <>
                  <Edit3 className="size-4" />
                  Edit
                </>
              )}
            </button>
          </div>
          {isEditingDescription ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A] 
                        text-white outline-none focus:border-blue-500 transition resize-none 
                        font-mono text-sm"
            />
          ) : (
            <div className="prose prose-sm max-w-none prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Time Breakdown */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Time Breakdown by Type
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taskTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="type" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #2A2A2A",
                  borderRadius: "0",
                  color: "#fff",
                }}
              />
              <Bar dataKey="hours" fill={project.color} barSize={80} radius={[8, 8, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        {/* Active Sprint */}
        {activeSprint && (
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] p-4 rounded-md">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="size-4 text-blue-400" />
              <h3 className="text-sm text-white">Active Sprint</h3>
            </div>
            <p className="text-white mb-2">{activeSprint.name}</p>
            <p className="text-xs text-gray-500 mb-3">{activeSprint.goal}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                {new Date(activeSprint.startDate).toLocaleDateString()}
              </span>
              <span>→</span>
              <span>{new Date(activeSprint.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] p-4 space-y-4 rounded-md">
          <h3 className="text-sm text-white mb-3">Project Stats</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-400">Tasks Completed</span>
                <span className="text-white">
                  {completedTasks}/{project.tasks.length}
                </span>
              </div>
              <div className="h-1.5 bg-[#2A2A2A]">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{
                    width: `${(completedTasks / project.tasks.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-400">Time Utilization</span>
                <span className="text-white">{progress.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 bg-[#2A2A2A]">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] p-4 rounded-md">
          <h3 className="text-sm text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {mockTimeEntries
              .filter((e) => e.projectId === project.id)
              .slice(0, 4)
              .map((entry) => {
                const user = mockUsers.find((u) => u.id === entry.userId);
                return (
                  <div key={entry.id} className="flex gap-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white mb-0.5">
                        {entry.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.name.split(" ")[0]} •{" "}
                        {new Date(entry.startTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;

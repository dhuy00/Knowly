import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Circle,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Calendar,
  MoreVertical,
  Edit3,
  Trash2,
} from "lucide-react";
import type { Task } from "../../types/task";
import { mockUsers } from "../../mock/mockData";

interface TaskItemProps {
  task: Task;
  level?: number;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskItem({ task, level = 0, onEdit, onDelete }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  const statusIcons = {
    "backlog": Circle,
    "todo": Circle,
    "in-progress": AlertCircle,
    "in-review": Clock,
    "done": CheckCircle2,
    "cancelled": XCircle,
  };

  const statusColors = {
    "backlog": "text-gray-500",
    "todo": "text-gray-400",
    "in-progress": "text-emerald-400",
    "in-review": "text-yellow-400",
    "done": "text-green-400",
    "cancelled": "text-red-400",
  };

  const priorityColors = {
    "urgent": "bg-red-500/10 text-red-400 border-red-500/30",
    "high": "bg-orange-500/10 text-orange-400 border-orange-500/30",
    "medium": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    "low": "bg-gray-500/10 text-gray-400 border-gray-500/30",
  };

  const typeColors = {
    "task": "bg-blue-500/10 text-blue-400",
    "bug": "bg-red-500/10 text-red-400",
    "feature": "bg-purple-500/10 text-purple-400",
    "epic": "bg-green-500/10 text-green-400",
  };

  const StatusIcon = statusIcons[task.status];
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";

  return (
    <div className={`${level > 0 ? "ml-8" : ""}`}>
      <div
        className={`bg-[#1A1A1A] border border-[#2A2A2A]/50 hover:border-emerald-500/30 rounded-2xl p-4 transition group ${
          level > 0 ? "border-l-2 border-l-emerald-500/50" : ""
        }`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-start gap-3">
          {/* Expand Button */}
          {hasSubtasks && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-[#2A2A2A] rounded-md transition text-gray-400 hover:text-white mt-0.5"
            >
              {isExpanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
          )}
          {!hasSubtasks && <div className="w-6" />}

          {/* Status Icon */}
          <StatusIcon className={`size-5 mt-0.5 flex-shrink-0 ${statusColors[task.status]}`} />

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs text-gray-500 font-mono">{task.identifier}</span>
                  <span className={`px-2 py-0.5 text-xs rounded ${typeColors[task.type]}`}>
                    {task.type}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded border ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  {task.sprint && (
                    <span className="px-2 py-0.5 text-xs bg-purple-500/10 text-purple-400 rounded">
                      Sprint
                    </span>
                  )}
                  {hasSubtasks && (
                    <span className="px-2 py-0.5 text-xs bg-emerald-500/10 text-emerald-400 rounded">
                      {task.subtasks.length} subtask{task.subtasks.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <h3 className="text-white mb-1 group-hover:text-emerald-400 transition">
                  {task.name}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">{task.description}</p>
                )}
              </div>

              {/* Actions */}
              {showActions && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit?.(task)}
                    className="p-1.5 hover:bg-[#2A2A2A] rounded-md transition text-gray-400 hover:text-emerald-400"
                    title="Edit task"
                  >
                    <Edit3 className="size-4" />
                  </button>
                  <button
                    onClick={() => onDelete?.(task.id)}
                    className="p-1.5 hover:bg-[#2A2A2A] rounded-md transition text-gray-400 hover:text-red-400"
                    title="Delete task"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <button className="p-1.5 hover:bg-[#2A2A2A] rounded-md transition text-gray-400 hover:text-white">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Task Meta */}
            <div className="flex items-center gap-4 text-sm flex-wrap">
              {task.dueDate && (
                <div className={`flex items-center gap-1.5 ${
                  isOverdue ? "text-red-400" : "text-gray-400"
                }`}>
                  <Calendar className="size-4" />
                  {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              )}
              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock className="size-4" />
                {task.spentTime}h / {task.estimateTime}h
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  {task.assignees.slice(0, 3).map((assigneeId) => {
                    const user = mockUsers.find(u => u.id === assigneeId);
                    return (
                      <img
                        key={assigneeId}
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-6 h-6 rounded-md border-2 border-[#1A1A1A]"
                        title={user?.name}
                      />
                    );
                  })}
                  {task.assignees.length > 3 && (
                    <div className="w-6 h-6 rounded-md bg-[#2A2A2A] border-2 border-[#1A1A1A] flex items-center justify-center text-xs text-gray-400">
                      +{task.assignees.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtasks */}
      {hasSubtasks && isExpanded && (
        <div className="mt-2 space-y-2">
          {task.subtasks.map((subtask) => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
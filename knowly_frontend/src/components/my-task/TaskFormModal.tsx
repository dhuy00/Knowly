import { useState } from "react";
import { X, Calendar, Clock, Users, Tag, Flag } from "lucide-react";
import type { Task } from "../../types/task";
import { mockUsers, mockProjects } from "../../mock/mockData";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<Task>) => void;
  initialTask?: Task;
  projectId?: string;
  parentTask?: Task;
}

export function TaskFormModal({ isOpen, onClose, onSubmit, initialTask, projectId, parentTask }: TaskFormModalProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    name: initialTask?.name || "",
    description: initialTask?.description || "",
    type: initialTask?.type || "task",
    priority: initialTask?.priority || "medium",
    status: initialTask?.status || "todo",
    estimateTime: initialTask?.estimateTime || 0,
    assignees: initialTask?.assignees || [],
    labels: initialTask?.labels || [],
    dueDate: initialTask?.dueDate,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleAssigneeToggle = (userId: string) => {
    const assignees = formData.assignees || [];
    if (assignees.includes(userId)) {
      setFormData({ ...formData, assignees: assignees.filter(id => id !== userId) });
    } else {
      setFormData({ ...formData, assignees: [...assignees, userId] });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A]/50 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A2A2A]/50 flex items-center justify-between">
          <div>
            <h2 className="text-xl text-white">
              {initialTask ? "Edit Task" : parentTask ? "Add Subtask" : "Create New Task"}
            </h2>
            {parentTask && (
              <p className="text-sm text-gray-500 mt-1">
                Subtask of: {parentTask.identifier} - {parentTask.name}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2A2A2A] rounded-xl transition text-gray-400 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Task Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Task Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter task name..."
              className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add a description..."
              rows={4}
              className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 transition resize-none"
            />
          </div>

          {/* Type, Priority, Status */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-white outline-none focus:border-emerald-500/50 transition"
              >
                <option value="task">Task</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="epic">Epic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-white outline-none focus:border-emerald-500/50 transition"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-white outline-none focus:border-emerald-500/50 transition"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="in-review">In Review</option>
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Estimate Time and Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                <Clock className="size-4 inline mr-1.5" />
                Estimate (hours)
              </label>
              <input
                type="number"
                value={formData.estimateTime}
                onChange={(e) => setFormData({ ...formData, estimateTime: parseFloat(e.target.value) || 0 })}
                placeholder="0"
                min="0"
                step="0.5"
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                <Calendar className="size-4 inline mr-1.5" />
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value ? new Date(e.target.value) : undefined })}
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-white outline-none focus:border-emerald-500/50 transition"
              />
            </div>
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              <Users className="size-4 inline mr-1.5" />
              Assignees
            </label>
            <div className="grid grid-cols-2 gap-2">
              {mockUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleAssigneeToggle(user.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                    formData.assignees?.includes(user.id)
                      ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                      : "bg-[#0F0F0F] border-[#2A2A2A]/50 text-gray-400 hover:border-emerald-500/30"
                  }`}
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-md" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm truncate">{user.name}</p>
                    <p className="text-xs opacity-70 truncate">{user.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              <Tag className="size-4 inline mr-1.5" />
              Labels (comma-separated)
            </label>
            <input
              type="text"
              value={formData.labels?.join(", ")}
              onChange={(e) => setFormData({ ...formData, labels: e.target.value.split(",").map(l => l.trim()).filter(Boolean) })}
              placeholder="frontend, urgent, sprint-1"
              className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 transition"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A2A2A]/50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg text-gray-400 hover:text-white hover:border-emerald-500/30 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
          >
            {initialTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
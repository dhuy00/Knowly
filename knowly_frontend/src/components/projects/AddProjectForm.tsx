import { useState } from "react";
import { X, Calendar, Clock, Users, Tag, Flag } from "lucide-react";
import type { Task } from "../../types/task";
import { mockUsers, mockProjects } from "../../mock/mockData";
import CustomSelect from "../my-task/CustomSelect";
import ReactMarkdown from "react-markdown";
import AssigneeSelection from "../common/AssigneeSelection";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<Task>) => void;
  initialTask?: Task;
  projectId?: string;
  parentTask?: Task;
}

export function AddProjectForm({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
  projectId,
  parentTask,
}: TaskFormModalProps) {
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

  const [activeTab, setActiveTab] = useState("write");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleAssigneeToggle = (userId: string) => {
    const assignees = formData.assignees || [];
    if (assignees.includes(userId)) {
      setFormData({
        ...formData,
        assignees: assignees.filter((id) => id !== userId),
      });
    } else {
      setFormData({ ...formData, assignees: [...assignees, userId] });
    }
  };

  const mockStatus = ["all", "backlog", "todo", "in-progress", "in-review"];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-[#1A1A1A] border border-[#2A2A2A]/50 
      rounded-md shadow-2xl w-[1200px] max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-2 border-b border-[#2A2A2A]/50 flex items-center justify-between">
          <div>
            <h2 className="text-md text-white">
              {initialTask
                ? "Edit Task"
                : parentTask
                  ? "Add Subtask"
                  : "Create New Project"}
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
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-2 space-y-5"
        >
          {/* Task Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Project Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter task name..."
              className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 
              rounded-lg text-white placeholder-gray-600 outline-none 
              focus:border-emerald-500/50 transition text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            {/* Tab Header */}
            <div className="flex items-center gap-0 mb-2 border-b border-[#2A2A2A]/50">
              <button
              type="button"
                onClick={() => setActiveTab("write")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors relative
            ${
              activeTab === "write"
                ? "text-white after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-emerald-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors relative
            ${
              activeTab === "preview"
                ? "text-white after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-emerald-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
              >
                Preview
              </button>
            </div>

            {/* Write Tab */}
            {activeTab === "write" && (
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add a description... (supports **markdown**)"
                rows={6}
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 
            rounded-lg text-white placeholder-gray-600 outline-none 
            focus:border-emerald-500/50 transition resize-none text-sm"
              />
            )}

            {/* Preview Tab */}
            {activeTab === "preview" && (
              <div
                className="w-full min-h-[152px] px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 
            rounded-lg text-sm text-gray-200 overflow-auto
            prose prose-invert prose-sm max-w-none
            prose-headings:text-white prose-headings:font-semibold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-strong:text-white prose-em:text-gray-300
            prose-code:text-emerald-400 prose-code:bg-[#1A1A1A] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#1A1A1A] prose-pre:border prose-pre:border-[#2A2A2A]
            prose-blockquote:border-l-emerald-500 prose-blockquote:text-gray-400
            prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-hr:border-[#2A2A2A]"
              >
                {formData.description?.trim() ? (
                  <ReactMarkdown>{formData.description}</ReactMarkdown>
                ) : (
                  <p className="text-gray-600 italic">Nothing to preview.</p>
                )}
              </div>
            )}
          </div>

          {/* Type, Priority, Status */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Type</label>
              <CustomSelect defaultValue="All status" list={mockStatus} />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Priority
              </label>
              <CustomSelect defaultValue="All status" list={mockStatus} />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Status</label>
              <CustomSelect defaultValue="All status" list={mockStatus} />
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimateTime: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                min="0"
                step="0.5"
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg
                 text-white placeholder-gray-600 outline-none focus:border-emerald-500/50 
                 transition text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                <Calendar className="size-4 inline mr-1.5 text-white" />
                Due Date
              </label>
              <input
                type="date"
                value={
                  formData.dueDate
                    ? new Date(formData.dueDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dueDate: e.target.value
                      ? new Date(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg
                 text-white outline-none focus:border-emerald-500/50 transition text-sm custom-date"
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* Assignees */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                <Users className="size-4 inline mr-1.5" />
                Assignees
              </label>
              <AssigneeSelection />
            </div>

            {/* Owner */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                <Users className="size-4 inline mr-1.5" />
                Owner
              </label>
              <AssigneeSelection />
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
              onChange={(e) =>
                setFormData({
                  ...formData,
                  labels: e.target.value
                    .split(",")
                    .map((l) => l.trim())
                    .filter(Boolean),
                })
              }
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
            className="px-4 py-3 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-lg 
            text-gray-400 hover:text-white hover:border-emerald-500/30 transition text-sm leading-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white 
            rounded-lg transition text-sm leading-none"
          >
            {initialTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { X, Calendar, Clock, Users, Tag, Flag } from "lucide-react";
import type { Task } from "../../types/task";
import ReactMarkdown from "react-markdown";
import AssigneeSelection from "../common/AssigneeSelection";
import CustomSelect from "../my-task/CustomSelect";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<Task>) => void;
  initialTask?: Task;
  projectId?: string;
  parentTask?: Task;
}

export function SettingForm({
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

  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      name: "Profile",
    },
    {
      id: 2,
      name: "Password",
    },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleSwitchTab = (id) => {
    setActiveTab(id)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-[#1A1A1A] border border-[#2A2A2A]/50 rounded-md shadow-2xl 
        w-[600px] max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-2 border-b border-[#2A2A2A]/50 flex items-center justify-between">
          <div>
            <h2 className="text-md text-white">Edit Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2A2A2A] rounded-xl transition text-gray-400 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex gap-2 px-6 text-sm py-4">
          {tabs.map((tab) => (
            <span
              className={` ${ activeTab == tab.id ? ' border-b-3 border-emerald-500 text-emerald-500' 
                : 'text-gray-400'} 
              py-1 px-4 `}
              onClick={() => handleSwitchTab(tab.id)}
            >
              {tab.name}
            </span>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-2 space-y-4"
        >
          {/* Avatar */}
          <div className="w-full h-[100px] bg-indigo-800 relative">
            <div
              className="w-[100px] h-[100px] bg-yellow-500 rounded-full absolute bottom-0 
            translate-y-1/2 left-1/2 -translate-x-1/2"
            ></div>
          </div>

          {/* Username */}
          <div className="mt-16">
            <label className="block text-sm text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter username..."
              className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 
              rounded-lg text-white placeholder-gray-600 outline-none 
              focus:border-emerald-500/50 transition text-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter email..."
              className="w-full px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 
              rounded-lg text-white placeholder-gray-600 outline-none 
              focus:border-emerald-500/50 transition text-sm"
              required
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2A2A2A]/50 flex items-center justify-center gap-3">
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

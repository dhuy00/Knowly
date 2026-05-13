import React from "react";
import { mockTasks } from "../../mock/mockData";
import { Plus } from "lucide-react";
import TaskSelect from "./TaskSelect";

const Manual = () => {
  const mockTask = ["all", "backlog", "todo", "in-progress", "in-review"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Start Time</label>
          <input
            type="datetime-local"
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-white px-4 
            py-2.5 outline-none focus:border-emerald-500 transition rounded-sm text-sm custom-date"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">End Time</label>
          <input
            type="datetime-local"
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-white px-4 
            py-2.5 outline-none focus:border-emerald-500 transition rounded-sm text-sm custom-date"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Task</label>
        <TaskSelect list={mockTask} defaultValue="Select a task" />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Description</label>
        <textarea
          rows={3}
          placeholder="Describe what you worked on..."
          className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-white px-4 py-2.5 
          placeholder-gray-600 outline-none focus:border-emerald-500 transition resize-none rounded-sm"
        />
      </div>

      <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600
       hover:bg-emerald-700 text-white transition rounded-md text-sm font-semibold">
        <Plus className="size-5" />
        Add Time Entry
      </button>
    </div>
  );
};

export default Manual;

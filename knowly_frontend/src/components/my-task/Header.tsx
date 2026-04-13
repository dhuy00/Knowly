import { useState } from "react";
import { Link } from "react-router";
import {
  Plus,
} from "lucide-react";
import {
  mockTasks,
  currentUser,
} from "../../mock/mockData";
import type { Task } from "../../types/task";
import { FaTasks } from "react-icons/fa";

const Header = () => {
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const myTasks = mockTasks.filter((t) => t.assignees.includes(currentUser.id));

  const filteredTasks = myTasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.identifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });


  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-emerald-400">
          <FaTasks/>
          <h1 className="text-2xl text-emerald-400 text-[20px] font-semibold">My Tasks</h1>
        </div>
        <p className="text-gray-500 text-sm">
          {filteredTasks.length} tasks assigned to you
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-[#2A2A2A] rounded-sm overflow-hidden">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 text-sm transition ${
              viewMode === "list"
                ? "bg-[#2A2A2A] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode("board")}
            className={`px-4 py-2 text-sm transition ${
              viewMode === "board"
                ? "bg-[#2A2A2A] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Board
          </button>
        </div>
        <button
          onClick={() => {
            setEditingTask(undefined);
            setIsTaskFormOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-[8px] bg-emerald-600 hover:bg-emerald-700
           text-white rounded-sm transition text-sm font-medium"
        >
          <Plus className="size-4" />
          New Task
        </button>
      </div>
    </div>
  );
};

export default Header;

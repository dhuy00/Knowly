import { useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { mockTasks, currentUser } from "../../mock/mockData";
import { FaTasks } from "react-icons/fa";
import type { Task } from "../../types/task";
import { Filter, Search } from "lucide-react";

type HeaderProp = {
  setIsTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEdittingTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({
  setIsTaskFormOpen,
  setEdittingTask,
  viewMode,
  setViewMode,
}: HeaderProp) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="flex items-center gap-2 text-emerald-400">
          <FaTasks />
          <h1 className="text-2xl text-emerald-400 text-[20px] font-semibold">
            My Tasks
          </h1>
        </div>
        <p className="text-gray-500 text-sm">
          {filteredTasks.length} tasks assigned to you
        </p>
      </div>
      <div className="relative flex items-center gap-4">
        <div>
          <Search className="absolute left-3 top-[12px] size-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 h-10 bg-[#0F0F0F] border border-emerald-500/20
            rounded-md text-white placeholder-gray-600 outline-none 
            focus:border-emerald-500/50 transition text-sm w-[900px]"
          />
        </div>
        <button className="p-2.5 text-gray-400 hover:text-white hover:bg-[#2A2A2A] 
        rounded-lg transition cursor-pointer">
            <Filter className="size-4" />
          </button>
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
            setEdittingTask(undefined);
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

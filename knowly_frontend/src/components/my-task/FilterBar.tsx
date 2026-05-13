import { useState } from "react";
import { Filter, Search } from "lucide-react";
import CustomSelect from "./CustomSelect";

const FilterBar = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const mockStatus = [
    "all",
    "backlog",
    "todo",
    "in-progress",
    "in-review"
  ]

  const mockPriority = [
    "All Priority",
    "Urgent",
    "High",
    "Medium",
    "Low",
  ]

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A]/50 rounded-md p-4 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-[12px] size-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 h-10 bg-[#0F0F0F] border border-[#2A2A2A]/50 
            rounded-md text-white placeholder-gray-600 outline-none 
            focus:border-emerald-500/50 transition text-sm"
          />
        </div>
        <CustomSelect defaultValue="All status" list={mockStatus}/>
        <CustomSelect defaultValue="All priority" list={mockPriority}/>
        <button className="flex items-center text-xs justify-center gap-2 px-4 h-10
        bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-md text-gray-400 
        hover:text-white hover:border-emerald-500/30 transition">
          <Filter className="size-4" />
          More Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;

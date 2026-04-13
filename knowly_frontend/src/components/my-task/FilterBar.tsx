import { useState } from "react";
import { Filter, Search } from "lucide-react";
import CustomSelect from "./CustomSelect";

const FilterBar = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A]/50 rounded-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-[13px] size-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 
            rounded-md text-white placeholder-gray-600 outline-none 
            focus:border-emerald-500/50 transition text-sm"
          />
        </div>
        <CustomSelect/>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-xl text-white outline-none focus:border-emerald-500/50 transition"
        >
          <option value="all">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-xl text-gray-400 hover:text-white hover:border-emerald-500/30 transition">
          <Filter className="size-4" />
          More Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;

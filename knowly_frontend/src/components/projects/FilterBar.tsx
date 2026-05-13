import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Grid3x3,
  List,
} from "lucide-react";
import StatusSelect from "../../components/projects/StatusSelect";

const FilterBar = ({viewMode, setViewMode}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const statuses = ["All status", "New", "In progress", "Done"];
  return (
    <div className="">
      <div className="relative flex items-center justify-between gap-4">
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
        <div className="flex items-center gap-4">
          <StatusSelect list={statuses} defaultValue={statuses[0]} />
          <div className="flex items-center border border-[#2A2A2A] rounded-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition ${
                viewMode === "grid"
                  ? "bg-[#2A2A2A] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid3x3 className="size-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition ${
                viewMode === "list"
                  ? "bg-[#2A2A2A] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

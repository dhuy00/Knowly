import React from "react";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-emerald-400 text-[20px] font-semibold">Projects</h1>
        <p className="text-gray-500 text-sm">
          Manage all your projects in one place
        </p>
      </div>
      <button
        className="flex items-center gap-1.5 px-3.5 py-[8px] bg-emerald-600 hover:bg-emerald-700
           text-white rounded-sm transition text-sm font-medium"
      >
        <Plus className="size-4" />
        New Project
      </button>
    </div>
  );
};

export default Header;

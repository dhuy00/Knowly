import React from "react";
import type { AddNodeFunction } from "../../hooks/useNode";
import { IoLogoWebComponent } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

interface DiagramToolbarProp {
  addNode: AddNodeFunction;
}

const DiagramToolbar: React.FC<DiagramToolbarProp> = ({ addNode }) => {
  const handleAddNode = (type: string) => {
    addNode(type);
  };

  return (
    <div className="shadow-sm w-60 rounded-md flex flex-col overflow-hidden bg-background-primary px-3">
      <div className="w-full text-sm font-semibold py-2 flex items-center gap-2">
        <span className="bg-indigo-600 text-white p-1 rounded-sm">
          <IoLogoWebComponent className="text-xl" />
        </span>
        <div className="flex flex-col">
          <span className="leading-none">components</span>
          <span className="leading-none text-small text-gray-500">diagram</span>
        </div>
      </div>
      {/* Search bar */}
      <div className="flex bg-[#F6F6F6] gap-2 justify-center items-center px-2 py-1 rounded-sm"> 
        <IoSearchOutline className="text-xl"/>
        <input type="text" className="w-full focus:outline-none" placeholder="Search"/>
      </div>
    </div>
  );
};

export default DiagramToolbar;

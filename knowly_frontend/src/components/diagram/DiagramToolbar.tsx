import React from "react";
import type { AddNodeFunction } from "../../hooks/useNode";
import { IoLogoWebComponent } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineTableChart } from "react-icons/md";
import { RiStackLine } from "react-icons/ri";
import Divider from "../common/Divider";
import EdgeType from "../../assets/icons/EdgeType";
import { IoIosArrowDown } from "react-icons/io";

interface DiagramToolbarProp {
  addNode: AddNodeFunction;
}

const DiagramToolbar: React.FC<DiagramToolbarProp> = ({ addNode }) => {
  const handleAddNode = (type: string) => {
    addNode(type);
  };

  return (
    <div className="shadow-sm gap-2 w-62 rounded-md flex flex-col overflow-hidden bg-background-primary px-3">
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
      <div className="flex bg-[#F6F6F6] gap-2 justify-center items-center px-2 py-1 rounded-sm border border-gray-300">
        <IoSearchOutline className="text-xl" />
        <input
          type="text"
          className="w-full focus:outline-none placeholder:text-small placeholder:font-semibold text-small text-text-secondary
        font-semibold"
          placeholder="Search"
        />
      </div>

      <div className="flex items-center gap-2 py-1 px-2 hover:bg-stone-100 rounded-sm cursor-pointer">
        <MdOutlineTableChart className="text-lg text-gray-600" />
        <span className="text-common font-medium text-black">Table</span>
      </div>

      <div className="flex items-center gap-2 py-1 px-2 hover:bg-stone-100 rounded-sm cursor-pointer">
        <RiStackLine className="text-lg text-gray-600" />
        <span className="text-common font-medium text-black">Node</span>
      </div>
      <Divider />
      <span className="text-small text-text-secondary font-medium">
        Configuaration
      </span>
      <div className="flex">
        <div className="border flex gap-2 justify-between border-stone-400 pl-2 pr-1 py-1
        rounded-xs cursor-pointer">
          <EdgeType size={15}/>
          <IoIosArrowDown className="text-xs"/>
        </div>
      </div>
    </div>
  );
};

export default DiagramToolbar;

import React from "react";
import { FaHashnode } from "react-icons/fa6";

const DiagramToolbar = () => {
  return (
    <div className="w-[250px] border border-indigo-400 rounded-lg flex flex-col overflow-hidden">
      <span className="text-center bg-indigo-100 w-full text-sm font-semibold py-1 text-indigo-500">
        Components
      </span>
      <div className="p-4">
        <div className="border w-fit py-1.5 px-1.5 rounded-sm text-indigo-500 hover:bg-indigo-100 cursor-pointer">
          <FaHashnode />
        </div>
      </div>
    </div>
  );
};

export default DiagramToolbar;

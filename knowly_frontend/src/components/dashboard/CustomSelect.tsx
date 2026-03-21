import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const CustomSelect = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  return (
    <div className="relative">
      <div
        className={`bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-gray-400 text-sm
       px-4 py-2 outline-none focus:border-emerald-500/50 transition text-xs flex justify-between items-center
       gap-6 relative`}
       onClick={handleDropdown}
      >
        <span>Last 7 days</span>
        <IoChevronDownOutline className={`text-[15px] transition ${isOpenDropdown ? 'rotate-180' : ''}`} />
      </div>
      <ul
        className={`bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-gray-400 text-sm
       transition text-xs flex flex-col absolute top-9 left-0 right-0 ${isOpenDropdown ? '' : 'hidden'}`}
      >
        <li className="hover:bg-gray-950 bg-[#0F0F0F] px-4 z-10 py-2 rounded-t-lg transition">
          Last 30 days
        </li>
        <li className="hover:bg-gray-950 bg-[#0F0F0F] z-10 px-4 py-2 rounded-b-lg transition">
          Last 90 days
        </li>
      </ul>
    </div>
  );
};

export default CustomSelect;

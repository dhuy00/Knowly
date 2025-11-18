import React, { useState } from "react";
import type { ReactNode } from "react";
import { AiOutlineUnorderedList, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineSetting } from "react-icons/ai";
import { navigations } from "../constant/sidebar";
import { subNavigations } from "../constant/sidebar";
import { MdNavigateNext } from "react-icons/md";


export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
}
interface SidebarProps {
  onSelect: (id: string | number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [active, setActive] = useState<string | number>("all");

  const handleClick = (id: string | number) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <div className="w-64 h-screen flex flex-col justify-between p-4 bg-white">
      <div className="">
        <h1 className="text-2xl font-bold mb-6">Todo App</h1>
        <nav className="flex flex-col gap-2 border-b border-border-primary pb-4">
          {navigations.map((item) => (
            <button
              key={item.id}
              className={`font-medium flex items-center gap-2 py-2 px-4 rounded-md 
              hover:bg-sidebar-item-background active:text-text-primary-hover 
              active:bg-sidebar-item-active-background transition-colors ${active === item.id
                  ? "bg-sidebar-item-background text-text-primary-hover"
                  : "text-text-secondary "
                }`}
              onClick={() => handleClick(item.id)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <nav className="flex flex-col gap-2 pt-4">
          {subNavigations.map((item) => (
            <button
              key={item.id}
              className={`font-medium flex items-center gap-2 py-2 px-4 rounded-md 
                hover:bg-sidebar-item-background transition-colors ${active === item.id 
                  ? "bg-sidebar-item-background text-text-primary-hover" 
                  : "text-text-secondary "
                }`}
              onClick={() => handleClick(item.id)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex justify-between border-t border-border-primary pt-4 items-center">
        <div className="flex gap-1">
          <span className="w-10 h-10 rounded-full bg-background-primary"></span>
          <div className="flex flex-col font-medium">
            <span className="text-[12px] text-text-secondary">Welcome back</span>
            <span className="text-sm text-text-primary">Duck Huy</span>
          </div>
        </div>
        <span className="text-md">
          <MdNavigateNext />
        </span>
      </div>
    </div>
  );
};

export default Sidebar;

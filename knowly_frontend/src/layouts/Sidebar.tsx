import React, { useState } from "react";
import type { ReactNode } from "react";
import { AiOutlineUnorderedList, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineSetting } from "react-icons/ai";
import navigations from "../constant/sidebar";


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
    <div className="w-64 h-screen text-text-primary-hover flex flex-col justify p-4">
      <h1 className="text-2xl font-bold mb-6">Todo App</h1>
      <nav className="flex flex-col gap-2">
        {navigations.map((item) => (
          <button
            key={item.id}
            className={`text-text-primary font-medium flex items-center gap-2 py-2 px-4 rounded-md hover:bg-sidebar-item-background transition-colors ${
              active === item.id ? "bg-sidebar-item-background text-text-primary-hover" : ""
            }`}
            onClick={() => handleClick(item.id)}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      <div className="flex justify-between">
        <div className="flex">
          <span className="w-10 h-10 rounded-full bg-background-primary"></span>
          <div className="flex flex-col">
            <span>Welcome back</span>
            <span>Duck Huy</span>
          </div>
        </div>
        <span>icon</span>
      </div>
    </div>
  );
};

export default Sidebar;

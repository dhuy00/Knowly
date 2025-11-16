import React, { useState } from "react";
import type { ReactNode } from "react";
import { AiOutlineUnorderedList, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineSetting } from "react-icons/ai";

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

const navItems: NavItem[] = [
  { id: "all", label: "All Todos", icon: <AiOutlineUnorderedList /> },
  { id: "completed", label: "Completed", icon: <AiOutlineCheckCircle /> },
  { id: "pending", label: "Pending", icon: <AiOutlineClockCircle /> },
  { id: "settings", label: "Settings", icon: <AiOutlineSetting /> },
];

interface SidebarProps {
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [active, setActive] = useState("all");

  const handleClick = (id: string) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Todo App</h1>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors ${
              active === item.id ? "bg-gray-700 font-semibold" : ""
            }`}
            onClick={() => handleClick(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

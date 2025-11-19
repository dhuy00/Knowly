import React, { useState } from "react";
import { navigations } from "../constant/sidebar";
import { subNavigations } from "../constant/sidebar";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { NavItem } from "../types/Sidebar";

const Sidebar = () => {
  const [active, setActive] = useState<string | number>(1);
  const sidebarItemStyle = `font-medium flex items-center gap-2 py-2 px-4 rounded-md 
                            hover:bg-sidebar-item-background active:text-text-primary-hover 
                            active:bg-sidebar-item-active-background transition-colors`
  const navigate = useNavigate();

  const handleClick = (item: NavItem) => {
    setActive(item.id);
    navigate(`${item.path}`)
  };

  return (
    <div className="w-64 h-full flex flex-col justify-between bg-white text-common rounded-xl shadow-sm">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Todo App</h1>
        <nav className="flex flex-col gap-2 border-b border-border-primary pb-4">
          {navigations.map((item) => (
            <button
              key={item.id}
              className={`${sidebarItemStyle} ${active == item.id
                ? "bg-sidebar-item-background text-text-primary-hover"
                : "text-text-secondary "
                }`}
              onClick={() => handleClick(item)}
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
              className={`${sidebarItemStyle} ${active === item.id
                  ? "bg-sidebar-item-background text-text-primary-hover"
                  : "text-text-secondary "
                }`}
              onClick={() => handleClick(item)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex justify-between border-t border-border-primary pt-4 p-4 
      items-center hover:bg-background-secondary">
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

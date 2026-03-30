import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Clock,
  BarChart3,
  CheckSquare,
  Search,
  Bell,
  Settings,
  Command,
  Zap,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { currentUser } from "../../mock/mockNav";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // useEffect(() => {
  //   const isAuth = localStorage.getItem("isAuthenticated");
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/my-task", icon: CheckSquare, label: "My Task" },
    { path: "/projects", icon: FolderKanban, label: "Projects" },
    { path: "/time-tracking", icon: Clock, label: "Time Tracking" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  return (
    <>
      <header className="h-16 border border-primary/10 bg-background-secondary flex items-center 
      px-6 sticky top-0 z-40 rounded-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mr-8">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary rounded-lg flex items-center justify-center">
            <Zap className="size-5 text-white" />
          </div>
          <span className="text-white font-semibold text-sm">TaskFlow</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition ${
                isActive(item.path)
                  ? "text-white bg-primary/10 border border-primary/30"
                  : "text-gray-400 hover:text-white hover:bg-[#252525]"
              }`}
            >
              <item.icon
                className={`size-4 ${isActive(item.path) ? "text-primary" : ""}`}
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-3 px-4 py-2 bg-[#0F0F0F] border border-[#2A2A2A]/50 rounded-md text-gray-400 hover:text-white hover:border-primary/30 text-sm transition"
          >
            <Search className="size-4" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden lg:flex items-center gap-1 px-2 py-1 bg-[#2A2A2A] text-xs border border-[#3A3A3A] rounded-md">
              <Command className="size-3" />K
            </kbd>
          </button>

          <button className="p-2.5 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-md transition relative">
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          <button className="p-2.5 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition">
            <Settings className="size-5" />
          </button>

          <div className="h-6 w-px bg-[#2A2A2A]"></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-[#2A2A2A] rounded-md transition"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg"
              />
              <div className="hidden lg:block text-left">
                <p className="text-sm text-white leading-none">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500 leading-none mt-1">
                  {currentUser.role}
                </p>
              </div>
              <ChevronDown className="size-4 text-gray-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1A1A1A] border border-[#2A2A2A]/50 rounded-md shadow-2xl overflow-hidden">
                <div className="p-3 border-b border-[#2A2A2A]/50">
                  <p className="text-sm text-white">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-md transition text-sm">
                    <Settings className="size-4" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-[#2A2A2A] rounded-md transition text-sm"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;

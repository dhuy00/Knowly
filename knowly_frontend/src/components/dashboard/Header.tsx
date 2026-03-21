import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Activity,
} from "lucide-react";
import { currentUser, mockTasks, mockTimeEntries } from "../../mock/mockNav";

const Header = () => {
  const myTasks = mockTasks.filter((t) => t.assignees.includes(currentUser.id));
  const tasksDone = myTasks.filter((t) => t.status === "done").length;
  const tasksInProgress = myTasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const tasksOverdue = myTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done",
  ).length;

  const todayEntries = mockTimeEntries.filter((e) => {
    const entryDate = new Date(e.startTime);
    const today = new Date();
    return entryDate.toDateString() === today.toDateString();
  });

  const todayHours =
    todayEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;

  const stats = [
    {
      label: "Hours Today",
      value: todayHours.toFixed(1),
      change: "+12%",
      trend: "up",
      icon: Clock,
      color: "emerald",
    },
    {
      label: "Active Tasks",
      value: tasksInProgress,
      change: "+3",
      trend: "up",
      icon: Activity,
      color: "emerald",
    },
    {
      label: "Completed",
      value: tasksDone,
      change: "+8",
      trend: "up",
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      label: "Overdue",
      value: tasksOverdue,
      change: "-2",
      trend: "down",
      icon: AlertCircle,
      color: "red",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-[#1A1A1A]
     to-[#1A1A1A] border border-emerald-500/20 rounded-2xl py-6 px-8">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="size-4 text-emerald-400" />
            <p className="text-emerald-400 text-[12px] font-medium uppercase tracking-wider">
              Command Center
            </p>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {getGreeting()}, {currentUser.name.split(" ")[0]}
          </h1>
          <p className="text-gray-400 text-[14px]">
            You're crushing it today with {tasksDone} completed tasks and{" "}
            {todayHours.toFixed(1)} hours tracked
          </p>
        </div>

        {/* Compact Stats Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, index) => {
            return (
              <div
                key={index}
                className="bg-[#0F0F0F]/60 backdrop-blur border border-[#2A2A2A] rounded-xl 
                p-3 min-w-[120px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg ${
                      stat.color === "emerald"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    } flex items-center justify-center`}
                  >
                    <stat.icon className="size-4" />
                  </div>
                  <div
                    className={`flex items-center gap-0.5 text-xs ${
                      stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="size-3" />
                    ) : (
                      <TrendingDown className="size-3" />
                    )}
                    <span className="font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className="text-xl font-bold text-white mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[12px] text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;

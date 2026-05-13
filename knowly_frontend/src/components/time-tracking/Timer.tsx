import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Square,
  Tag,
  Filter,
  Plus,
} from "lucide-react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { mockTimeEntries, mockTasks, mockProjects } from "../../mock/mockData";
import TimerTab from "./TimerTab";
import ClockTimer from "./ClockTimer";
import Manual from "./Manual";
import History from "./History";
import TimeByProject from "./TimeByProject";

const TimerTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  const [selectedTask, setSelectedTask] = useState("");
  const [description, setDescription] = useState("");
  const [isBillable, setIsBillable] = useState(true);
  const [activeTab, setActiveTab] = useState<"timer" | "manual" | "history">(
    "timer",
  );



  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };


  // Project breakdown
  const projectBreakdown = mockProjects
    .map((p) => {
      const projectEntries = mockTimeEntries.filter(
        (e) => e.projectId === p.id,
      );
      const hours =
        projectEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;
      return { name: p.identifier, hours, color: p.color };
    })
    .filter((p) => p.hours > 0);

  const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Time Tracker */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-sm">
        <TimerTab activeTab={activeTab} setActiveTab={setActiveTab}/>

        <div className="p-6">
          {activeTab === "timer" && (
            <ClockTimer/>
          )}

          {activeTab === "manual" && (
            <Manual/>
          )}

          {activeTab === "history" && (
            <History/>
          )}
        </div>
      </div>

      {/* Project Breakdown */}
      <TimeByProject/>
    </div>
  );
};

export default TimerTracking;

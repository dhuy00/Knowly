import { useState, useEffect } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { mockTimeEntries, mockProjects } from "../../mock/mockData";

const TimeByProject = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);



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
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 rounded-sm">
      <h2 className="text-lg text-white mb-6">Time by Project</h2>
      <div className="grid grid-cols-2 gap-6">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={projectBreakdown}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="hours"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {projectBreakdown.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2A2A2A",
                borderRadius: "0",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center space-y-3">
          {projectBreakdown.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-400">{item.name}</span>
              </div>
              <span className="text-sm text-white">
                {item.hours.toFixed(1)}h
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeByProject;

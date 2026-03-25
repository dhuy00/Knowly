import React from "react";
import { BarChart3 } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  mockTimeEntries,
} from "../../mock/mockData";
import CustomSelect from "./CustomSelect";

const Weekly = () => {
    const weekEntries = mockTimeEntries.filter((e) => {
      const entryDate = new Date(e.startTime);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });
    const weekHours = weekEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;
  
    // Weekly activity data
    const weeklyData = [
      { day: "Mon", hours: 7.5, tasks: 3 },
      { day: "Tue", hours: 8.2, tasks: 5 },
      { day: "Wed", hours: 6.8, tasks: 4 },
      { day: "Thu", hours: 9.1, tasks: 6 },
      { day: "Fri", hours: 7.3, tasks: 4 },
      { day: "Sat", hours: 2.5, tasks: 1 },
      { day: "Sun", hours: 1.2, tasks: 1 },
    ];
  

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 h-[366px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="size-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">
              Weekly Performance
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            <span className="text-emerald-400 font-medium">
              {weekHours.toFixed(1)} hours
            </span>{" "}
            tracked across {weeklyData.reduce((sum, d) => sum + d.tasks, 0)}{" "}
            tasks
          </p>
        </div>
        <CustomSelect/>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250} >
          <AreaChart data={weeklyData} >
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              
              contentStyle={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #2A2A2A",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorHours)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Weekly;

import React from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  mockProjects,
} from "../../mock/mockData";

const ProjectProgress = () => {
  // Project progress data
  const projectData = mockProjects.slice(0, 5).map((p) => ({
    name: p.identifier,
    planned: p.estimateTime,
    actual: p.spentTime,
    efficiency: Math.round((p.spentTime / p.estimateTime) * 100),
  }));

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            Project Time Utilization
          </h2>
          <p className="text-sm text-gray-500">Planned vs actual time spent</p>
        </div>
        <Link
          to="/projects"
          className="text-sm text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-medium"
        >
          View all
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={projectData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #2A2A2A",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
          <Bar
            dataKey="planned"
            fill="#4A5568"
            name="Planned"
            radius={[8, 8, 0, 0]}
            barSize={80}
          />
          <Bar
            dataKey="actual"
            fill="#10b981"
            name="Actual"
            radius={[8, 8, 0, 0]}
            barSize={80}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectProgress;

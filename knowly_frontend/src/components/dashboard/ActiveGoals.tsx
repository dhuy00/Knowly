import { Link } from "react-router";
import { Flame, ArrowUpRight } from "lucide-react";
import {
  mockGoals,
} from "../../mock/mockData";


const ActiveGoals = () => {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="size-5 text-orange-400" />
        <h2 className="text-lg font-semibold text-white">Active Goals</h2>
      </div>
      <div className="space-y-4">
        {mockGoals.slice(0, 3).map((goal) => {
          const progress = (goal.currentHours / goal.targetHours) * 100;
          return (
            <div key={goal.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm text-white mb-1 font-medium">
                    {goal.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {goal.currentHours.toLocaleString()} /{" "}
                    {goal.targetHours.toLocaleString()}h
                  </p>
                </div>
                <span className="text-sm font-semibold text-emerald-400">
                  {progress.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Link
        to="/time-tracking"
        className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2A2A2A] text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 transition text-sm font-medium"
      >
        View all goals
        <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
};

export default ActiveGoals;

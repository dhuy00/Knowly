import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  Target,
} from "lucide-react";
import { mockTimeEntries } from "../../mock/mockData";

const Stats = () => {
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

  // Calculate statistics
  const todayEntries = mockTimeEntries.filter((e) => {
    const entryDate = new Date(e.startTime);
    const today = new Date();
    return entryDate.toDateString() === today.toDateString();
  });
  const todayHours =
    todayEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;

  const weekEntries = mockTimeEntries.filter((e) => {
    const entryDate = new Date(e.startTime);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  });
  const weekHours = weekEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;

  const billableHours =
    mockTimeEntries
      .filter((e) => e.billable)
      .reduce((sum, e) => sum + e.duration, 0) / 3600;


  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-5 rounded-sm">
        <div className="flex items-center justify-between mb-3">
          <Clock className="size-5 text-blue-400" />
          <TrendingUp className="size-4 text-green-400" />
        </div>
        <div className="text-2xl text-white mb-1">{todayHours.toFixed(1)}h</div>
        <div className="text-sm text-gray-500">Today</div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-5 rounded-sm">
        <div className="flex items-center justify-between mb-3">
          <Calendar className="size-5 text-purple-400" />
          <span className="text-xs text-green-400">+8%</span>
        </div>
        <div className="text-2xl text-white mb-1">{weekHours.toFixed(1)}h</div>
        <div className="text-sm text-gray-500">This Week</div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-5 rounded-sm">
        <div className="flex items-center justify-between mb-3">
          <DollarSign className="size-5 text-green-400" />
          <span className="text-xs text-green-400">+12%</span>
        </div>
        <div className="text-2xl text-white mb-1">
          {billableHours.toFixed(1)}h
        </div>
        <div className="text-sm text-gray-500">Billable</div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-5 rounded-sm">
        <div className="flex items-center justify-between mb-3">
          <Target className="size-5 text-orange-400" />
          <span className="text-xs text-gray-400">67%</span>
        </div>
        <div className="text-2xl text-white mb-1">32.4h</div>
        <div className="text-sm text-gray-500">Weekly Goal</div>
      </div>
    </div>
  );
};

export default Stats;

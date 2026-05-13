import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { mockTimeEntries, mockTasks, mockProjects } from "../../mock/mockData";

const History = () => {
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

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white">Recent Entries</h3>
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
          <Filter className="size-4" />
          Filter
        </button>
      </div>
      {mockTimeEntries.slice(0, 10).map((entry) => {
        const task = mockTasks.find((t) => t.id === entry.taskId);
        const project = mockProjects.find((p) => p.id === entry.projectId);
        return (
          <div
            key={entry.id}
            className="flex items-center justify-between p-4 bg-[#0F0F0F] border 
            border-[#2A2A2A] hover:border-emerald-500/50 transition rounded-sm"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-white">{entry.description}</span>
                {entry.billable && (
                  <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-xs">
                    Billable
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{project?.identifier}</span>
                <span>•</span>
                <span>{task?.identifier}</span>
                <span>•</span>
                <span>{new Date(entry.startTime).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-white text-sm font-mono">
              {formatDuration(entry.duration)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;

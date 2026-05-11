import { useState, useEffect } from "react";
import { Play, Pause, Square, Tag } from "lucide-react";
import { mockTasks } from "../../mock/mockData";
import TaskSelect from "./TaskSelect";

const ClockTimer = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  const [selectedTask, setSelectedTask] = useState("");
  const [description, setDescription] = useState("");
  const [isBillable, setIsBillable] = useState(true);

  const mockTask = [
    "all",
    "backlog",
    "todo",
    "in-progress",
    "in-review"
  ]

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

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="text-6xl text-white mb-6 font-mono tracking-wider">
          {formatTime(trackingTime)}
        </div>
        <div className="flex items-center justify-center gap-3">
          {!isTracking ? (
            <button
              onClick={() => setIsTracking(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white transition rounded-sm"
            >
              <Play className="size-5" />
              Start Timer
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsTracking(false)}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white transition"
              >
                <Pause className="size-5" />
                Pause
              </button>
              <button
                onClick={() => {
                  setIsTracking(false);
                  setTrackingTime(0);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white transition"
              >
                <Square className="size-5" />
                Stop
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Task</label>
          <TaskSelect list={mockTask} defaultValue="Select a task"/>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What are you working on?"
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] text-white px-4 text-sm
             py-2.5 placeholder-gray-600 outline-none focus:border-emerald-500 transition rounded-sm"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isBillable}
              onChange={(e) => setIsBillable(e.target.checked)}
              className="w-4 h-4 bg-[#0F0F0F] border-[#2A2A2A]"
            />
            <span className="text-sm text-gray-400">Billable</span>
          </label>
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
            <Tag className="size-4" />
            Add tags
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClockTimer;

import React from "react";

const TimerTab = ({activeTab, setActiveTab}) => {
  return (
    <div className="border-b border-[#2A2A2A] px-6 py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab("timer")}
          className={`text-sm px-1 py-1 ${
            activeTab === "timer"
              ? "text-white border-b-2 border-emerald-500"
              : "text-gray-500 hover:text-gray-400"
          }`}
        >
          Timer
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`text-sm px-1 py-1 ${
            activeTab === "manual"
              ? "text-white border-b-2 border-emerald-500"
              : "text-gray-500 hover:text-gray-400"
          }`}
        >
          Manual Entry
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`text-sm px-1 py-1 ${
            activeTab === "history"
              ? "text-white border-b-2 border-emerald-500"
              : "text-gray-500 hover:text-gray-400"
          }`}
        >
          History
        </button>
      </div>
    </div>
  );
};

export default TimerTab;

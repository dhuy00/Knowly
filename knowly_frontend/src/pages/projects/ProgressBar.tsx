import React from "react";

const ProgressBar = ({progress}) => {
  return (
    <div className="bg-white/70 rounded-md p-5 border border-gray-200">
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-medium">Progress</span>
        <span>{progress}%</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

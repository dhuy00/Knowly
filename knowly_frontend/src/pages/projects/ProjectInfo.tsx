import React from "react";

const ProjectInfo = ({start, due, estimate, spent}) => {
  return (
    <div className="bg-white/70 rounded-md p-5 border-gray-200 border">
      <h2 className="font-semibold mb-4 text-sm">Project Info</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Start</span>
          <span>{start}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Due date</span>
          <span>{due}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Estimate</span>
          <span>{estimate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Spent</span>
          <span>{spent}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;

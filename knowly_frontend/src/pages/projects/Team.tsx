import React from "react";
import { FiUsers } from "react-icons/fi";

const Team = ({members}) => {
  return (
    <div className="bg-white/70 rounded-md p-5 border border-gray-200">
      <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm">
        <FiUsers />
        Team
      </h2>

      <div className="space-y-3">
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-3">
            <img src={m} className="w-7 h-7 rounded-full" />

            <span className="text-sm">Member {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

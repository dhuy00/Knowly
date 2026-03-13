import React from "react";

const MemberList = ({members}) => {
  return (
    <div className="flex -space-x-2">
      {members.map((member, index) => (
        <img
          key={index}
          src={member}
          className="w-6 h-6 rounded-full border border-white"
        />
      ))}
    </div>
  );
};

export default MemberList;

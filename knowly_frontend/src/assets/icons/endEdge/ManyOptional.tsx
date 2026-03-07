import React from "react";

const ManyOptional = ({ size = 13 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="5" r="3" stroke="black" strokeWidth="1" fill="white" />
      <line x1="32" y1="-10" x2="8" y2="5" stroke="black" strokeWidth="1" />
      <line x1="30" y1="18" x2="8" y2="5" stroke="black" strokeWidth="1" />
      <line x1="8" y1="5" x2="20" y2="5" stroke="black" strokeWidth="1" />
    </svg>
  );
};

export default ManyOptional;

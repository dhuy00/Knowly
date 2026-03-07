import React from "react";

const OneOptional = ({ size = 13 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="5" r="3" stroke="black" strokeWidth="1" fill="white" />
      <line x1="9" y1="2" x2="9" y2="8" stroke="black" strokeWidth="1" />
      <line x1="7" y1="5" x2="14" y2="5" stroke="black" strokeWidth="1" />
    </svg>
  );
};

export default OneOptional;

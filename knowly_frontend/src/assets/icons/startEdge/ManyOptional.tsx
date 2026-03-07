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
      <circle cx="9" cy="5" r="3" stroke="black" strokeWidth="1" fill="white" />
      <line x1="-10" y1="-5" x2="6" y2="5" stroke="black" strokeWidth="1" />
      <line x1="-2" y1="10" x2="6" y2="5" stroke="black" strokeWidth="1" />
      <line x1="0" y1="5" x2="6" y2="5" stroke="black" strokeWidth="1" />
    </svg>
  );
};

export default ManyOptional;

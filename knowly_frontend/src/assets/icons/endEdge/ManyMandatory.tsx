import React from "react";

const ManyMandatory = ({ size = 13 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="7" y1="1" x2="7" y2="9" stroke="black" strokeWidth="1" />
      <line x1="32" y1="-10" x2="8" y2="5" stroke="black" strokeWidth="1" />
      <line x1="30" y1="18" x2="8" y2="5" stroke="black" strokeWidth="1" />
      <line x1="2" y1="5" x2="20" y2="5" stroke="black" strokeWidth="1" />
    </svg>
  );
};

export default ManyMandatory;

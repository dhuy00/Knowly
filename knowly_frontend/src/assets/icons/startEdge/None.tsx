import React from "react";

const None = ({ size = 13 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="14" y1="6.5" x2="1" y2="6.5" stroke="black" />
    </svg>
  );
};

export default None;

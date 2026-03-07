import React from "react";

const OneMandatory = ({ size = 13 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
          <line x1="6" y1="1" x2="6" y2="9" stroke="black" strokeWidth="1" />
          <line x1="9" y1="1" x2="9" y2="9" stroke="black" strokeWidth="1" />
          <line x1="0" y1="5" x2="13" y2="5" stroke="black" strokeWidth="1" />
    </svg>
  );
};

export default OneMandatory;

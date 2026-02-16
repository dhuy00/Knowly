import React from "react";

const OrthogonalEdge = ({size = 13}) => {
  return (
    <svg      
      width={size}
      height={size}       
      viewBox="0 0 13 13"     
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="11.5" y1="2" x2="11.5" y2="7" stroke="black" />
      <rect x="10.5" y="0.5" width="2" height="2" stroke="black" />
      <rect x="0.5" y="10.5" width="2" height="2" stroke="black" />
      <line x1="12" y1="6.5" x2="1" y2="6.5" stroke="black" />
      <line x1="1.5" y1="10" x2="1.5" y2="6" stroke="black" />
    </svg>
  );
};

export default OrthogonalEdge;

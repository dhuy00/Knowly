import React from "react";

const EdgeMakers = () => {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0 }} width="0" height="0">
      {/* One Mandatory */}
      <defs>
        <marker
          id="one-mandatory"
          viewBox="0 0 14 10"
          markerWidth={13}
          markerHeight={12}
          refX={13}
          refY={5}
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <line x1="7" y1="1" x2="7" y2="9" stroke="black" strokeWidth="1" />
          <line x1="10" y1="1" x2="10" y2="9" stroke="black" strokeWidth="1" />
          <line x1="0" y1="5" x2="13" y2="5" stroke="black" strokeWidth="1" />
        </marker>
      </defs>

      {/* One Optional */}
      <defs>
        <marker
          id="one-optional"
          viewBox="0 0 20 10"
          markerWidth={20}
          markerHeight={12}
          refX={20}
          refY={5}
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <circle
            cx="6"
            cy="5"
            r="4"
            stroke="black"
            strokeWidth="1"
            fill="white"
          />
          <line x1="15" y1="1" x2="15" y2="9" stroke="black" strokeWidth="1" />
          <line x1="10" y1="5" x2="20" y2="5" stroke="black" strokeWidth="1" />
        </marker>
      </defs>

      {/* Many Mandatory */}
      <defs>
        <marker
          id="many-mandatory"
          viewBox="0 0 20 10"
          markerWidth={20}
          markerHeight={25}
          refX={15}
          refY={5}
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <line x1="7" y1="0" x2="7" y2="10" stroke="black" strokeWidth="1" />
          <line x1="32" y1="-10" x2="8" y2="5" stroke="black" strokeWidth="1" />
          <line x1="30" y1="18" x2="8" y2="5" stroke="black" strokeWidth="1" />
          <line x1="2" y1="5" x2="20" y2="5" stroke="black" strokeWidth="1" />
        </marker>
      </defs>

      {/* Many Optional */}
      <defs>
        <marker
          id="many-optional"
          viewBox="0 0 20 10"
          markerWidth={20}
          markerHeight={25}
          refX={15}
          refY={5}
          orient="auto-start-reverse"
          markerUnits="strokeWidth"
        >
          <circle
            cx="4"
            cy="5"
            r="3"
            stroke="black"
            strokeWidth="1"
            fill="white"
          />
          <line x1="32" y1="-10" x2="8" y2="5" stroke="black" strokeWidth="1" />
          <line x1="30" y1="18" x2="8" y2="5" stroke="black" strokeWidth="1" />
          <line x1="8" y1="5" x2="20" y2="5" stroke="black" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  );
};

export default EdgeMakers;

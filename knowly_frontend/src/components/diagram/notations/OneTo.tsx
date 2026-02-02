export default function OneTo() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="0"
      height="0"
    >
      <defs>
        <marker
          id="logo"
          viewBox="0 0 10 10"
          markerWidth={12}
          markerHeight={12}
          refX={10}
          refY={5}
          orient="auto"
          markerUnits="strokeWidth"
        >
          <line x1="7" y1="1" x2="7" y2="9" stroke="black" strokeWidth="1" />
          <line x1="1" y1="5" x2="9" y2="5" stroke="black" strokeWidth="1" />
        </marker>

        <marker
          id="circle"
          viewBox="0 0 10 10"
          markerWidth={10}
          markerHeight={10}
          refX={5}
          refY={5}
        >
          <circle cx="5" cy="5" r="4" fill="red" />
        </marker>
      </defs>
    </svg>
  );
}

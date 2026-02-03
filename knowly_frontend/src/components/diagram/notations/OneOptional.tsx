export default function OneOptional() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="0"
      height="0"
    >
      <defs>
        <marker
          id="logo-optional"
          viewBox="0 0 20 10"
          markerWidth={20}
          markerHeight={12}
          refX={3}
          refY={5}
          orient="auto"
          markerUnits="strokeWidth"
        >
          <circle cx="15" cy="5" r="3" stroke="black" strokeWidth="1" fill="white" />
          <line x1="7" y1="1" x2="7" y2="9" stroke="black" strokeWidth="1" />
          <line x1="1" y1="5" x2="12" y2="5" stroke="black" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  );
}

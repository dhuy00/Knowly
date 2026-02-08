export default function OneOptional() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="0"
      height="0"
    >
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
          <circle cx="6" cy="5" r="4" stroke="black" strokeWidth="1" fill="white" />
          <line x1="15" y1="1" x2="15" y2="9" stroke="black" strokeWidth="1" />
          <line x1="10" y1="5" x2="20" y2="5" stroke="black" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  );
}

export default function ManyOptional() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="0"
      height="0"
    >
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
          <circle cx="4" cy="5" r="3" stroke="black" strokeWidth="1" fill="white" />
          <line x1="32" y1="-10" x2="8" y2="5" stroke="black" strokeWidth="1" />
          <line x1="30" y1="18" x2="8" y2="5" stroke="black" strokeWidth="1" />
          <line x1="8" y1="5" x2="20" y2="5" stroke="black" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  );
}

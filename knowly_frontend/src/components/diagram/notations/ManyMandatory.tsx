export default function ManyOptional() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="0"
      height="0"
    >
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
    </svg>
  );
}

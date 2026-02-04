export default function ManyMandatory() {
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
          markerHeight={12}
          refX={3}
          refY={5}
          orient="auto"
          markerUnits="strokeWidth"
        >
          <line x1="8" y1="1" x2="8" y2="9" stroke="black" strokeWidth="1" />
          <line x1="-1" y1="0" x2="8" y2="5" stroke="black" strokeWidth="1" />
          <line x1="-1" y1="10" x2="8" y2="5" stroke="black" strokeWidth="1" />
          <line x1="0" y1="5" x2="13" y2="5" stroke="black" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  );
}

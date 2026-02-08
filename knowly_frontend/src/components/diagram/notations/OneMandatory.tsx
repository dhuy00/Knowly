export default function OneMandatory() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="0"
      height="0"
    >
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
    </svg>
  );
}

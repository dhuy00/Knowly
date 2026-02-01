import { ReactFlow, Background, MarkerType, BezierEdge } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CustomEdge from "../test/CustomEdge";

const edgeTypes = {
  default: BezierEdge,
  custom: CustomEdge,
};

const defaultNodes = [
  {
    id: "A",
    position: { x: 20, y: 20 },
    data: { label: "A" },
  },
  {
    id: "B",
    position: { x: 100, y: 200 },
    data: { label: "B" },
  },
  {
    id: "C",
    position: { x: 300, y: 20 },
    data: { label: "C" },
  },
  {
    id: "D",
    position: { x: 300, y: 170 },
    data: { label: "D" },
  },
  {
    id: "E",
    position: { x: 250, y: 300 },
    data: { label: "E" },
  },
  {
    id: "F",
    position: { x: 250, y: 450 },
    data: { label: "F" },
  },
  {
    id: "G",
    position: { x: 20, y: 450 },
    data: { label: "G" },
  },
  {
    id: "H",
    position: { x: 500, y: 450 },
    data: { label: "H" },
  },
];

const defaultEdges = [
  {
    id: "A->B",
    source: "A",
    target: "B",
    markerEnd: {
      type: MarkerType.Arrow,
    },
    label: "default arrow",
  },
  {
    id: "C->D",
    source: "C",
    target: "D",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    label: "default closed arrow",
  },
  {
    id: "D->E",
    source: "D",
    target: "E",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    markerStart: {
      type: MarkerType.ArrowClosed,
      orient: "auto-start-reverse",
    },
    label: "marker start and marker end",
  },
  {
    id: "E->F",
    source: "E",
    target: "F",
    markerEnd: "logo",
    label: "custom marker",
  },
  {
    id: "E->H",
    source: "E",
    target: "H",
    type: "custom",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
    label: "change color on selection",
  },
  {
    id: "B->G",
    source: "B",
    target: "G",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#FF0072",
    },
    label: "marker size and color",
    style: {
      strokeWidth: 2,
      stroke: "#FF0072",
    },
  },
];

export default function TestDiagramEditor() {
  return (
    <>
      <div className="w-full h-screen">
        <svg style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <marker
              id="logo"
              viewBox="0 0 10 10"
              markerWidth={12}
              markerHeight={12}
              refX={10} // 🔥 điểm chạm vào edge
              refY={5}
              orient="auto"
              markerUnits="strokeWidth"
            >
              {/* vertical line */}
              <line
                x1="7"
                y1="1"
                x2="7"
                y2="9"
                stroke="black"
                strokeWidth="1"
              />
              {/* horizontal line */}
              <line
                x1="1"
                y1="5"
                x2="9"
                y2="5"
                stroke="black"
                strokeWidth="1"
              />
            </marker>
          </defs>
        </svg>
        <ReactFlow
          defaultNodes={defaultNodes}
          defaultEdges={defaultEdges}
          fitView
          edgeTypes={edgeTypes}
        >
          <Background />
        </ReactFlow>
      </div>
    </>
  );
}

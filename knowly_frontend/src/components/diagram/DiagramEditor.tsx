import BreadCumb from "../common/BreadCumb";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { React, useState, useCallback } from "react";
import type { Edge } from "@xyflow/react";
import DiagramToolbar from "./DiagramToolbar";

const DiagramEditor = () => {
  const nodeColor = (node) => {
    switch (node.type) {
      case "input":
        return "#6ede87";
      case "output":
        return "#6865A5";
      default:
        return "#ff0072";
    }
  };

  const breadCumbPath = [
    { label: "Notes", href: "/notes" },
    { label: "Myle", href: "/notes/1" },
    { label: "First diagram", active: true },
  ];

  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" },
      position: { x: 250, y: 25 },
      style: { backgroundColor: "#6ede87", color: "white" },
    },

    {
      id: "2",
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
      style: { backgroundColor: "#ff0072", color: "white" },
    },
    {
      id: "3",
      type: "output",
      data: { label: "Output Node" },
      position: { x: 250, y: 250 },
      style: { backgroundColor: "#6865A5", color: "white" },
    },
  ];

  const initialEdges: Edge[] = [];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodeSnapshot) => applyNodeChanges(changes, nodeSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div className="bg-background-primary h-full w-full rounded-xl p-5 shadow-sm overflow-hidden flex">
        <DiagramToolbar/>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background />
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
          <Controls />
        </ReactFlow>
    </div>
  );
};

export default DiagramEditor;

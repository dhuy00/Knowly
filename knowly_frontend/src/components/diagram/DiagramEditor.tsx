import BreadCumb from "../common/BreadCumb";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { React, useState, useCallback } from "react";
import type { Edge } from "@xyflow/react";

const DiagramEditor = () => {
  const breadCumbPath = [
    { label: "Notes", href: "/notes" },
    { label: "Myle", href: "/notes/1" },
    { label: "First diagram", active: true },
  ];

  const initialNodes = [
    {
      id: "n1",
      position: { x: 0, y: 0 },
      data: { label: "Node 1" },
      type: "input",
    },
    {
      id: "n2",
      position: { x: 100, y: 100 },
      data: { label: "Node 2" },
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
    <div className="bg-background-primary w-full h-full rounded-xl p-5 shadow-sm overflow-hidden">
      <BreadCumb path={breadCumbPath} />
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DiagramEditor;

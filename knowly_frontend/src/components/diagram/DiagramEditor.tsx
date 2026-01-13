// import BreadCumb from "../common/BreadCumb";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  addEdge,
  MiniMap
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useState, useCallback, useEffect } from "react";
import DiagramToolbar from "./DiagramToolbar";
import { useNode } from "../../hooks/useNode";
import type { Node, Edge } from "@xyflow/react";

const DiagramEditor = () => {
  const initialNodes: Node[] = [];

  const { nodes, onNodesChange, addNode, updateNodeLabel, deleteNode } = useNode({ initialNodes });

  const nodeColor = (node) => {
    switch (node.type) {
      case "input":
        return "#2ac44b";
      case "output":
        return "#6865A5";
      default:
        return "#ff0072";       
    }
  };

  // const breadCumbPath = [
  //   { label: "Notes", href: "/notes" },
  //   { label: "Myle", href: "/notes/1" },
  //   { label: "First diagram", active: true },
  // ];


  const initialEdges: Edge[] = [];

  const [edges, setEdges] = useState(initialEdges);

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
      <DiagramToolbar addNode={addNode}/>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        deleteKeyCode={["Delete"]}
      >
        <Background />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DiagramEditor;

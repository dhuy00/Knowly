// import BreadCumb from "../common/BreadCumb";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback } from "react";
import DiagramToolbar from "./DiagramToolbar";
import { useNode } from "../../hooks/useNode";
import type { Node, Edge } from "@xyflow/react";
import TableNode from "./TableNode";
import TextNode from "./TextNode";
import RelationshipEdge from "./notations/RelationshipEdge";
import EdgeMakers from "./notations/EdgeMakers";

const DiagramEditor = () => {
  const initialNodes: Node[] = [];

  const { nodes, onNodesChange, addNode } = useNode({ initialNodes });

  const nodeTypes = {
    text: TextNode,
    table: TableNode,
  };

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

  const initialEdges: Edge[] = [];
  const edgeTypes = {
    relationship: RelationshipEdge
  }

  const [edges, setEdges] = useState(initialEdges);

  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((edgeSnapshot) =>
        addEdge(
          {
            ...params,
            type: "relationship",
            data: {
              start: "one",
              end: "many",
              optionalStart: true,
              optionalEnd: false
            }
          },
          edgeSnapshot,
        ),
      ),
    [],
  );

  return (
    <div className="bg-background-primary h-full w-full rounded-xl p-5 shadow-sm overflow-hidden flex">
      <DiagramToolbar addNode={addNode} />
      <EdgeMakers/>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
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

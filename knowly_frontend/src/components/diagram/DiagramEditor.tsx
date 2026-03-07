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
import { useState, useCallback, useEffect } from "react";
import DiagramToolbar from "./DiagramToolbar";
import { useNode } from "../../hooks/useNode";
import type { Node, Edge } from "@xyflow/react";
import TableNode from "./TableNode";
import TextNode from "./TextNode";
import RelationshipEdge from "./notations/RelationshipEdge";
import EdgeMakers from "./notations/EdgeMakers";
import eventBus from "../../utils/eventBus";
import {
  UPDATE_EDGE_START,
  UPDATE_EDGE_END,
  UPDATE_SELECTED_NODE,
  UPDATE_SELECTED_EDGE,
} from "../../constant/event";

const DiagramEditor = () => {
  const initialNodes: Node[] = [];

  const { nodes, onNodesChange, addNode } = useNode({ initialNodes });

  const nodeTypes = {
    text: TextNode,
    table: TableNode,
  };

  const nodeColor = (node) => {
    switch (node.type) {
      case "text":
        return "#2ac44b";
      case "table":
        return "#6865A5";
      default:
        return "#ff0072";
    }
  };

  const initialEdges: Edge[] = [];
  const edgeTypes = {
    relationship: RelationshipEdge,
  };

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
              optionalEnd: false,
            },
          },
          edgeSnapshot,
        ),
      ),
    [],
  );

  const onSelectionChange = ({ nodes, edges }) => {
    eventBus.emit(UPDATE_SELECTED_NODE, nodes);
  };

  const onEdgeClick = (event, edge) => {
    eventBus.emit(UPDATE_SELECTED_EDGE, edge.id)
  };

  const updateEdgeData = (id: string, data: Partial<Edge["data"]>) => {
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === id
          ? {
              ...edge,
              data: {
                ...edge.data,
                ...data,
              },
            }
          : edge,
      ),
    );
  };

  useEffect(() => {
    const updateEdgeStart = eventBus.on(UPDATE_EDGE_START, (data) => {
      console.log("Update node start: ", data);

      const optional = data.edge.optional || null;
      if (optional) {
        updateEdgeData(data.edgeId, { optionalStart: data.edge.optionalStart });
      }
      updateEdgeData(data.edgeId, { start: data.edge.start });
    });

    const updateEdgeEnd = eventBus.on(UPDATE_EDGE_END, (data) => {
      const optional = data.edge.optional || null;
      if (optional) {
        updateEdgeData(data.edgeId, { optionalEnd: data.edge.optionalEnd });
      }
      updateEdgeData(data.edgeId, { end: data.edge.end });
    });

    return () => {
      updateEdgeStart();
      updateEdgeEnd();
    };
  }, []);

  useEffect(() => {
    console.log("Update edge data: ", edges)
  }, [edges])

  return (
    <div className="flex h-full w-full gap-4 bg-background-common">
      <DiagramToolbar addNode={addNode} />
      <div className="bg-background-primary h-full w-full rounded-md p-5 shadow-sm overflow-hidden flex">
        <EdgeMakers />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
          deleteKeyCode={["Delete"]}
          onSelectionChange={onSelectionChange}
          onEdgeClick={onEdgeClick}
        >
          <Background />
          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DiagramEditor;

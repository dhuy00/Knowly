import { useCallback, useEffect, useState } from "react";
import { applyNodeChanges } from "@xyflow/react";
import type { Node, XYPosition, NodeChange } from "@xyflow/react";
import { rowData } from "../mock/mockDiagramData";
import type { NodeRow } from "../types/diagram";

type UseNodeProps = {
  initialNodes: Node[];
};

export const useNode = ({ initialNodes }: UseNodeProps) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const generateRandomPosition = (): XYPosition => ({
    x: Math.random() * 400,
    y: Math.random() * 400,
  });

  const addNode = (label: string = "New Node", position?: XYPosition) => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      data: {
        label,
        rows: rowData,
        updateLabel: (id: string, value: string) => {
          updateNodeLabel(id, value);
        },
        updateNodeRow: (id: string, newValue: string, rowId: string) => {
          updateNodeRow(id, newValue, rowId);
        },
      },
      type: "table",
      position: position ?? generateRandomPosition(),
      style: {
        // backgroundColor: "#3fc5cc",
        color: "#333",
        borderRadius: "2px",
        width: 180,
      },
    };

    setNodes((prev) => [...prev, newNode]);
  };

  const updateNodeLabel = (id: string, newLabel: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
              },
            }
          : node,
      ),
    );
  };

  const updateRowData = (rows: NodeRow[], newValue: string, rowId: string) =>
    rows.map((row) => (row.rowId == rowId ? { ...row, value: newValue } : row));

  const updateNodeRow = (id: string, newValue: string, rowId: string) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id == id
          ? {
              ...node,
              data: {
                ...node.data,
                rows: updateRowData(node.data.rows as NodeRow[], newValue, rowId),
              },
            }
          : node,
      ),
    );
  };

  useEffect(() => {
    console.log("Update nodes: ", nodes)
  }, [nodes])

  const updateNodeData = (id: string, data: Partial<Node["data"]>) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            }
          : node,
      ),
    );
  };

  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
  };

  const deleteSelectedNodes = () => {
    setNodes((prev) => prev.filter((node) => !node.selected));
  };

  return {
    nodes,
    setNodes,
    onNodesChange,
    addNode,
    updateNodeLabel,
    updateNodeData,
    deleteNode,
    deleteSelectedNodes,
  };
};

export type AddNodeFunction = (label?: string, position?: XYPosition) => void;

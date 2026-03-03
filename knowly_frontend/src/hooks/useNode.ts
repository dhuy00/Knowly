import { useCallback, useState } from "react";
import { applyNodeChanges } from "@xyflow/react";
import type { Node, XYPosition, NodeChange } from "@xyflow/react";
import { rowData } from "../mock/mockDiagramData";
import type { NodeRow } from "../types/diagram";
import { nodeFactories } from "../factories/nodeFactories";

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

  const addNode = (type: string, label = "New Node") => {
    const id = crypto.randomUUID();

    const newNode = nodeFactories[type](
      { id, label, position: generateRandomPosition() },
      {
        rowData,
        updateLabel,
        updateNodeRow,
        addRowToNode,
      },
    );

    setNodes((prev) => [...prev, newNode]);
  };

  const updateLabel = (id: string, newLabel: string) => {
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

  const updateNodeRow = (id: string, rowID: string, newValue: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id !== id) return node;

        const updatedRows = (node.data.rows ?? []).map((row) =>
          row.rowId === rowID ? { ...row, value: newValue } : row,
        );

        return {
          ...node,
          data: {
            ...node.data,
            rows: updatedRows,
          },
        };
      }),
    );
  };

  const addRowToNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id !== nodeId) return node;

        const currentRows = (node.data.rows ?? []) as NodeRow[];

        const rowToAdd: NodeRow = {
          rowId: crypto.randomUUID(),
          value: "New Row",
        };

        // console.log("Current rows: ", rowToAdd);

        return {
          ...node,
          data: {
            ...node.data,
            rows: [...currentRows, rowToAdd],
          },
        };
      }),
    );
  };

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
    updateLabel,
    updateNodeData,
    deleteNode,
    deleteSelectedNodes,
    addRowToNode,
  };
};

export type AddNodeFunction = (type: string, label?: string) => void;

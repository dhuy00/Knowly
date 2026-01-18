import { useCallback, useState } from "react";
import { applyNodeChanges } from  "@xyflow/react";
import type { Node, XYPosition, NodeChange }  from "@xyflow/react";

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
  }) 

  const addNode = (label: string = "New Node", position?: XYPosition) => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      data: { label, updateLabel: (id: string, value: string) => {updateNodeLabel(id, value)} },
      type: 'custom',
      position: position ?? generateRandomPosition(),
      style: {
        backgroundColor: "#3fc5cc",
        color: "#333",  
        borderRadius: '2px' ,
        width: 200,
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
          : node
      )
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
          : node
      )
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

export type AddNodeFunction = (
  label?: string,
  position?: XYPosition
) => void;

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
      },
    );

    console.log("New node: ", newNode)

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

  const updateNodeRow = (id: string, newRows: NodeRow[]) => {
    setNodes((nodes) =>
      nodes.map((node) =>                 
        node.id == id
          ? {
              ...node,
              data: {
                ...node.data,
                rows: newRows,
              },
            }
          : node,
      ),
    );
  };

  // useEffect(() => {
  //   console.log("Update nodes: ", nodes)
  // }, [nodes])

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
  };
};

export type AddNodeFunction = (type: string, label?: string) => void;

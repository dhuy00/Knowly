import type { XYPosition } from "@xyflow/react";
import type { Node } from "@xyflow/react";

export interface NodeRow {
  rowId: string;
  value: string | number;
}

export interface NodeData {
  label: string;
  rows: NodeRow[];
  updateLabel: (id: string, value: string) => void,
  updateNodeRow: (id: string, newRows: NodeRow[]) => void;
}

export interface EdgeType {
  id: number;
  name: string;
  component: React.ComponentType<{ size?: number }>;
};

export interface NodeType {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type NodeFactoryContext = {
  rowData: NodeRow[],
  updateLabel: (id: string, value: string) => void,
  updateNodeRow: (id: string, newValue: NodeRow[]) => void
}

export type NodeFactory  = (
  params: {
    id: string,
    label: string,
    position: XYPosition,
  },
  ctx: NodeFactoryContext
 ) => Node;

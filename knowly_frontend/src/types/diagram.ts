import type { XYPosition } from "@xyflow/react";
import type { Node } from "@xyflow/react";

export interface NodeRow {
  rowId: string;
  value: string | number;
}

export interface NodeData {
  label: string;
  rows: NodeRow[];
  color: string;
  textColor: string
  updateLabel: (id: string, value: string) => void,
  updateNodeRow: (id: string, newRows: NodeRow[]) => void,
  addRowToNode: (id: string, rowId: string) => void
  updateNodeData: (id: string, data: Partial<Node["data"]>) => void,
}

export interface EdgeType {
  id: number;
  name: string;
  component: React.ComponentType<{ size?: number }>;
  start?: string,
  end?: string,
  optionalStart?: boolean,
  optionalEnd?: boolean
};

export interface NodeType {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type NodeFactoryContext = {
  rowData: NodeRow[],
  color: string,
  textColor: string,
  updateLabel: (id: string, value: string) => void,
  updateNodeRow: (id: string, newValue: NodeRow[]) => void,
  addRowToNode: (id: string, rowId: string) => void,
  updateNodeData: (id: string, data: Partial<Node["data"]>) => void
}

export type NodeFactory  = (
  params: {
    id: string,
    label: string,
    position: XYPosition,
  },
  ctx: NodeFactoryContext
 ) => Node;

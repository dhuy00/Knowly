export interface NodeRow {
  rowId: string;
  value: string | number;
}

export interface NodeData {
  label: string;
  rows: NodeRow[];
  updateLabel: (id: string, value: string) => void,
  updateNodeRow: (id: string, newValue: string, rowId: string) => void;
}

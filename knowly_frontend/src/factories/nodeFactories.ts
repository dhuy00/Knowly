import type { NodeFactory } from "../types/diagram";

export const nodeFactories: Record<string, NodeFactory> = {
  table: ({ id, label, position }, ctx) => ({
    id,
    type: "table",
    position,
    data: {
      label,
      rows: ctx.rowData,
      updateLabel: ctx.updateLabel,
      updateNodeRow: ctx.updateNodeRow,
    },
    style: { width: 180 },
  }),

  text: ({ id, label, position }) => ({
    id,
    type: "text",
    position,
    data: { label },
    style: {
      width: 180
    }
  }),
};

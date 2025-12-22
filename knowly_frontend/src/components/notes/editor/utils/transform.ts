import type { EditorState, TextNode } from "../../../../types/editor";

export function applyMark(
  state: EditorState,
  mark: "bold" | "italic" | "highlight"
): EditorState {
  if (!state.selection) return state;

  const { blockId, start, end } = state.selection;

  return {
    ...state,
    blocks: state.blocks.map(block => {
      if (block.id !== blockId) return block;

      const newChildren: TextNode[] = [];
      let cursor = 0;

      block.children.forEach(node => {
        const len = node.text.length;

        if (cursor + len <= start || cursor >= end) {
          newChildren.push(node);
        } else {
          if (cursor < start) {
            newChildren.push({
              ...node,
              text: node.text.slice(0, start - cursor)
            });
          }

          newChildren.push({
            ...node,
            text: node.text.slice(
              Math.max(0, start - cursor),
              Math.min(len, end - cursor)
            ),
            [mark]: true
          });

          if (cursor + len > end) {
            newChildren.push({
              ...node,
              text: node.text.slice(end - cursor)
            });
          }
        }

        cursor += len;
      });

      return { ...block, children: newChildren };
    })
  };
}

import type { SelectionState } from "../../../../types/editor";

export function getSelectionState(): SelectionState | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return null;

  const blockEl = range.startContainer.parentElement
    ?.closest("[data-block-id]") as HTMLElement | null;

  if (!blockEl) return null;

  return {
    blockId: blockEl.dataset.blockId!,
    start: range.startOffset,
    end: range.endOffset
  };
}

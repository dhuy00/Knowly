import { useState } from "react";
import { initialState } from "./initialState";
import type { EditorState } from "../../../types/editor";
import BlockView from "./components/BlockView";
import Toolbar from "./components/Toolbar";
import { getSelectionState } from "./utils/selection";
import { applyMark } from "./utils/transform";

export default function Editor() {
  const [state, setState] = useState<EditorState>(initialState);

  function handleInput(text: string, blockId: string) {
    setState(s => ({
      ...s,
      blocks: s.blocks.map(b =>
        b.id === blockId
          ? { ...b, children: [{ text }] }
          : b
      )
    }));
  }

  function updateSelection() {
    const sel = getSelectionState();
    if (!sel) return;

    setState(s => ({ ...s, selection: sel }));
  }

  return (
    <div
      className="editor-root"
      onMouseUp={updateSelection}
      onKeyUp={updateSelection}
    >
      <Toolbar
        onBold={() =>
          setState(s => applyMark(s, "bold"))
        }
      />

      {state.blocks.map(block => (
        <BlockView
          key={block.id}
          block={block}
          onInput={handleInput}
        />
      ))}
    </div>
  );
}

import type { EditorState } from "../../../types/editor";

export const initialState: EditorState = {
  blocks: [
    {
      id: "block-1",
      type: "paragraph",
      children: [{text: ""}]
    }
  ],
  selection: null
}
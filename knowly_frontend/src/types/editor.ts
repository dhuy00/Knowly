export type TextNode = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  highlight?: boolean;
};

export type Block = {
  id: string;
  type: "paragraph" | "quote" | "heading";
  children: TextNode[];
};

export type SelectionState = {
  blockId: string;
  start: number;
  end: number;
};

export type EditorState = {
  blocks: Block[];
  selection: SelectionState | null;
};
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";
import FontFamily from '@tiptap/extension-font-family'
import { TextStyle } from "@tiptap/extension-text-style";
import { FontSize } from "../../extensions/FontSize";
import { Color } from "@tiptap/extension-color";
import Dialog from "../common/Dialog";
import DiagramEditor from "../diagram/DiagramEditor";
import TestDiagramEditor from "../diagram/TestDiagramEditor";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [openDiagram, setOpenDiagram] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-6",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-6",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: "Your text here...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      TextStyle,
      FontFamily,
      FontSize,
      Color
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "h-[400px] rounded-md overflow-y-auto mt-4 focus:outline-none text-md text-text-secondary",
      },
    },
    onUpdate: ({ editor }) => {
      if (typeof onChange === "function") {
        onChange(editor.getHTML());
      }
    },
  });

  return (
    <div>
      <Toolbar editor={editor} setOpenDiagram={setOpenDiagram}/>
      <EditorContent editor={editor} className="editor-content"/>
      <Dialog
        open={openDiagram}
        onClose={() => setOpenDiagram(false)}
        title="Diagram view"
        style="w-[95%] h-[700px]">
          <DiagramEditor/>
          {/* <TestDiagramEditor/> */}
      </Dialog>
    </div>
  );
};

export default TextEditor;

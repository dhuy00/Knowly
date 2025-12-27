// TiptapEditor.tsx
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import { FiBold } from "react-icons/fi";
import { RiItalic } from "react-icons/ri";
import { BsTypeUnderline, BsCode } from "react-icons/bs";
import { BiListOl, BiListUl } from "react-icons/bi";
import { TextStyle } from '@tiptap/extension-text-style';

const TiptapEditor = () => {
  const [selectionState, setSelectionState] = useState({
    bold: false,
    italic: false,
    underline: false,
    code: false,
    bulletList: false,
    orderedList: false,
  });

  const editor = useEditor({
    extensions: [
      StarterKit, // Bao gồm BulletList, OrderedList, CodeBlock, Paragraph, Heading,...
      TextStyle,
      Color,
    ],
    content: "<p>Hello, TipTap editor!</p>",
    onUpdate: ({ editor }) => updateSelectionState(editor),
    onSelectionUpdate: ({ editor }) => updateSelectionState(editor),
  });

  if (!editor) return null;

  const updateSelectionState = (editor: any) => {
    setSelectionState({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      code: editor.isActive("code"),
      bulletList: editor.isActive("bulletList"),
      orderedList: editor.isActive("orderedList"),
    });
  };

  const toggleMark = (mark: string) => {
    if (!editor) return;
    editor.chain().focus()[`toggle${mark}`]().run();
  };

  const toggleList = (list: "bulletList" | "orderedList") => {
    if (!editor) return;
    if (list === "bulletList") editor.chain().focus().toggleBulletList().run();
    else if (list === "orderedList") editor.chain().focus().toggleOrderedList().run();
  };

  const setColor = (color: string) => editor.chain().focus().setColor(color).run();
  const setFontSize = (size: string) => editor.chain().focus().setFontSize(size).run();
  const setFontFamily = (family: string) => editor.chain().focus().setFontFamily(family).run();

  const activeClass = (active: boolean) => (active ? "bg-blue-500 text-white" : "hover:bg-gray-200");

  return (
    <div className="max-w-2xl mx-auto mt-6 border rounded p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={() => toggleMark("Bold")} className={`p-2 rounded ${activeClass(selectionState.bold)}`}>
          <FiBold />
        </button>
        <button onClick={() => toggleMark("Italic")} className={`p-2 rounded ${activeClass(selectionState.italic)}`}>
          <RiItalic />
        </button>
        <button onClick={() => toggleMark("Underline")} className={`p-2 rounded ${activeClass(selectionState.underline)}`}>
          <BsTypeUnderline />
        </button>
        <button onClick={() => toggleMark("Code")} className={`p-2 rounded ${activeClass(selectionState.code)}`}>
          <BsCode />
        </button>
        <button onClick={() => toggleList("bulletList")} className={`p-2 rounded ${activeClass(selectionState.bulletList)}`}>
          <BiListUl />
        </button>
        <button onClick={() => toggleList("orderedList")} className={`p-2 rounded ${activeClass(selectionState.orderedList)}`}>
          <BiListOl />
        </button>

        {/* Font size */}
        <select onChange={(e) => setFontSize(e.target.value)} className="border p-1 rounded">
          <option value="">Font Size</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="24px">24px</option>
        </select>

        {/* Font family */}
        <select onChange={(e) => setFontFamily(e.target.value)} className="border p-1 rounded">
          <option value="">Font Family</option>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Color picker */}
        <input type="color" onChange={(e) => setColor(e.target.value)} className="w-10 h-8 p-1 border rounded" />
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} className="min-h-[200px] border p-2 focus:outline-none" />
    </div>
  );
};

export default TiptapEditor;

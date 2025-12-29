import React, { useState, type Dispatch, type SetStateAction } from "react";
import { FaRegImages } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import FontSizeSelect from "./FontSizeSelect";
import { Editor, useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  const textFormatStyle = `px-1.5 py-1.5 rounded-sm text-primary hover:bg-blue-200 cursor-pointer`;
  const [number, setNumber] = useState<number[] | string[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      h1: ctx.editor.isActive("heading", { level: 1 }),
      h2: ctx.editor.isActive("heading", { level: 2 }),
      h3: ctx.editor.isActive("heading", { level: 3 }),
      bold: ctx.editor.isActive("bold"),
      italic: ctx.editor.isActive("italic"),
      strike: ctx.editor.isActive("strike"),
      alignLeft: ctx.editor.isActive({ textAlign: "left" }),
      alignCenter: ctx.editor.isActive({ textAlign: "center" }),
      alignRight: ctx.editor.isActive({ textAlign: "right" }),
      bullet: ctx.editor.isActive("bulletList"),
      ordered: ctx.editor.isActive("orderedList"),
      highlight: ctx.editor.isActive("highlight"),
    }),
  });

  const options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editorState.h1,
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editorState.h2,
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editorState.h3,
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editorState.bold,
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editorState.italic,
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editorState.strike,
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editorState.alignLeft,
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editorState.alignCenter,
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editorState.alignRight,
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editorState.bullet,
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editorState.ordered,
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editorState.highlight,
    },
  ];

  const setFontSize = (size: string) => {
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  };

  const unsetFontSize = () => {
    editor.chain().focus().unsetMark("textStyle").run();
  };

  const setFontFamily = (font: string) => {
    editor.chain().focus().setFontFamily(font).run();
  };

  const setFontColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const unsetFontColor = () => {
    editor.chain().focus().unsetColor().run();
  };

  const fonts = [
    { label: "Default", value: "" },
    { label: "Arial", value: "Arial" },
    { label: "Roboto", value: "Roboto" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Montserrat", value: "Montserrat" },
  ];

  const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"];

  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <div className="flex items-center gap-2 l">
        <div
          className="bg-green-100 w-fit px-3 py-2 rounded-sm hover:bg-green-200 active:bg-green-300 
      transition-colors cursor-pointer"
        >
          <FaRegImages className="text-green-600 text-xl" />
        </div>
        <div
          className="bg-indigo-100 w-fit px-3 py-2 rounded-sm hover:bg-indigo-200 active:bg-indigo-300 
      transition-colors cursor-pointer"
        >
          <FaLink className="text-indigo-600 text-xl" />
        </div>
        <div
          className="bg-yellow-100 w-fit px-3 py-2 rounded-sm hover:bg-yellow-200 active:bg-yellow-300 
      transition-colors cursor-pointer"
        >
          <BsFillLightningChargeFill className="text-yellow-500 text-xl" />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          {/* Font Family */}
          <select
            className="px-2 py-1 text-sm border rounded"
            onChange={(e) => setFontFamily(e.target.value)}
            defaultValue=""
          >
            {fonts.map((f) => (
              <option key={f.label} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          {/* Font Size */}
          <select
            className="px-2 py-1 text-sm border rounded"
            onChange={(e) => setFontSize(e.target.value)}
            defaultValue="16px"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <input
            type="color"
            className="w-8 h-8 p-0 border rounded cursor-pointer"
            onChange={(e) => setFontColor(e.target.value)}
            title="Text color"
          />

          {/* Existing buttons */}
          {options.map((option, index) => (
            <div
              key={index}
              onClick={option.onClick}
              className={`${textFormatStyle} ${
                option.pressed ? "bg-blue-200" : "hover:bg-slate-200"
              }`}
            >
              {option.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;

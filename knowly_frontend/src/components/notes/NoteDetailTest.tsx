import { useEffect, useRef, useState } from "react";

const NoteDetailTest = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<string>("");

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const handleInput = () => {
    setContent(editorRef.current?.innerHTML || "");
  };

  useEffect(() => {
    if (editorRef.current && content === "") {
      editorRef.current.innerHTML = "";
    }
  }, []);

  return (
    <div className="bg-background-primary w-full h-full rounded-xl p-5 shadow-sm flex flex-col gap-3">
      
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b pb-2">
        <ToolbarButton label="B" onClick={() => exec("bold")} />
        <ToolbarButton label="I" onClick={() => exec("italic")} />
        <ToolbarButton label="U" onClick={() => exec("underline")} />

        <Divider />

        <ToolbarButton label="H1" onClick={() => exec("formatBlock", "h1")} />
        <ToolbarButton label="H2" onClick={() => exec("formatBlock", "h2")} />
        <ToolbarButton label="Quote" onClick={() => exec("formatBlock", "blockquote")} />

        <Divider />

        <ToolbarButton label="• List" onClick={() => exec("insertUnorderedList")} />
        <ToolbarButton label="1. List" onClick={() => exec("insertOrderedList")} />

        <Divider />

        <ToolbarButton label="Undo" onClick={() => exec("undo")} />
        <ToolbarButton label="Redo" onClick={() => exec("redo")} />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="flex-1 overflow-y-auto outline-none text-sm leading-relaxed
                   prose prose-sm max-w-none
                   [&_h1]:text-2xl [&_h1]:font-bold
                   [&_h2]:text-xl [&_h2]:font-semibold
                   [&_blockquote]:border-l-4 [&_blockquote]:pl-3 [&_blockquote]:italic
                   empty:before:content-['Start_writing...']
                   empty:before:text-text-secondary
                   empty:before:pointer-events-none"
      />

      {/* Debug / Save preview (có thể bỏ) */}
      <div className="text-xs text-text-secondary border-t pt-2">
        Characters: {content.replace(/<[^>]+>/g, "").length}
      </div>
    </div>
  );
};

const ToolbarButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className="px-2 py-1 text-xs rounded-md
               bg-background-secondary hover:bg-background-hover
               border border-border"
  >
    {label}
  </button>
);

const Divider = () => (
  <span className="w-px bg-border mx-1" />
);

export default NoteDetailTest;

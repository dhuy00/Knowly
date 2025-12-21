import React, { useRef } from "react";

const TextEditor = ({ editorRef }: { editorRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      className="w-full min-h-[120px] outline-none text-text-secondary"
      placeholder="Your text here..."
    />
  );
};

export default TextEditor;

import React from "react";

type TextEditorProps = {
  editorRef: React.RefObject<HTMLDivElement | null>;
};

const TextEditor = ({ editorRef }: TextEditorProps) => {

  const handleInput = () => {
    const element = editorRef?.current;
    if (!element) return;

    const text = element.innerText.replace(/\n/g, "").trim();

    if (text === "") {
      element.classList.add("is-empty");
    } else {
      element.classList.remove("is-empty");
    }
  };

  return (
    <div
      ref={editorRef}
      onInput={handleInput}
      contentEditable
      suppressContentEditableWarning
      className="editor is-empty w-full outline-none text-text-secondary max-h-[400px] overflow-y-auto
      prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold 
      [&_blockquote]:border-l-4 [&_blockquote]:pl-3 [&_blockquote]:italic "
      data-placeholder="Your text here..."
    />
  );
};

export default TextEditor;

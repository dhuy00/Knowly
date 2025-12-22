import React, { useRef } from "react";

const TextEditor = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto"; // reset
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      placeholder="Your text here..."
      className="w-full min-h-[120px] outline-none text-primary resize-none overflow-hidden"
    />
  );
};

export default TextEditor;

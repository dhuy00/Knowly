import React, { useState, type Dispatch, type SetStateAction } from "react";
import type { TextFormat } from "../../types/note";

type TextEditorProps = {
  editorRef: React.RefObject<HTMLDivElement | null>;
  currentFormat: TextFormat;
  setCurrentFormat: Dispatch<SetStateAction<TextFormat>>;
};

const TextEditor = ({
  editorRef,
  currentFormat,
  setCurrentFormat,
}: TextEditorProps) => {
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

  function getParentsUntil(
    element: HTMLElement,
    stopId: string
  ): HTMLElement[] {
    const parents: HTMLElement[] = [];
    let current = element.parentElement;

    while (current && current.id !== stopId) {
      parents.push(current);
      current = current.parentElement;
    }

    return parents;
  }

  const handleOnclick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLElement;
    console.log("Element: ", element)
    const parents = getParentsUntil(element, "editor-root");
    console.log("Parents: ", parents)

    console.log(parents.map(p => p.tagName));

    // if (tagName.toLowerCase() == "b") {
    //   setCurrentFormat((prev) => ({
    //     ...prev,
    //     bold: true,
    //   }));
    // }
  };

  return (
    <div
      ref={editorRef}
      onInput={handleInput}
      onClick={(event) => handleOnclick(event)}
      id="editor-root"
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

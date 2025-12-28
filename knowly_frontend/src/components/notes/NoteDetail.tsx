import React, { useState } from "react";
import { TbBackground } from "react-icons/tb";
import coverImg from "../../assets/cover.jpg";
import Toolbar from "./Toolbar";
import TextEditor from "./TextEditor";
import type { TextFormat } from "../../types/note";

const NoteDetail = () => {
  const [hasCover, setHasCover] = useState(false);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [currentFormat, setCurrentFormat] = useState<TextFormat>({
    bold: false,
    italic: false,
    quote: false,
    underline: false  
  })

  const format = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  return (
    <div className="bg-background-primary w-full h-full rounded-xl py-12 shadow-sm overflow-hidden 
    px-24 relative flex flex-col gap-4">
      {hasCover ? (
        <img
          src={coverImg}
          alt="cover-img"
          className="w-full object-cover h-[150px] absolute inset-0"
        />
      ) : (
        <div className="flex text-text-secondary items-center gap-2">
          <TbBackground className="text-2xl"/>
          <span className=" font-medium">Add a cover...</span>
        </div>
      )}
      <input type="text" placeholder="New post title here..." 
      className="text-[1.75rem] font-semibold text-text-secondary focus:outline-none"/>
      <div className="text-text-secondary font-medium flex gap-2 text-sm items-center">
        <span>Related Task: </span>
        <button 
          className="bg-button-primary text-white text-sm px-4 py-1 rounded-sm hover:bg-button-primary-hover
          active:bg-button-primary-active transition-color cursor-pointer"
        >
          Add
        </button>
        </div>
      <div>
        {/* <Toolbar format={format} currentFormat={currentFormat} /> */}
      </div>
      <div className="max-h-[200px]">
        <TextEditor editorRef={editorRef} currentFormat={currentFormat} setCurrentFormat={setCurrentFormat}/>
      </div>
    </div>
  );
};

export default NoteDetail;

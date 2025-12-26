import React, { useState, type Dispatch, type SetStateAction } from "react";
import { FaRegImages } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FiBold } from "react-icons/fi";
import { RiItalic } from "react-icons/ri";
import { BsTypeUnderline } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { GoListOrdered } from "react-icons/go";
import { AiOutlineUnorderedList } from "react-icons/ai";
import FontSizeSelect from "./FontSizeSelect";
import type { TextFormat } from "../../types/note";

type ToolbarProps = {
  format: (command: string, value?: string) => void;
  currentFormat: TextFormat;
};

const Toolbar = ({ format, currentFormat }: ToolbarProps) => {
  const textFormatStyle = `px-1.5 py-1.5 rounded-sm text-primary hover:bg-blue-200 cursor-pointer`
  const [number, setNumber] = useState<number[] | string[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const handleFormat = (event: React.MouseEvent<HTMLDivElement>, command: string, value?: string) => {
    event.preventDefault();
    format(command, value);
  }

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
        <div className={`${textFormatStyle} ${currentFormat.bold ? 'bg-blue-200' : ''}`} onMouseDown={(event) => {handleFormat(event, "bold")}}>
          <FiBold />
        </div>
        <div className={`${textFormatStyle} ${currentFormat.italic ? 'bg-blue-200' : ''}`} onMouseDown={(event) => {handleFormat(event, "italic")}}>
          <RiItalic />
        </div>
        <div className={`${textFormatStyle} ${currentFormat.underline ? 'bg-blue-200' : ''}`} onMouseDown={(event) => {handleFormat(event, "underline")}}>
          <BsTypeUnderline />
        </div>
        <div className={`${textFormatStyle} ${currentFormat.quote ? 'bg-blue-200' : ''}`} onMouseDown={(event) => {handleFormat(event, "formatBlock", "blockquote")}}>
          <RiDoubleQuotesL />
        </div>
        <div className={`${textFormatStyle}`} onMouseDown={(event) => {handleFormat(event, "code")}}>
          <FaCode />
        </div>
        <div className={`${textFormatStyle}`} onMouseDown={(event) => {handleFormat(event, "insertOrderedList")}}>
          <GoListOrdered />
        </div>
        <div className={`${textFormatStyle}`} onMouseDown={(event) => {handleFormat(event, "insertUnorderedList")}}>
          <AiOutlineUnorderedList />
        </div>
        <FontSizeSelect options={number} value="5"/>
      </div>
    </div>
  );
};

export default Toolbar;

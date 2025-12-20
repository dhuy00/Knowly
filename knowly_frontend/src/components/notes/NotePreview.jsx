import React from "react";
import PriorityTag from "./PriorityTag";
import { FaRegCalendar } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";


const NotePreview = ({openNoteDetail}) => {
  return (
    <div className="w-[260px] h-[300px] rounded-lg shadow-around p-2 flex flex-col gap-1
    hover:shadow-around-md hover:-translate-y-1 transition-all">
      <div className="flex gap-1 items-center">
        <PriorityTag />
        <p className="text-text-secondary font-medium text-small ">
          Psychological Review
        </p>
      </div>
      <h3 className="font-semibold hover:underline cursor-pointer" onClick={openNoteDetail}>
        Bowers and David
      </h3>
      <div className="text-[13px] font-medium text-text-secondary line-clamp-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged
      </div>
      <div className="flex justify-between mt-auto items-center">
        <div className="flex gap-2 items-center">
          <FaRegCalendar />
          <span className="text-small font-medium text-text-primary">
            20/12/2025
          </span>
        </div>
        <span className="text-xl text-red-500 hover:bg-red-100 p-1 rounded-sm cursor-pointer active:bg-red-200">
          <MdOutlineDelete />
        </span>
      </div>
    </div>
  );
};

export default NotePreview;

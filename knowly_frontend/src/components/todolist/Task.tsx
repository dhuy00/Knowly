import React, { useEffect, useState } from "react";
import Date from "../common/Date";
import eventBus from "../../utils/eventBus";
import { EVENT_OPEN_TASK_DETAIL } from "../../constant/event";
import { IoMenu } from "react-icons/io5";

const Task = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const isDraggingStyle = 'bg-gray-200 opacity-50'
  const isDragOverStyle = 'outline outline-2 outline-dashed outline-gray-400 border-transparent bg-gray-100'

  const openTaskDetail = () => {
    eventBus.emit(EVENT_OPEN_TASK_DETAIL, true);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "task-id-1");
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setIsDragOver(false);
  };

  const handleDragEnter = (e) => {
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  useEffect(() => {
    console.log("Is drag over: ", isDragOver)
  }, [isDragOver])

  return (
    <div className={`task-item min-h-20 rounded-lg border p-2 border-border-secondary 
    flex justify-between items-center transition-all ${isDragging ? isDraggingStyle : ''} 
    ${isDragOver ? isDragOverStyle : ''}`}
    draggable 
    onDragStart={handleDragStart} 
    onDragEnd={handleDragEnd}
    onDragLeave={handleDragLeave}
    onDragEnter={handleDragEnter}
    >
      <div className="flex flex-col justify-center gap-1">
        <span
          className="font-medium hover:underline cursor-pointer"
          onClick={openTaskDetail}
        >
          Coding UI for banking system project
        </span>
        <div className="flex gap-2 text-text-secondary">
          <Date />
          <span>-</span>
          <Date />
        </div>
      </div>
      <div>
        <IoMenu className="text-[20px] text-text-secondary cursor-grab mr-2" />
      </div>
    </div>
  );
};

export default Task;

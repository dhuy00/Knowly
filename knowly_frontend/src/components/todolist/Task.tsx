import React from "react";
import Date from "../common/Date";
import eventBus from "../../utils/eventBus";
import { EVENT_OPEN_TASK_DETAIL } from "../../constant/event";

const Task = () => {
  const openTaskDetail = () => {
    eventBus.emit(EVENT_OPEN_TASK_DETAIL, true)
  }
  
  return (
    <div className="min-h-20 rounded-lg border p-2 border-border-secondary flex flex-col justify-center gap-1">
      <span className="font-medium hover:underline cursor-pointer" onClick={openTaskDetail}>Coding UI for banking system project</span>
      <div className="flex gap-2 text-text-secondary">
        <Date />
        <span>-</span>
        <Date />
      </div>
    </div>
  );
};

export default Task;

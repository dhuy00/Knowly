import React from "react";
import Dialog from "../common/Dialog";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import type { Option } from "../../types/task";

interface TaskInfo {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface AddTaskProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  taskInfo: TaskInfo;
  priorities: Option[];
  statuses: Option[];
}

const AddTaskForm: React.FC<AddTaskProps> = ({
  open,
  setOpen,
  taskInfo,
  priorities,
  statuses,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title="Create a new task"
    >
      <InputField label="Task name" value={taskInfo.name} type="text" />
      <InputField
        label="Description"
        value={taskInfo.description}
        type="textarea"
        rows={5}
      />
      <SelectField
        label="Priority"
        options={priorities}
        placeholder="Choose a priority"
        className="mt-4"
      />
      <SelectField
        label="Status"
        options={statuses}
        placeholder="Choose a status"
        className="mt-4"
      />
      <div className="flex gap-4 justify-between">
        <InputField
          label="Start date"
          value={taskInfo.startDate}
          type="date"
          className="py-2 w-54"
        />
        <InputField
          label="End date"
          value={taskInfo.endDate}
          type="date"
          className="py-2 w-54"
        />
      </div>
      <div className="flex gap-2 text-common mt-4 justify-center">
        <button
          className="border-text-primary-hover border-2 px-10 py-1.5 rounded-sm 
          font-semibold text-text-primary-hover cursor-pointer hover:bg-sidebar-item-background
          active:bg-sidebar-item-active-background transition-colors"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-button-primary px-12 py-1.5 text-white rounded-sm
          font-semibold cursor-pointer hover:bg-button-primary-hover active:bg-button-primary-active
          transition-colors"
        >
          Save
        </button>
      </div>
    </Dialog>
  );
};

export default AddTaskForm;

import { React, useState } from 'react'
import InputField from '../../components/common/InputField'
import SelectField from '../../components/common/SelectField'
import Dialog from '../../components/common/Dialog'
import Divider from '../../components/common/Divider'

const TodoList = () => {
  const [taskInfo, setTaskInfo] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: ""
  })

  const [priorities, setPriorities] = useState([
    {
      name: "High",
      backgroundColor: '#FFF0F0',
      textColor: "#FF0000"
    },
    {
      name: "Medium",
      backgroundColor: '#F0F8FF',
      textColor: "#5365DC"
    },
    {
      name: "Low",
      backgroundColor: '#FFFDE3',
      textColor: "#9BA30E"
    },
  ])

  const [statuses, setStatuses] = useState([
    {
      name: "Overdue",
      backgroundColor: '#FFF0F0',
      textColor: "#FF0000"
    },
    {
      name: "Done",
      backgroundColor: '#F0F8FF',
      textColor: "#5365DC"
    },
    {
      name: "IN progress",
      backgroundColor: '#FFFDE3',
      textColor: "#9BA30E"
    },
  ])

  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setOpen(true)}
      >
        Open Dialog
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Create a new task"
      >
        <InputField label='Task name' value={taskInfo.name} type='text' />
        <InputField label='Description' value={taskInfo.description} type='textarea' rows={5} />
        <SelectField label='Priority' options={priorities} />
        <SelectField label='Status' options={statuses} />
        <div className='flex gap-4 justify-between'>
          <InputField label='Start date' value={taskInfo.startDate} type='date' className='py-2 w-54' />
          <InputField label='End date' value={taskInfo.endDate} type='date' className='py-2 w-54' />
        </div>
        <div className='flex gap-2 text-common mt-4 justify-center'>
          <button className='border-text-primary-hover border-2 px-10 py-1.5 rounded-lg 
          font-semibold text-text-primary-hover cursor-pointer hover:bg-sidebar-item-background
          active:bg-sidebar-item-active-background transition-colors'
          onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button className='bg-button-primary px-12 py-1.5 text-white rounded-lg 
          font-semibold cursor-pointer hover:bg-button-primary-hover active:bg-button-primary-active
          transition-colors'>
            Save
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default TodoList

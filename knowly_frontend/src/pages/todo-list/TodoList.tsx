import { React, useState } from 'react'
import InputField from '../../components/common/InputField'
import SelectField from '../../components/common/SelectField'
import Dialog from '../../components/common/Dialog'
import Searchbar from '../../components/common/Searchbar'
import { IoMdSettings } from "react-icons/io";
import { MdFilterAlt } from "react-icons/md";
import { RiExpandDiagonal2Line } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import Category from '../../components/todolist/Category'


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

  const [projects, setProjects] = useState([
    {
      name: "All project",
    },
    {
      name: "Overdue",
    },
    {
      name: "Done",
    },
    {
      name: "IN progress",
    },
  ])

  const [searchKeyword, setSearchKeyword] = useState<string>("")

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background-primary w-full h-full rounded-xl p-5 shadow-sm">
      <div className='flex gap-4'>
        <h3 className='font-bold text-text-primary text-2xl'>You have
          <span className='text-text-primary-active'> 7 task </span>
          today
        </h3>
        <button className='flex justify-center items-center gap-1 text-common font-medium 
      bg-button-primary text-white px-4 py-1.5 rounded-md hover:bg-button-primary-hover 
      active:bg-button-primary-active'>
          <CgAddR />
          <span>
            Add new
          </span>
        </button>
      </div>

      <div className='flex gap-4 mt-4'>
        <SelectField options={projects} placeholder='Choose a project' className='margin-0 w-54' />
        <Searchbar value={searchKeyword} className='w-[700px]' />
        <div className='flex gap-3 text-xl justify-center items-center text-text-secondary '>
          <span className='p-1 rounded-md hover:bg-background-hover-secondary'><IoMdSettings /></span>
          <span className='p-1 rounded-md hover:bg-background-hover-secondary'><MdFilterAlt /></span>
          <span className='p-1 rounded-md hover:bg-background-hover-secondary'><RiExpandDiagonal2Line /></span>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Create a new task"
      >
        <InputField label='Task name' value={taskInfo.name} type='text' />
        <InputField label='Description' value={taskInfo.description} type='textarea' rows={5} />
        <SelectField label='Priority' options={priorities} placeholder='Choose a priority' className='mt-4' />
        <SelectField label='Status' options={statuses} placeholder='Choose a status' className='mt-4' />
        <div className='flex gap-4 justify-between'>
          <InputField label='Start date' value={taskInfo.startDate} type='date' className='py-2 w-54' />
          <InputField label='End date' value={taskInfo.endDate} type='date' className='py-2 w-54' />
        </div>
        <div className='flex gap-2 text-common mt-4 justify-center'>
          <button className='border-text-primary-hover border-2 px-10 py-1.5 rounded-sm 
          font-semibold text-text-primary-hover cursor-pointer hover:bg-sidebar-item-background
          active:bg-sidebar-item-active-background transition-colors'
            onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button className='bg-button-primary px-12 py-1.5 text-white rounded-sm
          font-semibold cursor-pointer hover:bg-button-primary-hover active:bg-button-primary-active
          transition-colors'>
            Save
          </button>
        </div>
      </Dialog>

      <div className='mt-12'>
        <Category/>
      </div>
    </div>
  );
}

export default TodoList

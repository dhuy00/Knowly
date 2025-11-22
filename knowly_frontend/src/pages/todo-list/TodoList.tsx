import {React, useState} from 'react'
import InputField from '../../components/common/InputField'
import SelectField from '../../components/common/SelectField'

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

  return (
    <div className='bg-background-primary w-full h-full rounded-xl p-5 shadow-sm'>
      <h2 className='text-2xl font-semibold'>Create a new task to do</h2>
      <InputField label='Task name' value={taskInfo.name} type='text'/>
      <InputField label='Description' value={taskInfo.description} type='textarea' rows={5}/>
      <div className='flex gap-12'>
        <SelectField label='Priority' options={priorities}/>
        <SelectField label='Status' options={statuses}/>
        <InputField label='Start date' value={taskInfo.startDate} type='date' className='py-2 w-48'/>
        <InputField label='End date' value={taskInfo.endDate} type='date' className='py-2 w-48'/>
      </div>
      <div className='flex gap-4'>
        <button>Clear</button>
        <button className='bg-text-primary-hover px-8 py-1.5 text-white rounded-lg font-semibold'>Save</button>
      </div>
    </div>
  )
}

export default TodoList

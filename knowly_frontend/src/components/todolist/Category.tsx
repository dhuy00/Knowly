import React from 'react'
import Task from './Task'

const Category = () => {
  return (
    <div className='shrink-0 w-[400px] h-[500px] rounded-xl border-2 border-red-600 overflow-hidden text-common'>
      <h3 className='pl-4 py-2 bg-red-100 text-red-600 font-semibold'>In progress</h3>
      <div className='p-2 flex flex-col gap-4 overflow-y-scroll max-h-[450px]'>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
      </div>
    </div>
  )
}

export default Category

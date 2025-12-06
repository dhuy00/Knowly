import React from 'react'
import { FaRegCalendarMinus } from "react-icons/fa";

const Date = () => {
  return (
    <div className='flex items-center gap-2'>
      <FaRegCalendarMinus className='text-md'/>
      <span className='text-sm'>12/03/2025</span>
    </div>
  )
}

export default Date

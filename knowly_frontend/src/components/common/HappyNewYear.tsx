import React from 'react'

const HappyNewYear = () => {
  return (
    <div className='bg-[#FAF8E7] h-full flex justify-center items-center'>
      <div className='flex flex-col'>
        <span className='text-lg font-bold tracking-[15px] text-[#047790]'>HAPPY</span>
        <span className='text-[10rem] font-bold leading-none text-[#D3B037]'>20</span>
        <span className='text-lg font-bold tracking-[15px] text-[#047790]'>NEW YEAR</span>
      </div>
      <div className='flex flex-col text-[10rem] leading-none font-bold max-h-[250px] overflow-hidden'>
        <span className='text-[#D3B037]'>26</span>
        <span className='text-[#047790]'>25</span>
      </div>
    </div>
  )
}

export default HappyNewYear

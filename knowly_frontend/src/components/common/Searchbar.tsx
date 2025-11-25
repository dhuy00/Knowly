import React from 'react'
import { IoSearch } from "react-icons/io5";

interface SearchbarProps {
  value: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  className?: string,
  placeholder?: string
}

const Searchbar: React.FC<SearchbarProps> = ({ value, onChange, className, placeholder }) => {
  return (
    <div className='flex'>
      <input
        type='text'
  
        placeholder={placeholder}
        onChange={onChange}
        className={`border-2 border-border-secondary rounded-s-md px-2 py-1 outline-none text-common ${className}`} />
      <span className='flex justify-center items-center px-2 py-1 border-2 border-border-secondary 
      rounded-e-md border-l-0 hover:bg-background-hover-primary cursor-pointer 
      active:bg-background-active-primary'>
        <IoSearch className='text-2xl text-text-secondary' />
      </span>
    </div>
  )
}

export default Searchbar

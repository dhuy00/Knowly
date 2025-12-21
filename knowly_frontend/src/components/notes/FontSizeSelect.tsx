import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import type { Option } from "../../types/task";

interface SelectFieldProps {
  value?: number | string,
  options: number[] | string [],
  className?: string
}

const FontSizeSelect: React.FC<SelectFieldProps> = ({ value, options, className }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string|number>("")

  const handleToggleOptions = (value?: string | number | null) => {
    setShowOptions(!showOptions)

    if (value) setSelectedValue(value)
  }

  return (
    <div className={`flex flex-col gap-2 text-common relative ${className}`}>
      <div>
        <div className={`flex items-center gap-2 border border-border-secondary
        w-12 justify-center h-7 rounded-sm hover:bg-background-hover-primary`}
          onClick={() => handleToggleOptions(null)}>
          <label>{value ? value : ''}</label>
          <FaAngleDown className={`${showOptions ? 'rotate-180' : ''} transition-all`} />
        </div>
        <div className={`absolute bg-white max-h-64 overflow-y-auto flex flex-col border border-border-secondary rounded-md 
          mt-2 overflow-hidden no-scrollbar ${showOptions ? '' : 'h-0 border-none'} w-full z-10`}>
          {
            options.map((item, index) => (
              <div className={`py-2 px-2 font-medium 
              hover:bg-background-hover-primary text-center`}
                onClick={() => handleToggleOptions(item)}>
                <span className="rounded-full">{item}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default FontSizeSelect;

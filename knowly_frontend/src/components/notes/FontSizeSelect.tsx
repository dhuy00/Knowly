import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface SelectFieldProps {
  value?: number | string,
  options: number[],
  className?: string,
  setValue:  (value: number) => void
}

const FontSizeSelect: React.FC<SelectFieldProps> = ({ value, options, className, setValue }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const handleToggleOptions = (selectedValue?: number) => {
    setShowOptions(!showOptions)

    if (selectedValue) setValue(selectedValue)
  }

  return (
    <div className={`flex flex-col gap-2 text-common relative ${className}`}>
      <div>
        <div className={`flex items-center gap-2 border border-border-secondary
        w-12 justify-center h-8 rounded-sm hover:bg-background-hover-primary`}
        onClick={() => setShowOptions(!showOptions)}>
          <label>{value ? value : ''}</label>
          <FaAngleDown className={`${showOptions ? 'rotate-180' : ''} transition-all`} />
        </div>
        <div className={`absolute bg-white max-h-64 overflow-y-auto flex flex-col border border-border-secondary rounded-md 
          mt-2 overflow-hidden no-scrollbar ${showOptions ? '' : 'h-0 border-none'} w-full z-10`}>
          {
            options.map((item) => (
              <div className={`py-2 px-2 font-medium 
              hover:bg-background-hover-primary text-center cursor-pointer`}
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

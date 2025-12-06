import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import type { Option } from "../../types/task";

interface SelectFieldProps {
  label?: string,
  options: Option[],
  placeholder: string,
  className?: string
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, placeholder, className }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string>("")

  const handleToggleOptions = (value?: string | null) => {
    setShowOptions(!showOptions)

    if (value) setSelectedValue(value)
  }

  return (
    <div className={`flex flex-col gap-2 text-common relative ${className}`}>
      {
        label && (<label className="font-medium">{label}</label>)
      }
      <div>
        <div className="flex items-center gap-4 border border-border-secondary
        justify-between px-4 py-2 rounded-md hover:bg-background-hover-primary"
          onClick={() => handleToggleOptions(null)}>
          <label>{selectedValue ? selectedValue : placeholder}</label>
          <FaAngleDown className={`${showOptions ? 'rotate-180' : ''} transition-all`} />
        </div>
        <div className={`absolute bg-white max-h-64 overflow-y-auto flex flex-col border border-border-secondary rounded-md 
          mt-2 overflow-hidden ${showOptions ? '' : 'h-0 border-none'} w-full z-10`}>
          {
            options.map((item, index) => (
              <div style={{ color: item.textColor }} className={`py-2 px-2 font-medium 
              hover:bg-background-hover-primary`}
                onClick={() => handleToggleOptions(item.name)}>
                <span style={{ background: item.backgroundColor }} className=" px-4 py-1 rounded-full">{item.name}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SelectField;

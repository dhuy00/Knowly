import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const Selection = ({
  options,
  open,
  setOpen,
  handleSelect,
  CurrentValue,
}) => {
  return (
    <div className="flex flex-col w-fit gap-1">
      <div
        className="border flex gap-2 justify-between border-stone-400 pl-2 pr-1 py-1
              rounded-xs cursor-pointer"
        onClick={setOpen}
      >
        <CurrentValue size={15} />
        <IoIosArrowDown
          className={`text-xs transition ${open ? "-rotate-180" : ""} `}
        />
      </div>
      {open && (
        <div className=" border flex flex-col border-stone-400 rounded-xs cursor-pointer">
          {options.map((option, index) => {
            const Icon = option.component;
            return (
              <span
                className="flex py-1 hover:bg-stone-200 pl-2 pr-1"
                onClick={() => handleSelect(option.id)}
              >
                <Icon key={index} size={15} />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selection;

import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

type UserOptionProps = {
  avatar: string;
  name: string;
};

const UserOption = ({ avatar, name }: UserOptionProps) => {
  return (
    <div className="flex items-center justify-between hover:bg-gray-900 px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
        <div className="text-sm text-gray-400 font-medium">{name}</div>
      </div>
    </div>
  );
};

const AssigneeSelection = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const userList = [
    {
      id: 0,
      avatar: "",
      name: "Vo Duc Huy",
    },
    {
      id: 0,
      avatar: "",
      name: "Vo Duc Huy",
    },
    {
      id: 0,
      avatar: "",
      name: "Vo Duc Huy",
    },
    {
      id: 0,
      avatar: "",
      name: "Vo Duc Huy",
    },
  ];

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
    console.log("Catch event")
  };

  return (
    <div className="relative">
      <div
        className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-gray-400 text-sm
        w-[560px] px-4 py-3 flex justify-between items-center"
        onClick={handleDropdown}
      >
        <div>Select a user</div>
        <IoChevronDownOutline className={`text-[15px] transition ${openDropdown ? 'rotate-180' : ''}`} />
      </div>
      {openDropdown && (
        <div
          className="w-[560px] bg-[#0F0F0F] border border-[#2A2A2A] absolute -top-[10px] 
      -translate-y-[100%] rounded-lg flex flex-col"
        >
          {userList.map((item) => (
            <UserOption avatar={item.avatar} name={item.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssigneeSelection;

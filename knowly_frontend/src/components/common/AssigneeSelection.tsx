import React, { useState } from "react";
import {
  IoChevronDownOutline,
  IoClose,
  IoCheckbox,
  IoSquareOutline,
} from "react-icons/io5";

type User = {
  id: number;
  avatar: string;
  name: string;
};

type UserOptionProps = {
  user: User;
  selected: boolean;
  onSelect: (user: User) => void;
};

const UserOption = ({
  user,
  selected,
  onSelect,
}: UserOptionProps) => {
  return (
    <div
      onClick={() => onSelect(user)}
      className={`flex items-center justify-between px-4 py-3 cursor-pointer transition
      hover:bg-gray-900 ${
        selected ? "bg-gray-900" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>

        <div className="text-sm text-gray-300 font-medium">
          {user.name}
        </div>
      </div>

      {/* CHECKBOX */}
      <div className="text-lg text-emerald-400">
        {selected ? (
          <IoCheckbox />
        ) : (
          <IoSquareOutline className="text-gray-500" />
        )}
      </div>
    </div>
  );
};

const AssigneeSelection = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const userList: User[] = [
    {
      id: 1,
      avatar: "",
      name: "Vo Duc Huy",
    },
    {
      id: 2,
      avatar: "",
      name: "Nguyen Van A",
    },
    {
      id: 3,
      avatar: "",
      name: "Tran Thi B",
    },
    {
      id: 4,
      avatar: "",
      name: "Le Van C",
    },
  ];

  const handleSelectUser = (user: User) => {
    const isSelected = selectedUsers.some(
      (item) => item.id === user.id
    );

    if (isSelected) {
      setSelectedUsers((prev) =>
        prev.filter((item) => item.id !== user.id)
      );
    } else {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const removeUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="relative w-[560px]">
      {/* DROPDOWN */}
      {openDropdown && (
        <div
          className="w-full bg-[#0F0F0F] border border-[#2A2A2A]
          absolute bottom-[110%] left-0 rounded-lg flex flex-col
          overflow-hidden z-50 shadow-xl"
        >
          {userList.map((user) => (
            <UserOption
              key={user.id}
              user={user}
              selected={selectedUsers.some(
                (item) => item.id === user.id
              )}
              onSelect={handleSelectUser}
            />
          ))}
        </div>
      )}

      {/* SELECT BOX */}
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="min-h-[60px] bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg
        px-4 py-3 flex justify-between items-center gap-3 cursor-pointer"
      >
        {/* SELECTED USERS */}
        <div className="flex flex-wrap gap-2 flex-1">
          {selectedUsers.length === 0 ? (
            <div className="text-sm text-gray-400">
              Select users
            </div>
          ) : (
            selectedUsers.map((user) => (
              <div
                key={user.id}
                className="bg-gray-900 border border-[#2A2A2A]
                px-3 py-1 rounded-md flex items-center gap-2"
              >
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>

                <span className="text-sm text-gray-300">
                  {user.name}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeUser(user.id);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <IoClose size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ICON */}
        <IoChevronDownOutline
          className={`text-[15px] text-gray-400 transition mt-1 ${
            openDropdown ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default AssigneeSelection;
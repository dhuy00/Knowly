import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { FiChevronRight } from "react-icons/fi";

const mockTasks = [
  {
    id: 1,
    title: "Project Setup",
    status: "In Progress",
    priority: "High",
    children: [
      {
        id: 11,
        title: "Setup Repo",
        status: "Done",
        priority: "Low",
      },
      {
        id: 12,
        title: "Setup CI",
        status: "Todo",
        priority: "Medium",
        children: [
          {
            id: 121,
            title: "Github Actions",
            status: "Todo",
            priority: "Low",
          },
          {
            id: 122,
            title: "Unit Test",
            status: "Todo",
            priority: "Medium",
            children: [
              {
                id: 1221,
                title: "Test API",
                status: "Todo",
                priority: "Low",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Implement Auth",
    status: "Todo",
    priority: "High",
  },
];

const TaskList = () => {
  const [open, setOpen] = useState({});

  const toggle = (id) => {
    setOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTasks = (tasks, level = 0, parentNumber = "") => {
    return tasks.map((task, index) => {
      const number = parentNumber
        ? `${parentNumber}.${index + 1}`
        : `${index + 1}`;

      return (
        <React.Fragment key={task.id}>
          <div className="grid grid-cols-6 items-center px-4 py-3 text-sm hover:bg-gray-50 transition">
            {/* ISSUE */}
            <div
              className="col-span-4 flex items-center gap-2"
              style={{ paddingLeft: `${level * 16}px` }}
            >
              {task.children && (
                <button
                  onClick={() => toggle(task.id)}
                  className="text-gray-400 cursor-pointer"
                >
                  <FiChevronRight
                    size={16}
                    className={`transition-transform ${
                      open[task.id] ? "rotate-90" : ""
                    }`}
                  />
                </button>
              )}

              <span className="text-gray-400 text-xs hover:underline cursor-pointer">Issue #{number}</span>

              <span className="font-medium text-gray-800">{task.title}</span>
            </div>

            {/* STATUS */}
            <div>
              <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {task.status}
              </span>
            </div>

            {/* PRIORITY */}
            <div>
              <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded-full">
                {task.priority}
              </span>
            </div>
          </div>

          {task.children &&
            open[task.id] &&
            renderTasks(task.children, level + 1, number)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="bg-white rounded-md p-6 border border-gray-200">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-sm font-semibold text-gray-800">Tasks</h2>

        <button className="text-xs bg-text-primary-hover text-white px-3 py-2 rounded-md hover:bg-text-primary-active transition">
          New Task
        </button>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-6 text-xs font-medium text-gray-500 px-4 pb-3 border-b border-gray-100">
        <div className="col-span-4">Issue</div>
        <div>Status</div>
        <div>Priority</div>
      </div>

      {/* TABLE BODY */}
      <div className="divide-y divide-gray-100">{renderTasks(mockTasks)}</div>
    </div>
  );
};

export default TaskList;

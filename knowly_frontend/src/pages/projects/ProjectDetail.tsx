import React from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiPaperclip,
  FiUsers,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProjectDetail = () => {
  const navigate = useNavigate();

  const project = {
    name: "Task Management Platform",
    description:
      "A collaborative platform that allows teams to manage projects, track issues, monitor progress and collaborate efficiently.",
    progress: 64,
    estimate: "120h",
    spent: "74h",
    start: "12 Mar 2026",
    due: "30 Apr 2026",
    members: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3",
      "https://i.pravatar.cc/40?img=4",
    ],
  };

  const tasks = [
    {
      title: "Design login UI",
      status: "In Progress",
      priority: "High",
      assignee: "Huy",
      estimate: "6h",
      spent: "3h",
    },
    {
      title: "Implement authentication API",
      status: "Todo",
      priority: "Medium",
      assignee: "Minh",
      estimate: "10h",
      spent: "0h",
    },
    {
      title: "Setup database schema",
      status: "Done",
      priority: "Low",
      assignee: "An",
      estimate: "5h",
      spent: "5h",
    },
  ];

  const documents = [
    { name: "Project_Specification.pdf", size: "2.1MB" },
    { name: "Database_Design.png", size: "540KB" },
    { name: "UI_Mockup.fig", size: "1.3MB" },
  ];

  return (
    <div className="w-full h-full p-6 overflow-auto bg-background-primary">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            <p className="text-gray-500 text-sm">Last updated 2 hours ago</p>
          </div>
        </div>

        {/* MEMBERS */}
        <div className="flex -space-x-2">
          {project.members.map((m, i) => (
            <img
              key={i}
              src={m}
              className="w-8 h-8 rounded-full border border-white"
            />
          ))}
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-4 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-3 space-y-6">
          {/* DESCRIPTION */}
          <div className="bg-white/70 backdrop-blur rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-2 flex items-center gap-2">
              <FiFileText />
              Description
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* PROGRESS */}
          <div className="bg-white/70 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium">Progress</span>
              <span>{project.progress}%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* TASK LIST */}
          <div className="bg-white/80 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Tasks</h2>

              <button className="text-sm bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition">
                + New Task
              </button>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-6 text-xs text-gray-500 px-3 pb-2">
              <div className="col-span-2">Issue</div>
              <div>Status</div>
              <div>Priority</div>
              <div>Estimate</div>
              <div>Spent</div>
            </div>

            <div className="space-y-1">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 items-center text-sm px-3 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="col-span-2 font-medium">{task.title}</div>

                  <div>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {task.status}
                    </span>
                  </div>

                  <div className="text-gray-600">{task.priority}</div>

                  <div className="text-gray-600">{task.estimate}</div>

                  <div className="text-gray-600">{task.spent}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white/70 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <FiPaperclip />
                Documents
              </h2>

              <button className="text-sm text-blue-500 hover:underline">
                Upload
              </button>
            </div>

            <div className="space-y-3">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-md">
                      <FiFileText size={16} />
                    </div>

                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                  </div>

                  <button className="text-xs text-gray-500 hover:text-black">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">
          {/* PROJECT INFO */}
          <div className="bg-white/70 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-4 text-sm">Project Info</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Start</span>
                <span>{project.start}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Due date</span>
                <span>{project.due}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Estimate</span>
                <span>{project.estimate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Spent</span>
                <span>{project.spent}</span>
              </div>
            </div>
          </div>

          {/* TIME TRACKING */}
          <div className="bg-white/70 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <FiClock />
              Time Tracking
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated</span>
                <span>{project.estimate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Spent</span>
                <span>{project.spent}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Remaining</span>
                <span>46h</span>
              </div>
            </div>
          </div>

          {/* TEAM */}
          <div className="bg-white/70 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <FiUsers />
              Team
            </h2>

            <div className="space-y-3">
              {project.members.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={m} className="w-7 h-7 rounded-full" />

                  <span className="text-sm">Member {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

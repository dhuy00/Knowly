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
import { MdUpload } from "react-icons/md";
import MemberList from "./MemberList";
import Description from "./Description";

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
    <div className="w-full h-full overflow-auto bg-background-primary rounded-xl p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-sm hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-lg font-semibold">{project.name}</h1>
            <p className="text-gray-500 text-xs">Last updated 2 hours ago</p>
          </div>
        </div>

        {/* MEMBERS */}
        <MemberList members={project.members}/>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-4 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-3 space-y-6">
          {/* DESCRIPTION */}
          <Description description={project.description}/>

          {/* TASK LIST */}
          <div className="bg-white rounded-md p-6 border border-gray-200">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-gray-800">Tasks</h2>

              <button
                className="text-xs bg-text-primary-hover text-white px-3 py-2 rounded-md 
              hover:bg-text-primary-active transition font-medium cursor-pointer"
              >
                New Task
              </button>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-6 text-xs font-medium text-gray-500 px-4 pb-3 border-b border-gray-100">
              <div className="col-span-2">Issue</div>
              <div>Status</div>
              <div>Priority</div>
              <div>Estimate</div>
              <div>Spent</div>
            </div>

            {/* TABLE BODY */}
            <div className="divide-y divide-gray-100">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 items-center px-4 py-4 text-sm hover:bg-gray-50 transition"
                >
                  {/* ISSUE */}
                  <div className="col-span-2 font-medium text-gray-800">
                    {task.title}
                  </div>

                  {/* STATUS */}
                  <div>
                    <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full">
                      {task.status}
                    </span>
                  </div>

                  {/* PRIORITY */}
                  <div>
                    <span className="text-xs font-medium bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
                      {task.priority}
                    </span>
                  </div>

                  {/* ESTIMATE */}
                  <div className="text-gray-600">{task.estimate}</div>

                  {/* SPENT */}
                  <div className="text-gray-600">{task.spent}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white/70 rounded-md p-5 border border-gray-200">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2 text-sm">
                <FiPaperclip />
                Documents
              </h2>

              <button
                className="text-xs text-white bg-text-primary-hover hover:bg-text-primary-active
              cursor-pointer flex gap-1 justify-center items-center px-3 py-1.5 rounded-sm"
              >
                <MdUpload />
                <span className="no-underline">Upload</span>
              </button>
            </div>

            <div className="space-y-3">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-md">
                      <FiFileText size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-medium">{doc.name}</p>
                      <p className="text-[10px] text-gray-500">{doc.size}</p>
                    </div>
                  </div>

                  <button
                    className="text-xs text-gray-500 font-semibold hover:underline
                  hover:text-text-primary-hover cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">
          {/* PROGRESS */}
          <div className="bg-white/70 rounded-md p-5 border border-gray-200">
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

          {/* PROJECT INFO */}
          <div className="bg-white/70 rounded-md p-5 border-gray-200 border">
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
          <div className="bg-white/70 rounded-md p-5 border border-gray-200">
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
          <div className="bg-white/70 rounded-md p-5 border border-gray-200">
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

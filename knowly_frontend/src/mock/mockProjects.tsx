import { FaRocket, FaDatabase, FaCloud } from "react-icons/fa";

export const projectsData = [
  {
    id: 1,
    name: "Task Management Platform",
    description:
      "A collaborative workspace to manage tasks, sprints and team productivity.",
    icon: <FaRocket className="text-purple-500 text-xl" />,
    status: "Active",
    priority: "High",
    members: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3",
    ],
    tasks: 120,
    completed: 80,
    progress: 67,
    due: "2026-04-12",
  },
  {
    id: 2,
    name: "Weather Analytics",
    description:
      "Visualizing global weather datasets with charts and time-series analysis.",
    icon: <FaCloud className="text-blue-500 text-xl" />,
    status: "Planning",
    priority: "Medium",
    members: [
      "https://i.pravatar.cc/40?img=4",
      "https://i.pravatar.cc/40?img=5",
    ],
    tasks: 60,
    completed: 20,
    progress: 33,
    due: "2026-05-01",
  },
  {
    id: 3,
    name: "Book Management API",
    description:
      "ASP.NET Core Web API for book catalog and inventory management.",
    icon: <FaDatabase className="text-green-500 text-xl" />,
    status: "Completed",
    priority: "Low",
    members: [
      "https://i.pravatar.cc/40?img=6",
      "https://i.pravatar.cc/40?img=7",
      "https://i.pravatar.cc/40?img=8",
      "https://i.pravatar.cc/40?img=9",
    ],
    tasks: 40,
    completed: 40,
    progress: 100,
    due: "2026-02-20",
  },
  {
    id: 4,
    name: "Book Management API",
    description:
      "ASP.NET Core Web API for book catalog and inventory management.",
    icon: <FaDatabase className="text-green-500 text-xl" />,
    status: "Completed",
    priority: "Low",
    members: [
      "https://i.pravatar.cc/40?img=6",
      "https://i.pravatar.cc/40?img=7",
      "https://i.pravatar.cc/40?img=8",
      "https://i.pravatar.cc/40?img=9",
    ],
    tasks: 40,
    completed: 40,
    progress: 100,
    due: "2026-02-20",
  },
];
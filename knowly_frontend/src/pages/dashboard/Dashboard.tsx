import { Link } from "react-router";
import { Flame, Calendar, ArrowUpRight, Award, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  mockProjects,
  mockTasks,
  mockTimeEntries,
  mockGoals,
  currentUser,
} from "../../mock/mockData";
import Header from "../../components/dashboard/Header";
import Weekly from "../../components/dashboard/Weekly";

const Dashboard = () => {
  // Calculate statistics
  const myTasks = mockTasks.filter((t) => t.assignees.includes(currentUser.id));
  const tasksDone = myTasks.filter((t) => t.status === "done").length;

  // Time tracking stats
  const todayEntries = mockTimeEntries.filter((e) => {
    const entryDate = new Date(e.startTime);
    const today = new Date();
    return entryDate.toDateString() === today.toDateString();
  });
  const todayHours =
    todayEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;

  const weekEntries = mockTimeEntries.filter((e) => {
    const entryDate = new Date(e.startTime);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  });
  const weekHours = weekEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;

  // Weekly activity data
  const weeklyData = [
    { day: "Mon", hours: 7.5, tasks: 3 },
    { day: "Tue", hours: 8.2, tasks: 5 },
    { day: "Wed", hours: 6.8, tasks: 4 },
    { day: "Thu", hours: 9.1, tasks: 6 },
    { day: "Fri", hours: 7.3, tasks: 4 },
    { day: "Sat", hours: 2.5, tasks: 1 },
    { day: "Sun", hours: 1.2, tasks: 1 },
  ];

  // Project progress data
  const projectData = mockProjects.slice(0, 5).map((p) => ({
    name: p.identifier,
    planned: p.estimateTime,
    actual: p.spentTime,
    efficiency: Math.round((p.spentTime / p.estimateTime) * 100),
  }));

  // Get greeting based on time

  // Calculate productivity score
  const productivityScore = Math.min(
    Math.round(
      (tasksDone / Math.max(myTasks.length, 1)) * 100 + (todayHours / 8) * 20,
    ),
    100,
  );

  return (
    <div className="min-h-full bg-[#0F0F0F]">
      <div className="max-w-[1800px] mx-auto p-6 space-y-6">
        {/* Hero Header with Gradient */}
        <Header />

        {/* Main Content - Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            {/* Weekly Activity - Enhanced */}
            <Weekly/>

            {/* Project Progress */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    Project Time Utilization
                  </h2>
                  <p className="text-sm text-gray-500">
                    Planned vs actual time spent
                  </p>
                </div>
                <Link
                  to="/projects"
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-medium"
                >
                  View all
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid #2A2A2A",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="planned"
                    fill="#4A5568"
                    name="Planned"
                    radius={[8, 8, 0, 0]}
                    barSize={80}
                  />
                  <Bar
                    dataKey="actual"
                    fill="#10b981"
                    name="Actual"
                    radius={[8, 8, 0, 0]}
                    barSize={80}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - 4 cols */}
          <div className="lg:col-span-4 space-y-6">


            {/* Active Goals */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="size-5 text-orange-400" />
                <h2 className="text-lg font-semibold text-white">
                  Active Goals
                </h2>
              </div>
              <div className="space-y-4">
                {mockGoals.slice(0, 3).map((goal) => {
                  const progress = (goal.currentHours / goal.targetHours) * 100;
                  return (
                    <div key={goal.id}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm text-white mb-1 font-medium">
                            {goal.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {goal.currentHours.toLocaleString()} /{" "}
                            {goal.targetHours.toLocaleString()}h
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-emerald-400">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all rounded-full"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                to="/time-tracking"
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2A2A2A] text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 transition text-sm font-medium"
              >
                View all goals
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">
                Recent Tasks
              </h2>
              <p className="text-sm text-gray-500">
                Your latest assignments across all projects
              </p>
            </div>
            <Link
              to="/my-work"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-medium"
            >
              View all
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {myTasks.slice(0, 6).map((task) => {
              const statusColors = {
                backlog: "bg-gray-500/20 text-gray-400",
                todo: "bg-gray-500/20 text-gray-400",
                "in-progress": "bg-emerald-500/20 text-emerald-400",
                "in-review": "bg-yellow-500/20 text-yellow-400",
                done: "bg-green-500/20 text-green-400",
                cancelled: "bg-red-500/20 text-red-400",
              };

              const priorityColors = {
                urgent: "border-red-500",
                high: "border-orange-500",
                medium: "border-yellow-500",
                low: "border-gray-500",
              };

              return (
                <Link
                  key={task.id}
                  to={`/projects/${mockProjects.find((p) => p.tasks.some((t) => t.id === task.id))?.id}`}
                  className={`block border-l-2 ${priorityColors[task.priority]} bg-[#0F0F0F] rounded-xl p-4 hover:bg-[#252525] transition group`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500 font-mono">
                          {task.identifier}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${statusColors[task.status]}`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <p className="text-sm text-white font-medium group-hover:text-emerald-400 transition line-clamp-2">
                        {task.name}
                      </p>
                    </div>
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="size-3" />
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">
                Active Projects
              </h2>
              <p className="text-sm text-gray-500">
                Track progress across your ongoing work
              </p>
            </div>
            <Link
              to="/projects"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-medium"
            >
              View all projects
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProjects
              .filter((p) => p.status === "active")
              .map((project) => {
                const progress =
                  (project.spentTime / project.estimateTime) * 100;
                const completedTasks = project.tasks.filter(
                  (t) => t.status === "done",
                ).length;

                return (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="block bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-5 hover:border-emerald-500/50 transition group"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-3xl">{project.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold mb-1 truncate group-hover:text-emerald-400 transition">
                          {project.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">
                          {project.identifier}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs text-gray-500 mb-3">
                      <div className="flex items-center justify-between">
                        <span>
                          {completedTasks} / {project.tasks.length} tasks
                        </span>
                        <span className="text-emerald-400 font-medium">
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Time spent</span>
                        <span>
                          {project.spentTime}h / {project.estimateTime}h
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

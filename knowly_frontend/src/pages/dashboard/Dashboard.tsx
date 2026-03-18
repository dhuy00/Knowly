import { Link } from "react-router";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  Target,
  Flame,
  Calendar,
  ArrowUpRight,
  Zap,
  Activity,
  Award,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { mockProjects, mockTasks, mockTimeEntries, mockGoals, currentUser } from "../../mock/mockData";

const Dashboard = () => {
  // Calculate statistics
  const myTasks = mockTasks.filter((t) => t.assignees.includes(currentUser.id));
  const tasksInProgress = myTasks.filter((t) => t.status === "in-progress").length;
  const tasksDone = myTasks.filter((t) => t.status === "done").length;
  const tasksOverdue = myTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
  ).length;

  // Time tracking stats
  const todayEntries = mockTimeEntries.filter((e) => {
    const entryDate = new Date(e.startTime);
    const today = new Date();
    return entryDate.toDateString() === today.toDateString();
  });
  const todayHours = todayEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;
  
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

  const stats = [
    {
      label: "Hours Today",
      value: todayHours.toFixed(1),
      change: "+12%",
      trend: "up",
      icon: Clock,
      color: "emerald",
    },
    {
      label: "Active Tasks",
      value: tasksInProgress,
      change: "+3",
      trend: "up",
      icon: Activity,
      color: "emerald",
    },
    {
      label: "Completed",
      value: tasksDone,
      change: "+8",
      trend: "up",
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      label: "Overdue",
      value: tasksOverdue,
      change: "-2",
      trend: "down",
      icon: AlertCircle,
      color: "red",
    },
  ];

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Calculate productivity score
  const productivityScore = Math.min(
    Math.round((tasksDone / Math.max(myTasks.length, 1)) * 100 + (todayHours / 8) * 20),
    100
  );

  return (
    <div className="min-h-full bg-[#0F0F0F]">
      <div className="max-w-[1800px] mx-auto p-6 space-y-6">
        {/* Hero Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-[#1A1A1A] to-[#1A1A1A] border border-emerald-500/20 rounded-2xl p-8">
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-0" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="size-6 text-emerald-400" />
                <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider">
                  Command Center
                </p>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {getGreeting()}, {currentUser.name.split(" ")[0]}
              </h1>
              <p className="text-gray-400 text-base">
                You're crushing it today with {tasksDone} completed tasks and {todayHours.toFixed(1)} hours tracked
              </p>
            </div>

            {/* Compact Stats Ribbon */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat, index) => {
                const isPositive = stat.trend === "up" && stat.color === "emerald";
                const isNegative = stat.trend === "up" && stat.color === "red";
                
                return (
                  <div
                    key={index}
                    className="bg-[#0F0F0F]/60 backdrop-blur border border-[#2A2A2A] rounded-xl p-3 min-w-[120px]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${
                        stat.color === "emerald" 
                          ? "bg-emerald-500/10 text-emerald-400" 
                          : "bg-red-500/10 text-red-400"
                      } flex items-center justify-center`}>
                        <stat.icon className="size-4" />
                      </div>
                      <div className={`flex items-center gap-0.5 text-xs ${
                        stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {stat.trend === "up" ? (
                          <TrendingUp className="size-3" />
                        ) : (
                          <TrendingDown className="size-3" />
                        )}
                        <span className="font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content - Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            {/* Weekly Activity - Enhanced */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="size-5 text-emerald-400" />
                    <h2 className="text-xl font-semibold text-white">Weekly Performance</h2>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="text-emerald-400 font-medium">{weekHours.toFixed(1)} hours</span> tracked across {weeklyData.reduce((sum, d) => sum + d.tasks, 0)} tasks
                  </p>
                </div>
                <select className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl text-gray-400 text-sm px-4 py-2 outline-none focus:border-emerald-500/50 transition">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid #2A2A2A",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorHours)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Project Progress */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Project Time Utilization</h2>
                  <p className="text-sm text-gray-500">Planned vs actual time spent</p>
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
                    contentStyle={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid #2A2A2A",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="planned" fill="#4A5568" name="Planned" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="actual" fill="#10b981" name="Actual" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* Productivity Score */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-[#1A1A1A] border border-emerald-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="size-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Productivity Score</h2>
              </div>
              
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#2A2A2A"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(productivityScore / 100) * 351.86} 351.86`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-4xl font-bold text-white">{productivityScore}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-400">
                {productivityScore >= 80 ? "Outstanding performance! 🔥" : 
                 productivityScore >= 60 ? "Great work today! 💪" : 
                 "Keep pushing forward! 🚀"}
              </p>
            </div>

            {/* Active Goals */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="size-5 text-orange-400" />
                <h2 className="text-lg font-semibold text-white">Active Goals</h2>
              </div>
              <div className="space-y-4">
                {mockGoals.slice(0, 3).map((goal) => {
                  const progress = (goal.currentHours / goal.targetHours) * 100;
                  return (
                    <div key={goal.id}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm text-white mb-1 font-medium">{goal.title}</p>
                          <p className="text-xs text-gray-500">
                            {goal.currentHours.toLocaleString()} / {goal.targetHours.toLocaleString()}h
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-emerald-400">{progress.toFixed(0)}%</span>
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
              <h2 className="text-xl font-semibold text-white mb-1">Recent Tasks</h2>
              <p className="text-sm text-gray-500">Your latest assignments across all projects</p>
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
                "backlog": "bg-gray-500/20 text-gray-400",
                "todo": "bg-gray-500/20 text-gray-400",
                "in-progress": "bg-emerald-500/20 text-emerald-400",
                "in-review": "bg-yellow-500/20 text-yellow-400",
                "done": "bg-green-500/20 text-green-400",
                "cancelled": "bg-red-500/20 text-red-400",
              };

              const priorityColors = {
                "urgent": "border-red-500",
                "high": "border-orange-500",
                "medium": "border-yellow-500",
                "low": "border-gray-500",
              };

              return (
                <Link
                  key={task.id}
                  to={`/projects/${mockProjects.find(p => p.tasks.some(t => t.id === task.id))?.id}`}
                  className={`block border-l-2 ${priorityColors[task.priority]} bg-[#0F0F0F] rounded-xl p-4 hover:bg-[#252525] transition group`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500 font-mono">{task.identifier}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>
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
                      {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
              <h2 className="text-xl font-semibold text-white mb-1">Active Projects</h2>
              <p className="text-sm text-gray-500">Track progress across your ongoing work</p>
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
            {mockProjects.filter(p => p.status === "active").map((project) => {
              const progress = (project.spentTime / project.estimateTime) * 100;
              const completedTasks = project.tasks.filter(t => t.status === "done").length;

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
                      <p className="text-xs text-gray-500 font-mono">{project.identifier}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-gray-500 mb-3">
                    <div className="flex items-center justify-between">
                      <span>{completedTasks} / {project.tasks.length} tasks</span>
                      <span className="text-emerald-400 font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Time spent</span>
                      <span>{project.spentTime}h / {project.estimateTime}h</span>
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
}

export default Dashboard
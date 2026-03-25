import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { mockProjects } from "../../mock/mockData";
import Header from "../../components/dashboard/Header";
import Weekly from "../../components/dashboard/Weekly";
import ProjectProgress from "../../components/dashboard/ProjectProgress";
import ActiveGoals from "../../components/dashboard/ActiveGoals";
import RecentTask from "../../components/dashboard/RecentTask";

const Dashboard = () => {
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
            <Weekly />

            {/* Project Progress */}
            <ProjectProgress />
          </div>

          {/* Right Column - 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Goals */}
            <ActiveGoals />

            {/* Recent Tasks */}
            <RecentTask />
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

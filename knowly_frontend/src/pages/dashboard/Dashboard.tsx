import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { mockProjects } from "../../mock/mockData";
import Header from "../../components/dashboard/Header";
import Weekly from "../../components/dashboard/Weekly";
import ProjectProgress from "../../components/dashboard/ProjectProgress";
import ActiveGoals from "../../components/dashboard/ActiveGoals";
import RecentTask from "../../components/dashboard/RecentTask";
import ActiveProject from "../../components/dashboard/ActiveProject";

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
        <ActiveProject/>
      </div>
    </div>
  );
};

export default Dashboard;

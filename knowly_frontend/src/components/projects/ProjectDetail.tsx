import { useState } from "react";
import { useParams, Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Edit3,
  Save,
  Plus,
  Calendar,
  Clock,
  Users,
  Target,
  Activity,
  FileText,
  Settings,
  MoreVertical,
  MessageSquare,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockProjects, mockUsers, mockTimeEntries, mockSprints } from "../../mock/mockData";
import ProjectHeader from "./detail/ProjectHeader";
import ProjectDetailTab from "./detail/ProjectDetailTab";
import ProjectOverview from "./detail/ProjectOverview";
import ProjectTask from "./detail/ProjectTask";
import ProjectBoard from "./detail/ProjectBoard";

const ProjectDetail = () => {
  const projectId = "3";
  const project = mockProjects.find((p) => p.id === projectId);
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "board" | "timeline">("overview");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(project?.description || "");

  if (!project) {
    console.log(projectId)
    return (
      <div className="min-h-full bg-[#0F0F0F] flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  const progress = (project.spentTime / project.estimateTime) * 100;
  const completedTasks = project.tasks.filter(t => t.status === "done").length;
  const lead = mockUsers.find(u => u.id === project.lead);

  // Time spent per task type
  const taskTypeData = [
    { type: "Feature", hours: project.tasks.filter(t => t.type === "feature").reduce((sum, t) => sum + t.spentTime, 0) },
    { type: "Bug", hours: project.tasks.filter(t => t.type === "bug").reduce((sum, t) => sum + t.spentTime, 0) },
    { type: "Task", hours: project.tasks.filter(t => t.type === "task").reduce((sum, t) => sum + t.spentTime, 0) },
  ].filter(d => d.hours > 0);

  // Active sprint
  const activeSprint = mockSprints.find(s => s.status === "active" && s.projectId === project.id);

  const statusColors = {
    "backlog": "bg-gray-500/10 text-gray-400",
    "todo": "bg-gray-500/10 text-gray-400",
    "in-progress": "bg-blue-500/10 text-blue-400",
    "in-review": "bg-yellow-500/10 text-yellow-400",
    "done": "bg-green-500/10 text-green-400",
    "cancelled": "bg-red-500/10 text-red-400",
  };

  const priorityColors = {
    "urgent": "border-l-red-500",
    "high": "border-l-orange-500",
    "medium": "border-l-yellow-500",
    "low": "border-l-gray-500",
  };

  const typeColors = {
    "task": "bg-blue-500/10 text-blue-400",
    "bug": "bg-red-500/10 text-red-400",
    "feature": "bg-purple-500/10 text-purple-400",
    "epic": "bg-green-500/10 text-green-400",
  };

  return (
    <div className="min-h-full bg-[#0F0F0F]">
      <div className="max-w-[1800px] mx-auto p-6 space-y-6">
        {/* Breadcrumb */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>

        {/* Overview */}
        <ProjectHeader/>

        {/* Tabs */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-md">
          <ProjectDetailTab activeTab={activeTab} setActiveTab={setActiveTab}/>

          <div className="px-6 py-4">
            {activeTab === "overview" && (
              <ProjectOverview/>
            )}

            {activeTab === "tasks" && (
              <ProjectTask/>
            )}

            {activeTab === "board" && (
              <ProjectBoard/>
            )}

            {activeTab === "timeline" && (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="size-12 mx-auto mb-4 opacity-50" />
                <p>Timeline view coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail

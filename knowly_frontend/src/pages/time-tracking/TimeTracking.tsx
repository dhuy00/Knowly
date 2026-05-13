import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Square,
  Clock,
  Calendar,
  Tag,
  DollarSign,
  Download,
  Filter,
  Plus,
  Music,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize2,
  TrendingUp,
  Target,
  Timer,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { mockTimeEntries, mockTasks, mockProjects, mockGoals, currentUser } from "../../mock/mockData";
import Stats from "../../components/time-tracking/Stats";
import TimerTracking from "../../components/time-tracking/Timer";
import TimeByProject from "../../components/time-tracking/TimeByProject";
import MusicPlayer from "../../components/time-tracking/MusicPlayer";

const TimeTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  const [selectedTask, setSelectedTask] = useState("");
  const [description, setDescription] = useState("");
  const [isBillable, setIsBillable] = useState(true);
  const [activeTab, setActiveTab] = useState<"timer" | "manual" | "history">("timer");
  
  // Music player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(65);
  const [isExpanded, setIsExpanded] = useState(false);

  const playlist = [
    { title: "Deep Focus", artist: "Lofi Beats", duration: "3:45", genre: "Lofi" },
    { title: "Concentration Mode", artist: "Study Music", duration: "4:20", genre: "Ambient" },
    { title: "Flow State", artist: "Productivity Sounds", duration: "3:30", genre: "Electronic" },
    { title: "Code & Chill", artist: "Dev Beats", duration: "4:15", genre: "Lofi" },
    { title: "Late Night Work", artist: "Night Vibes", duration: "3:55", genre: "Jazz" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  // Calculate statistics
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

  const billableHours = mockTimeEntries.filter(e => e.billable).reduce((sum, e) => sum + e.duration, 0) / 3600;

  // Project breakdown
  const projectBreakdown = mockProjects.map(p => {
    const projectEntries = mockTimeEntries.filter(e => e.projectId === p.id);
    const hours = projectEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;
    return { name: p.identifier, hours, color: p.color };
  }).filter(p => p.hours > 0);

  const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

  return (
    <div className="min-h-full bg-[#0F0F0F]">
      <div className="max-w-[1800px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-semibold text-emerald-400 mb-1">Time Tracking</h1>
            <p className="text-gray-500 text-sm">Track and manage your time across projects</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border 
          border-[#2A2A2A] text-gray-400 hover:text-white hover:border-emerald-500 
          transition rounded-sm text-sm">
            <Download className="size-4" />
            Export Report
          </button>
        </div>

        {/* Stats */}
        <Stats/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer Section */}
          <TimerTracking/>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Music Player */}
            <MusicPlayer/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeTracking
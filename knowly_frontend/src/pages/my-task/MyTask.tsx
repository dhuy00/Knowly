import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  ChevronDown,
  Circle,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Plus,
} from "lucide-react";
import { mockTasks, mockProjects, currentUser, mockUsers } from "../../mock/mockData";
import { TaskItem } from "../../components/my-task/TaskItem";
import { TaskFormModal } from "../../components/my-task/TaskFormModal";
import type { Task } from "../../types/task";
import Header from "../../components/my-task/Header";
import FilterBar from "../../components/my-task/FilterBar";

export function MyTask() {
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const myTasks = mockTasks.filter((t) => t.assignees.includes(currentUser.id));

  const filteredTasks = myTasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.identifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTask = (taskData: Partial<Task>) => {
    console.log("Creating task:", taskData);
    // In real app, this would call an API
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log("Deleting task:", taskId);
    // In real app, this would call an API
  };

  const statusIcons = {
    "backlog": Circle,
    "todo": Circle,
    "in-progress": AlertCircle,
    "in-review": Clock,
    "done": CheckCircle2,
    "cancelled": XCircle,
  };

  const statusColors = {
    "backlog": "text-gray-500",
    "todo": "text-gray-400",
    "in-progress": "text-blue-400",
    "in-review": "text-yellow-400",
    "done": "text-green-400",
    "cancelled": "text-red-400",
  };

  const priorityColors = {
    "urgent": "bg-red-500/10 text-red-400 border-red-500/20",
    "high": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "medium": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "low": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  const typeColors = {
    "task": "bg-blue-500/10 text-blue-400",
    "bug": "bg-red-500/10 text-red-400",
    "feature": "bg-purple-500/10 text-purple-400",
    "epic": "bg-green-500/10 text-green-400",
  };

  const groupedByStatus = {
    "backlog": filteredTasks.filter(t => t.status === "backlog"),
    "todo": filteredTasks.filter(t => t.status === "todo"),
    "in-progress": filteredTasks.filter(t => t.status === "in-progress"),
    "in-review": filteredTasks.filter(t => t.status === "in-review"),
    "done": filteredTasks.filter(t => t.status === "done"),
  };

  return (
    <div className="min-h-full bg-[#0F0F0F]">
      <div className="max-w-[1800px] mx-auto p-6 space-y-6">
        {/* Header */}
        <Header/>

        {/* Filters */}
        <FilterBar/>

        {/* Content */}
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
            {filteredTasks.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No tasks found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(groupedByStatus).map(([status, tasks]) => (
              <div key={status} className="bg-[#1A1A1A] border border-[#2A2A2A]/50 rounded-2xl overflow-hidden">
                <div className="border-b border-[#2A2A2A]/50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white capitalize">{status.replace("-", " ")}</span>
                    <span className="px-2 py-0.5 bg-[#2A2A2A] text-gray-400 text-xs rounded-full">
                      {tasks.length}
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-3 min-h-[200px]">
                  {tasks.map((task) => {
                    const project = mockProjects.find(p => p.tasks.some(t => t.id === task.id));
                    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";

                    return (
                      <Link
                        key={task.id}
                        to={`/projects/${project?.id}`}
                        className="block bg-[#0F0F0F] border border-[#2A2A2A]/50 hover:border-emerald-500/30 rounded-xl p-3 transition"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-xs text-gray-500">{task.identifier}</span>
                          <span className={`px-2 py-0.5 text-xs rounded-md ${typeColors[task.type]}`}>
                            {task.type}
                          </span>
                        </div>
                        <p className="text-sm text-white mb-2 line-clamp-2">{task.name}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span className={`px-2 py-0.5 border rounded-md ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                          {task.dueDate && (
                            <span className={isOverdue ? "text-red-400" : ""}>
                              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {task.assignees.slice(0, 3).map((assigneeId) => {
                            const user = mockUsers.find(u => u.id === assigneeId);
                            return (
                              <img
                                key={assigneeId}
                                src={user?.avatar}
                                alt={user?.name}
                                className="w-6 h-6 rounded-md"
                                title={user?.name}
                              />
                            );
                          })}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={isTaskFormOpen}
        onClose={() => {
          setIsTaskFormOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={handleCreateTask}
        initialTask={editingTask}
      />
    </div>
  );
}
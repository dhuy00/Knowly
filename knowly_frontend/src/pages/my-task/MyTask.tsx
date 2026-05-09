import { useState } from "react";
import { TaskFormModal } from "../../components/my-task/TaskFormModal";
import type { Task } from "../../types/task";
import Header from "../../components/my-task/Header";
import FilterBar from "../../components/my-task/FilterBar";
import TaskList from "../../components/my-task/TaksList";
import TaskBoard from "../../components/my-task/TaskBoard";

export function MyTask() {
  const [viewMode, setViewMode] = useState<string>("list");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleCreateTask = (taskData: Partial<Task>) => {
    console.log("Creating task:", taskData);
    // In real app, this would call an API
  };

  return (
    <div className="min-h-full bg-[#0F0F0F]">
      <div className=" px-6 py-4 space-y-6">
        {/* Header */}
        <Header
          setIsTaskFormOpen={setIsTaskFormOpen}
          setEdittingTask={setEditingTask}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Filters */}
        {/* <FilterBar /> */}

        {/* Content */}
        {viewMode === "list" ? <TaskList /> : <TaskBoard />}
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

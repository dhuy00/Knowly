import React from "react";
import { mockTasks } from "../../mock/mockNav";
import { currentUser } from "../../mock/mockNav";
import { TaskItem } from "./TaskItem";
import { useState } from "react";

const TaksList = () => {
  const myTasks = mockTasks.filter((t) => t.assignees.includes(currentUser.id));
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const filteredTasks = myTasks;

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log("Deleting task:", taskId);
    // In real app, this would call an API
  };

  return (
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
  );
};

export default TaksList;

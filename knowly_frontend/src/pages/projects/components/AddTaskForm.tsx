import React, { useState } from "react";

const statusColor = {
  Todo: "bg-gray-100 text-gray-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Done: "bg-green-100 text-green-600",
};

const priorityColor = {
  Low: "bg-gray-100 text-gray-600",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-600",
};

const AddTaskForm = ({ tasks, setTasks, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    status: "Todo",
    priority: "Low",
    parentId: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // flatten tasks
  const flattenTasks = (tasks) => {
    let result = [];

    tasks.forEach((task) => {
      result.push(task);
      if (task.children) {
        result = result.concat(flattenTasks(task.children));
      }
    });

    return result;
  };

  // recursive add task
  const addTask = (tasks, parentId, newTask) => {
    return tasks.map((task) => {
      if (task.id === parentId) {
        return {
          ...task,
          children: [...(task.children || []), newTask],
        };
      }

      if (task.children) {
        return {
          ...task,
          children: addTask(task.children, parentId, newTask),
        };
      }

      return task;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title: form.title,
      status: form.status,
      priority: form.priority,
    };

    if (!form.parentId) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(addTask(tasks, Number(form.parentId), newTask));
    }

    setForm({
      title: "",
      status: "Todo",
      priority: "Low",
      parentId: "",
    });

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-6"
    >
      {/* TITLE */}
      <div>
        <label className="text-xs font-semibold text-gray-500">
          TASK TITLE
        </label>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title..."
          className="
          w-full mt-2
          px-4 py-2.5
          text-sm
          border border-gray-200
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition
          "
          required
        />
      </div>

      {/* STATUS + PRIORITY */}
      <div className="grid grid-cols-2 gap-4">
        {/* STATUS */}
        <div>
          <label className="text-xs font-semibold text-gray-500">
            STATUS
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
            w-full mt-2
            px-3 py-2.5
            text-sm
            border border-gray-200
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <div className="mt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[form.status]}`}
            >
              {form.status}
            </span>
          </div>
        </div>

        {/* PRIORITY */}
        <div>
          <label className="text-xs font-semibold text-gray-500">
            PRIORITY
          </label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="
            w-full mt-2
            px-3 py-2.5
            text-sm
            border border-gray-200
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="mt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColor[form.priority]}`}
            >
              {form.priority}
            </span>
          </div>
        </div>
      </div>

      {/* PARENT TASK */}
      <div>
        <label className="text-xs font-semibold text-gray-500">
          PARENT TASK
        </label>

        <select
          name="parentId"
          value={form.parentId}
          onChange={handleChange}
          className="
          w-full mt-2
          px-3 py-2.5
          text-sm
          border border-gray-200
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        >
          <option value="">No Parent (Top Level)</option>

          {flattenTasks(tasks).map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onClose}
          className="
          px-4 py-2
          text-sm
          border border-gray-200
          rounded-lg
          hover:bg-gray-50
          transition
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
          px-4 py-2
          text-sm
          text-white
          bg-blue-600
          rounded-lg
          hover:bg-blue-700
          transition
          "
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
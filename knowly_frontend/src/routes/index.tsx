import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import NotFound from "../pages/NotFound";

import Dashboard from "../pages/dashboard/Dashboard";
import TodoList from "../pages/todo-list/TodoList";
import Notes from "../pages/notes/Notes";
import Projects from "../pages/projects/Projects.js";
import Notifications from "../pages/notifications/Notifications";     
import Settings from "../pages/settings/Settings";
import Support from "../pages/support/Support";
import NoteDetail from "../components/notes/NoteDetail.js"
import TestDiagram from "../components/notes/TestDiagram.js";
import DiagramEditor from "../components/diagram/DiagramEditor.js";
import ProjectDetail from "../components/projects/ProjectDetail.js";
import Login from "../pages/login/Login.js";
import { MyTask } from "../pages/my-task/MyTask.js";
import TimeTracking from "../pages/time-tracking/TimeTracking.js";

import NoteDetail from "../components/notes/NoteDetail";
import TestDiagram from "../components/notes/TestDiagram";
import DiagramEditor from "../components/diagram/DiagramEditor";

import ProjectDetail from "../pages/projects/ProjectDetail";

import Login from "../pages/login/Login";
import Register from "../pages/login/Register";

import { MyTask } from "../pages/my-task/MyTask";

export const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "my-task",
        element: <MyTask />,
      },

      {
        path: "todo-list",
        element: <TodoList />,
      },

      {
        path: "notes",
        element: <Notes />,
      },

      {
        path: "notes/:id",
        element: <NoteDetail />,
      },

      {
        path: "notes/diagram/:id",
        element: <DiagramEditor />,
      },

      {
        path: "projects",
        element: <Projects />,
      },

      {
        path: "projects/:id",
        element: <ProjectDetail />,
      },

      {
        path: "notifications",
        element: <Notifications />,
      },

      {
        path: "settings",
        element: <Settings />,
      },

      {
        path: "support",
        element: <Support />,
      },

      {
        path: "diagram-test",
        element: <TestDiagram />,
      },
      {
        path: "time-tracking",
        element: (<TimeTracking />),
      },
    ],
  },

  // public routes
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
]);
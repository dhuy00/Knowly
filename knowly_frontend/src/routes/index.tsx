import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import NotFound from "../pages/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import TodoList from "../pages/todo-list/TodoList";
import Notes from "../pages/notes/Notes";
import Projects from "../pages/projects/Projects";
import Notifications from "../pages/notifications/Notifications";
import Settings from "../pages/settings/Settings";
import Support from "../pages/support/Support";
import NoteDetail from "../components/notes/NoteDetail.js"
import NoteDetailTest from "../components/notes/NoteDetailTest.js";
import HappyNewYear from "../components/common/HappyNewYear.js";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,

    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "dashboard",
        element: (<Dashboard />),
      },
      {
        path: "todo-list",
        element: (<TodoList />),
      },
      {
        path: "notes",
        element: (<Notes />),
      },
      {
        path: "notes/:id",
        element: (<NoteDetail />),
      },
      {
        path: "notes/:id/test",
        element: (<NoteDetailTest />),
      },
      {
        path: "projects",
        element: (<Projects />),
      },
      {
        path: "notifications",
        element: (<Notifications />),
      },
      {
        path: "settings",
        element: (<Settings />),
      },
      {
        path: "support",
        element: (<Support />),
      },
      {
        path: "happy-new-year",
        element: (<HappyNewYear  />),
      },
    ],
  },
]);

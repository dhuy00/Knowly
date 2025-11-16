import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const isAuthenticated = false; // fake, sau sẽ nối thật

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,

    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute isAuth={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

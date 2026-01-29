import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import { adminRoutes } from "./AdminRoutes";
import { publicRoutes } from "./PublicRoutes";
import { leaderRoutes } from "./LeaderRoutes";
import { teamRoutes } from "./TeamRoutes";
import NotFound from "@/pages/NotFound";
import { routesGenerator } from "@/utils/Generator/RoutesGenerator";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
// import { ProtectedRoute } from "./ProtectedRoutes";
// import { UserRole } from "@/types/dashboard.types";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...routesGenerator(publicRoutes),
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      // <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
        <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      ...routesGenerator(adminRoutes),
    ],
  },
  {
    path: "/leader",
    element: (
      // <ProtectedRoute allowedRoles={[UserRole.MAIN_LEADER, UserRole.CO_LEADER, UserRole.FRONTEND_LEADER, UserRole.BACKEND_LEADER, UserRole.PROJECT_LEAD]}>
        <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      ...routesGenerator(leaderRoutes),
    ],
  },
  {
    path: "/team",
    element: (
      // <ProtectedRoute allowedRoles={[UserRole.TEAM_MEMBER]}>
        <DashboardLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      ...routesGenerator(teamRoutes),
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;

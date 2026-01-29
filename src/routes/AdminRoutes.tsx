import {
  LayoutDashboard,
  Users,
  Building2,
  AlertTriangle,
  History,
  Settings as SettingsIcon,
  FolderKanban,
} from "lucide-react";

import Overview from "@/pages/Admin/Dashboard/Overview";
import Organizations from "@/pages/Admin/Organizations/Organizations";
import UserManagement from "@/pages/Admin/Users/UserManagement";
import Projects from "@/pages/Admin/Projects/Projects";

export const adminRoutes = [
  {
    group: "Operational",
    items: [
      {
        icon: <LayoutDashboard className="size-5" />,
        name: "Overview",
        path: "overview",
        element: <Overview />,
      },
      {
        icon: <Building2 className="size-5" />,
        name: "Organizations",
        path: "organizations",
        element: <Organizations />,
      },
      {
        icon: <Users className="size-5" />,
        name: "User Management",
        path: "users",
        element: <UserManagement />,
      },
      {
        icon: <FolderKanban className="size-5" />,
        name: "All Projects",
        path: "projects",
        element: <Projects />,
      },
    ],
  },
  {
    group: "System Monitoring",
    items: [
      {
        icon: <AlertTriangle className="size-5" />,
        name: "Incident Reports",
        path: "incidents",
        element: <Overview />, // Placeholder
      },
      {
        icon: <History className="size-5" />,
        name: "Activity Log",
        path: "logs",
        element: <Overview />, // Placeholder
      },
    ],
  },
  {
    group: "Configuration",
    items: [
      {
        icon: <SettingsIcon className="size-5" />,
        name: "Settings",
        path: "settings",
        element: <Overview />, // Placeholder
      },
    ],
  },
];

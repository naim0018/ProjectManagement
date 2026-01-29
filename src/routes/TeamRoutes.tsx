import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  History,
  Settings as SettingsIcon,
} from "lucide-react";

import TeamMemberDashboard from "@/pages/TeamMember/Dashboard/TeamMemberDashboard";

export const teamRoutes = [
  {
    group: "Personal",
    items: [
      {
        icon: <LayoutDashboard className="size-5" />,
        name: "My Workspace",
        path: "dashboard",
        element: <TeamMemberDashboard />,
      },
      {
        icon: <FolderKanban className="size-5" />,
        name: "My Projects",
        path: "projects",
        element: <TeamMemberDashboard />,
      },
      {
        icon: <MessageSquare className="size-5" />,
        name: "Reports & Issues",
        path: "reports",
        element: <TeamMemberDashboard />,
      },
    ],
  },
  {
    group: "Support",
    items: [
      {
        icon: <History className="size-5" />,
        name: "Personal Activity",
        path: "activity",
        element: <TeamMemberDashboard />,
      },
      {
        icon: <SettingsIcon className="size-5" />,
        name: "Profile Settings",
        path: "settings",
        element: <TeamMemberDashboard />,
      },
    ],
  },
];

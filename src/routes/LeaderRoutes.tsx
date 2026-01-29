import {
  LayoutDashboard,
  Users,
  Briefcase,
  AlertTriangle,
  History,
  Settings as SettingsIcon,
} from "lucide-react";

import LeadersDashboard from "@/pages/Leaders/Dashboard/LeadersDashboard";
import ProjectManagement from "@/pages/Leaders/ProjectManagement/ProjectManagement";
import TeamCoordination from "@/pages/Leaders/TeamCoordination/TeamCoordination";
import OrganizationIssues from "@/pages/Leaders/OrganizationIssues/OrganizationIssues";
import ActivityTimeline from "@/pages/Leaders/ActivityTimeline/ActivityTimeline";
import OrganizationSettings from "@/pages/Leaders/OrganizationSettings/OrganizationSettings";

export const leaderRoutes = [
  {
    group: "Operational",
    items: [
      {
        icon: <LayoutDashboard className="size-5" />,
        name: "Dashboard",
        path: "dashboard",
        element: <LeadersDashboard />,
      },
      {
        icon: <Briefcase className="size-5" />,
        name: "Project Management",
        path: "projects",
        element: <ProjectManagement />,
      },
      {
        icon: <Users className="size-5" />,
        name: "Team Coordination",
        path: "teams",
        element: <TeamCoordination />,
      },
    ],
  },
  {
    group: "Maintenance",
    items: [
      {
        icon: <AlertTriangle className="size-5" />,
        name: "Organization Issues",
        path: "issues",
        element: <OrganizationIssues />,
      },
      {
        icon: <History className="size-5" />,
        name: "Activity timeline",
        path: "timeline",
        element: <ActivityTimeline />,
      },
    ],
  },
  {
    group: "Configuration",
    items: [
      {
        icon: <SettingsIcon className="size-5" />,
        name: "Organization Settings",
        path: "settings",
        element: <OrganizationSettings />,
      },
    ],
  },
];

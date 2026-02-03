import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  History,
  Settings as SettingsIcon,
  Plus
} from "lucide-react";

import TeamMemberDashboard from "@/pages/TeamMember/Dashboard/TeamMemberDashboard";
import MyProjects from "@/pages/TeamMember/Projects/MyProjects";
import NewProjects from "@/pages/TeamMember/Projects/NewProjects";
import ProjectDetails from "@/pages/TeamMember/Projects/ProjectDetails";
import ReportsIssues from "@/pages/TeamMember/Reports/ReportsIssues";
import PersonalActivity from "@/pages/TeamMember/Activity/PersonalActivity";
import ProfileSettings from "@/pages/TeamMember/Settings/ProfileSettings";
import MyProjectContainer from "@/pages/TeamMember/Projects/MyProjectContainer";

export const teamRoutes = [
  {
    group: "My Workspace",
    items: [
      {
        icon: <LayoutDashboard className="size-5" />,
        name: "Dashboard",
        path: "dashboard",
        element: <TeamMemberDashboard />,
      },
      {
        icon: <Plus className="size-5" />,
        name: "New Project",
        path: "new-projects",
        element: <NewProjects />,
      },
      {
        icon: <FolderKanban className="size-5" />,
        name: "My Project",
        path: "projects",
        element: <MyProjectContainer />,
        children: [
          {
            index: true,
            element: <MyProjects />,
          },
          {
            path: "project-details/:id",
            element: <ProjectDetails />,
          },
        ],
      },
      {
        icon: <MessageSquare className="size-5" />,
        name: "Issue Board",
        path: "reports",
        element: <ReportsIssues />,
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
        element: <PersonalActivity />,
      },
      {
        icon: <SettingsIcon className="size-5" />,
        name: "Profile Settings",
        path: "settings",
        element: <ProfileSettings />,
      },
    ],
  },
];

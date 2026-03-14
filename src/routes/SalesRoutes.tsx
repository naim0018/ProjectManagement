import {
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
  Target,
  Users,
  Settings as SettingsIcon,
} from "lucide-react";

import SalesDashboard from "@/pages/Sales/Dashboard/SalesDashboard";

export const salesRoutes = [
  {
    group: "Performance",
    items: [
      {
        icon: <LayoutDashboard className="size-5" />,
        name: "Overview",
        path: "overview",
        element: <SalesDashboard />,
      },
      {
        icon: <ShoppingCart className="size-5" />,
        name: "Active Orders",
        path: "active-orders",
        element: <SalesDashboard />, // Placeholder for now, can be specific later
      },
      {
        icon: <TrendingUp className="size-5" />,
        name: "Earnings",
        path: "earnings",
        element: <div className="p-10 font-bold text-2xl">Earnings Analysis coming soon...</div>,
      },
    ],
  },
  {
    group: "Strategy",
    items: [
      {
        icon: <Target className="size-5" />,
        name: "Lead Generation",
        path: "leads",
        element: <div className="p-10 font-bold text-2xl">Lead pipeline content</div>,
      },
      {
        icon: <Users className="size-5" />,
        name: "Client Database",
        path: "clients",
        element: <div className="p-10 font-bold text-2xl">Client database management</div>,
      },
    ],
  },
  {
    group: "Configuration",
    items: [
      {
        icon: <SettingsIcon className="size-5" />,
        name: "Sales Settings",
        path: "settings",
        element: <div className="p-10 font-bold text-2xl">Sales configuration settings</div>,
      },
    ],
  },
];

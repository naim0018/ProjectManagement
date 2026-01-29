import { useState } from "react";
import {
  FolderKanban,
  DollarSign,
  Target,
  Clock,
  Ban,
} from "lucide-react";
import { motion } from "framer-motion";

import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { mockAdminData } from "@/types/mockData";
import { RevenueChart } from "./Components/RevenueChart";
import { ProjectStatusChart } from "./Components/ProjectStatusChart";
import { PendingProjectsTable } from "./Components/PendingProjectsTable";
import { DeliveryTarget } from "./Components/DeliveryTarget";
import { IncidentFeed } from "./Components/IncidentFeed";

export default function Overview() {
  const [data] = useState(mockAdminData);

  const revenueData = [
    { month: "Aug", revenue: 85000 },
    { month: "Sep", revenue: 92000 },
    { month: "Oct", revenue: 105000 },
    { month: "Nov", revenue: 98000 },
    { month: "Dec", revenue: 115000 },
    { month: "Jan", revenue: 125000 },
  ];

  const projectStatusData = [
    { name: "Completed", value: data.completedProjects },
    { name: "Running", value: data.runningProjects },
    { name: "Blocked", value: data.blockedProjects.length },
    { name: "Pending", value: 12 },
    { name: "Canceled", value: 4 },
  ];

  const stats = [
    {
      title: "Revenue Target",
      value: "84%",
      icon: Target,
      trend: "$142k / $170k",
      up: true,
      subtitle: "monthly goal",
      color: "brand",
    },
    {
      title: "This Month Revenue",
      value: `$${(data.monthlyDeliveryValue / 1000).toFixed(0)}k`,
      icon: DollarSign,
      trend: "+24%",
      up: true,
      subtitle: "14% increase",
      color: "amber",
    },
    {
      title: "Total Projects This Month",
      value: data.totalProjects,
      icon: FolderKanban,
      trend: "+5%",
      up: true,
      subtitle: "across all orgs",
      color: "emerald",
    },
    {
      title: "Pending Projects",
      value: "12",
      icon: Clock,
      trend: "+3 this week",
      up: true,
      subtitle: "awaiting review",
      color: "amber",
    },
    {
      title: "Canceled Projects",
      value: "4",
      icon: Ban,
      trend: "-2% vs last month",
      up: false,
      subtitle: "terminated scope",
      color: "rose",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8 pb-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">
            System Intelligence
          </h1>
          <p className="text-slate-500 font-normal">
            Global operational overview across all active organizations.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat, i) => (
          <MetricsCard
            key={i}
            {...stat}
            color={stat.color as any}
            progress={stat.title === "Revenue Target" ? 84 : undefined}
          />
        ))}
      </div>

      {/* NEW: Today's Delivery Target Section */}
      <DeliveryTarget />

      {/* Analytics Group */}
      <div className="grid gap-6 md:grid-cols-7">
        <RevenueChart data={revenueData} />
        <ProjectStatusChart data={projectStatusData} totalProjects={data.totalProjects} />
      </div>

      {/* Lower Registry Sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        <PendingProjectsTable />
        <IncidentFeed issues={data.openIssues} />
      </div>
    </motion.div>
  );
}

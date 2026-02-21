import { 
  Users, 
  Clock,
  TrendingUp,
  DollarSign,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { IntakeQueueTable } from "./Components/IntakeQueueTable";
import { TeamEfficiencySidebar } from "./Components/TeamEfficiencySidebar";
import { PageHeader } from "@/common/PageHeader/PageHeader";

const leaderDashboardData = {
  organizationName: "TechFlow Solutions",
  runningProjectsCount: 8,
  pendingAssignmentProjects: 3,
  averageProgress: 68,
  monthlyDeliveryValue: 45000,
  teams: [
    { id: "tm-1", name: "Alex Rivera", role: "Frontend Lead", progress: 85, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: "tm-2", name: "Sarah Chen", role: "Backend Lead", progress: 62, avatar: "https://i.pravatar.cc/150?u=2" },
  ],
  intakeQueue: [
    { 
      id: "Q-701", 
      name: "Enterprise Cloud Migration", 
      clientName: "Tech Solutions Inc", 
      profileName: "Infrastructure",
      startDate: "Jan 05, 2024", 
      deliveryDate: "Dec 15, 2024", 
      value: "$45,000",
      currentPhase: "UI Phase"
    },
    { 
      id: "Q-702", 
      name: "AI Support Bot", 
      clientName: "Global Retail", 
      profileName: "Customer UX",
      startDate: "Jan 12, 2024", 
      deliveryDate: "Jan 10, 2025", 
      value: "$12,500",
      currentPhase: "UI Phase"
    }
  ],
};

export default function LeadersDashboard() {
  const stats = [
    {
      title: "Running Projects",
      value: leaderDashboardData.runningProjectsCount,
      icon: Layers,
      trend: "+2 this month",
      up: true,
      subtitle: "active development",
      color: "brand",
    },
    {
      title: "Monthly Volume",
      value: `$${(leaderDashboardData.monthlyDeliveryValue / 1000).toFixed(0)}k`,
      icon: DollarSign,
      trend: "+12%",
      up: true,
      subtitle: "org throughput",
      color: "emerald",
    },
    {
       title: "Intake Queue",
       value: leaderDashboardData.pendingAssignmentProjects,
       icon: Clock,
       trend: "Action Required",
       up: true,
       subtitle: "awaiting assignment",
       color: "amber",
    },
    {
       title: "Avg. Progress",
       value: `${leaderDashboardData.averageProgress}%`,
       icon: TrendingUp,
       trend: "Standard rate",
       up: true,
       subtitle: "across all tasks",
       color: "blue",
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8 pb-10"
    >
      {/* Header Section */}
      <PageHeader 
        title="Organization Intelligence"
        subtitle={`Strategic overview of ${leaderDashboardData.organizationName} operations.`}
        renderActions={() => (
          <>
            <Button variant="outline" className="rounded-lg border-slate-200 font-semibold shadow-sm h-10 px-4">
              <Users className="mr-2 h-4 w-4" /> Team
            </Button>
            <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg shadow-sm h-10 px-4">
              Assign Intake
            </Button>
          </>
        )}
      />

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <MetricsCard
            key={i}
            {...stat}
            color={stat.color as any}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         <IntakeQueueTable 
           projects={leaderDashboardData.intakeQueue} 
           pendingCount={leaderDashboardData.pendingAssignmentProjects} 
         />
         <TeamEfficiencySidebar teams={leaderDashboardData.teams} />
      </div>
    </motion.div>
  );
}

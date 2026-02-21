import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Layers, 
  Activity, 
  Clock, 
  DollarSign,
  Award,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueueTable } from "./Components/QueueTable";
import { RunningProjectsTable } from "./Components/RunningProjectsTable";
import { MemberRevenueTable } from "./Components/MemberRevenueTable";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { PageHeader } from "@/common/PageHeader/PageHeader";

const projectsData = [
  {
    id: "Q-701",
    name: "Enterprise Cloud Migration",
    clientName: "Tech Solutions Inc",
    profileName: "Infrastructure",
    startDate: "Jan 05, 2024",
    deliveryDate: "Dec 15, 2024",
    value: "$45,000",
    status: "Pending Assignment",
    progress: 0,
    currentPhase: "UI Phase",
    prevPhase: "Initial Review",
  },
  {
    id: "Q-702",
    name: "AI Support Bot",
    clientName: "Global Retail",
    profileName: "Customer UX",
    startDate: "Jan 12, 2024",
    deliveryDate: "Jan 10, 2025",
    value: "$12,500",
    status: "Pending Assignment",
    progress: 0,
    currentPhase: "UI Phase",
    prevPhase: "Planning",
  },
  {
    id: "R-101",
    name: "Mobile App Refactor",
    clientName: "Green Energy",
    profileName: "Mobile Platform",
    startDate: "Feb 02, 2024",
    deliveryDate: "Mar 12, 2025",
    value: "$9,800",
    status: "Running",
    progress: 45,
    currentPhase: "Frontend Phase",
    prevPhase: "UI Phase",
    assignedMember: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=4" },
  },
  {
    id: "R-102",
    name: "Admin Dashboard Update",
    clientName: "FinTech Corp",
    profileName: "Dashboards",
    startDate: "Feb 10, 2024",
    deliveryDate: "Apr 20, 2024",
    value: "$18,000",
    status: "Running",
    progress: 72,
    currentPhase: "Backend Phase",
    prevPhase: "Frontend Phase",
    assignedMember: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=5" },
  },
];

const memberRevenueData = [
  {
    id: "M1",
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?u=1",
    role: "Frontend Lead",
    revenueThisMonth: 12500,
    revenueAllTime: 145000,
    projectsCount: 12,
    isTopPerformer: true,
  },
  {
    id: "M2",
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=4",
    role: "Backend Architect",
    revenueThisMonth: 10800,
    revenueAllTime: 132000,
    projectsCount: 10,
    isTopPerformer: false,
  },
  {
    id: "M3",
    name: "Mike Ross",
    avatar: "https://i.pravatar.cc/150?u=3",
    role: "UI/UX Designer",
    revenueThisMonth: 8500,
    revenueAllTime: 98000,
    projectsCount: 15,
    isTopPerformer: false,
  },
  {
    id: "M4",
    name: "Emily Watson",
    avatar: "https://i.pravatar.cc/150?u=7",
    role: "QA Engineer",
    revenueThisMonth: 9200,
    revenueAllTime: 112000,
    projectsCount: 8,
    isTopPerformer: false,
  },
];

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeTab, setActiveTab] = useState("pending");
  const [timeframe, setTimeframe] = useState<"month" | "all">("month");

  const filteredProjects = projectsData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      (activeTab === "pending" && p.status === "Pending Assignment") ||
      (activeTab === "running" && p.status === "Running");
    return matchesSearch && matchesTab;
  });

  const totalValue = filteredProjects.reduce((acc, p) => acc + parseInt(p.value.replace(/[^0-9]/g, "")), 0);
  const queueCount = projectsData.filter(p => p.status === "Pending Assignment").length;
  const runningCount = projectsData.filter(p => p.status === "Running").length;
  const avgProgress = Math.round(projectsData.filter(p => p.progress).reduce((acc, p) => acc + (p.progress || 0), 0) / runningCount) || 0;

  // Revenue specific calculations
  const totalRevenue = memberRevenueData.reduce((acc, m) => acc + (timeframe === "month" ? m.revenueThisMonth : m.revenueAllTime), 0);
  const topEarner = [...memberRevenueData].sort((a, b) => (timeframe === "month" ? b.revenueThisMonth - a.revenueThisMonth : b.revenueAllTime - a.revenueAllTime))[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader 
        title="Project Management"
        subtitle="Manage intake queue and monitor active execution phases."
        renderActions={() => (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="pending">Queue</TabsTrigger>
                <TabsTrigger value="running">Running</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg h-10 px-6 shadow-sm">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </>
        )}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeTab === "revenue" ? (
          <>
            <MetricsCard
              title="Total Revenue"
              value={`$${(totalRevenue / 1000).toFixed(1)}k`}
              icon={DollarSign}
              trend="+18% growth"
              up={true}
              subtitle={timeframe === "month" ? "this monthly cycle" : "all time earnings"}
              color="emerald"
            />
            <MetricsCard
              title="Top Contributor"
              value={topEarner.name.split(" ")[0]}
              icon={Award}
              trend={`$${( (timeframe === 'month' ? topEarner.revenueThisMonth : topEarner.revenueAllTime) / 1000).toFixed(1)}k`}
              up={true}
              subtitle="highest generated"
              color="brand"
            />
            <MetricsCard
              title="Avg per Member"
              value={`$${((totalRevenue / memberRevenueData.length) / 1000).toFixed(1)}k`}
              icon={Activity}
              trend="Stable"
              up={true}
              subtitle="team efficiency"
              color="violet"
            />
            <MetricsCard
              title="Target Sync"
              value="92%"
              icon={Layers}
              trend="Ahead of schedule"
              up={true}
              subtitle="quarterly goal"
              color="brand"
              progress={92}
            />
          </>
        ) : (
          <>
            <MetricsCard
              title="Total Volume"
              value={`$${(totalValue / 1000).toFixed(1)}k`}
              icon={DollarSign}
              trend="+12% from last month"
              up={true}
              subtitle="filtered total"
              color="brand"
            />
            <MetricsCard
              title="Active Queue"
              value={queueCount}
              icon={Clock}
              trend="Needs Assignment"
              up={false}
              subtitle="awaiting start"
              color="amber"
            />
            <MetricsCard
              title="Running Projects"
              value={runningCount}
              icon={Layers}
              trend="+2 since Monday"
              up={true}
              subtitle="in development"
              color="emerald"
            />
            <MetricsCard
              title="Avg. Progress"
              value={`${avgProgress}%`}
              icon={Activity}
              trend="On track"
              up={true}
              subtitle="execution health"
              color="brand"
            />
          </>
        )}
      </div>

      <Card className="border-slate-200 rounded-xl shadow-sm bg-white py-0 overflow-hidden">
        <CardHeader className="pt-4 pb-2 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-[450px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by project name or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-white border-slate-200 focus:ring-brand-500/10 rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              {activeTab === "revenue" && (
                <div className="flex bg-slate-100 p-1 rounded-lg mr-2">
                   <Button 
                    variant={timeframe === "month" ? "secondary" : "ghost"} 
                    size="sm"
                    onClick={() => setTimeframe("month")}
                    className={`h-7 px-3 rounded-md text-[10px] font-bold ${timeframe === 'month' ? 'bg-white shadow-sm' : ''}`}
                  >
                    This Month
                  </Button>
                   <Button 
                    variant={timeframe === "all" ? "secondary" : "ghost"} 
                    size="sm"
                    onClick={() => setTimeframe("all")}
                    className={`h-7 px-3 rounded-md text-[10px] font-bold ${timeframe === 'all' ? 'bg-white shadow-sm' : ''}`}
                  >
                    All Time
                  </Button>
                </div>
              )}
              {activeTab !== "revenue" && (
                <>
                  <Button 
                    variant={viewMode === "list" ? "secondary" : "ghost"} 
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`h-9 px-3 rounded-lg text-xs font-semibold`}
                  >
                    <List size={14} className="mr-1.5" /> List
                  </Button>
                  <Button 
                    variant={viewMode === "grid" ? "secondary" : "ghost"} 
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`h-9 px-3 rounded-lg text-xs font-semibold`}
                  >
                    <LayoutGrid size={14} className="mr-1.5" /> Grid
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "pending" ? (
                <QueueTable projects={filteredProjects} />
              ) : activeTab === "running" ? (
                <RunningProjectsTable projects={filteredProjects} />
              ) : (
                <MemberRevenueTable data={memberRevenueData} timeframe={timeframe} />
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

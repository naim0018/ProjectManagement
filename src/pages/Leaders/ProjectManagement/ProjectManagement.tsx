import { 
  Plus, 
  Search, 
  LayoutGrid,
  List,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueueTable } from "./Components/QueueTable";
import { RunningProjectsTable } from "./Components/RunningProjectsTable";

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

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeTab, setActiveTab] = useState("pending");

  const filteredProjects = projectsData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      (activeTab === "pending" && p.status === "Pending Assignment") ||
      (activeTab === "running" && p.status === "Running");
    return matchesSearch && matchesTab;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 leading-tight">Project Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage intake queue and monitor active execution phases.</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-100 p-1 rounded-xl">
            <TabsList className="bg-transparent h-9 gap-1">
              <TabsTrigger value="pending" className="rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-semibold">Queue</TabsTrigger>
              <TabsTrigger value="running" className="rounded-lg px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-semibold">Running</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg h-10 px-6 shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
        <CardHeader className="p-4 border-b border-slate-100 bg-slate-50/50">
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
              ) : (
                <RunningProjectsTable projects={filteredProjects} />
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

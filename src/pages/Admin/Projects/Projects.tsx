import { useState } from "react";
import { 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  XCircle,
  FileDown,
  Target,
  Clock
} from "lucide-react";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { DeliveryPipelineTable } from "./Components/DeliveryPipelineTable";

const projects = [
  {
    id: "PJ-942",
    clientName: "TechFlow Inc.",
    profileName: "E-Commerce Re-platform",
    assignedOrg: "Digital Solutions",
    assignments: {
      ui: "John UI",
      frontend: "Sarah Dev",
      backend: "Mike Arch",
      ai: "Alex Spark",
      app: "David Mobile"
    },
    orderDate: "Jan 15, 2024",
    deliverDate: "Mar 20, 2024",
    status: "In Progress",
    progress: 65,
    revision: 1,
    priority: "High"
  },
  {
    id: "PJ-512",
    clientName: "Global Logistics",
    profileName: "Fleet Tracking Dashboard",
    assignedOrg: "Enterprise Systems",
    assignments: {
      ui: "Emma Design",
      frontend: "Chris Web",
      backend: "Liam Data",
      ai: "Sophia ML",
      app: "Lucas Swift"
    },
    orderDate: "Jan 20, 2024",
    deliverDate: "Apr 05, 2024",
    status: "Revision",
    progress: 85,
    revision: 3,
    priority: "Medium"
  },
  {
    id: "PJ-881",
    clientName: "Green Energy",
    profileName: "Sustainability App",
    assignedOrg: "EcoTech Lab",
    assignments: {
      ui: "Noah Creative",
      frontend: "Mia Front",
      backend: "Jack Server",
      ai: "Oliver AI",
      app: "Isabella App"
    },
    orderDate: "Feb 01, 2024",
    deliverDate: "May 15, 2024",
    status: "Canceled",
    progress: 0,
    revision: 0,
    priority: "Low"
  }
];

const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { title: "Total Portfolio", value: "248", icon: Target, trend: "+12%", up: true, subtitle: "active items", color: "brand" },
    { title: "Execution WIP", value: "18", icon: Clock, trend: "+3", up: true, subtitle: "in pipeline", color: "amber" },
    { title: "Monthly Success", value: "42", icon: CheckCircle2, trend: "+14%", up: true, subtitle: "delivered", color: "emerald" },
    { title: "Pending Review", value: "5", icon: AlertCircle, trend: "-2%", up: false, subtitle: "revisions", color: "rose" },
    { title: "Risk Factor", value: "3.2%", icon: XCircle, trend: "Stable", up: true, subtitle: "loss rate", color: "slate" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
             <span className="h-6 w-1 bg-brand-600 rounded-full" />
             <h1 className="text-2xl font-bold tracking-tight text-slate-900">All Projects</h1>
          </div>
          <p className="text-slate-500 font-medium text-sm">Managing global delivery lifecycles across all clusters.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 border-slate-200 shadow-sm text-slate-600 font-semibold px-4 hover:bg-slate-50">
            <FileDown size={16} className="mr-2" />
            Export Data
          </Button>
          <Button className="h-10 bg-brand-600 hover:bg-brand-700 shadow-sm font-semibold text-white px-5 transition-all active:scale-95">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Grid - Exactly like Overview */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat, i) => (
          <MetricsCard
            key={i}
            {...stat}
            color={stat.color as any}
          />
        ))}
      </div>

      {/* Main Registry Card */}
      <DeliveryPipelineTable 
        projects={projects} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
    </motion.div>
  );
};

export default AllProjects;

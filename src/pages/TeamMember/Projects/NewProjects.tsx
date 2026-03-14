import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Briefcase,
  AlertCircle,
  Users
} from "lucide-react";
import { useState } from "react";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { NewProjectsTable } from "./Components/NewProjectsTable";

const runningProjects = [
  {
    id: "R-101",
    name: "Enterprise Cloud Migration",
    clientName: "Tech Solutions Inc",
    profileName: "Infrastructure",
    deliveryDate: "Mar 15, 2026",
    value: "$45,000",
    status: "In Progress",
    category: "DevOps"
  },
  {
    id: "R-102",
    name: "AI Support Bot",
    clientName: "Global Retail",
    profileName: "Customer UX",
    deliveryDate: "Apr 10, 2026",
    value: "$12,500",
    status: "In Progress",
    category: "AI/ML"
  },
  {
    id: "R-103",
    name: "FinTech Mobile Suite",
    clientName: "Capital One",
    profileName: "Mobile Platform",
    deliveryDate: "Feb 28, 2026",
    value: "$28,000",
    status: "At Risk",
    category: "FinTech"
  },
  {
    id: "R-104",
    name: "Supply Chain Dashboard",
    clientName: "LogiTrans Group",
    profileName: "Analytics",
    deliveryDate: "Mar 05, 2026",
    value: "$15,400",
    status: "In Progress",
    category: "Dashboard"
  },
  {
    id: "R-105",
    name: "Healthcare Portal",
    clientName: "MediCare Plus",
    profileName: "Web Platform",
    deliveryDate: "Apr 20, 2026",
    value: "$32,000",
    status: "In Progress",
    category: "Healthcare"
  }
];

const NewProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const atRiskCount = runningProjects.filter(p => p.status === "At Risk").length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 leading-tight">Running Projects</h1>
          <p className="text-slate-500 text-sm mt-1">Active projects currently in progress requiring your contribution.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard 
          title="Active Projects" 
          value={runningProjects.length.toString()} 
          icon={Briefcase} 
          trend="Currently working" 
          up={true} 
          subtitle="in progress" 
          color="brand"
        />
        <MetricsCard 
          title="Total Value" 
          value="$132.9k" 
          icon={TrendingUp} 
          trend="Active revenue" 
          up={true} 
          subtitle="across projects" 
          color="emerald"
        />
        <MetricsCard 
          title="At Risk" 
          value={atRiskCount.toString()} 
          icon={AlertCircle} 
          trend="Needs attention" 
          up={false} 
          subtitle="behind schedule" 
          color="rose"
        />
        <MetricsCard 
          title="Team Members" 
          value="18" 
          icon={Users} 
          trend="Collaborating" 
          up={true} 
          subtitle="across 5 projects" 
          color="violet"
        />
      </div>

      <NewProjectsTable 
        projects={runningProjects}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </motion.div>
  );
};

export default NewProjects;

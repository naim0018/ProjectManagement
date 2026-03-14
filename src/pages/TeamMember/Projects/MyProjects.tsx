import { motion } from "framer-motion";
import { 
  FolderKanban, 
  CheckCircle2,
  Star,
  TrendingUp
} from "lucide-react";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { useState } from "react";
import { PageHeader } from "@/common/PageHeader/PageHeader";
import { ProjectsTable } from "./Components/ProjectsTable";

const completedProjects = [
  {
    id: 1,
    name: "Solaris ERP Module A",
    category: "Development",
    status: "Completed",
    priority: "High",
    progress: 100,
    teamSize: 5,
    deadline: "2026-01-15T00:00:00",
    role: "Module Lead",
    tasks: { completed: 60, total: 60 }
  },
  {
    id: 2,
    name: "Zephyr UI Lib",
    category: "Design System",
    status: "Completed",
    priority: "Normal",
    progress: 100,
    teamSize: 8,
    deadline: "2026-01-28T00:00:00",
    role: "Design Tech",
    tasks: { completed: 80, total: 80 }
  },
  {
    id: 3,
    name: "Auth Service Migration",
    category: "Backend",
    status: "Completed",
    priority: "High",
    progress: 100,
    teamSize: 3,
    deadline: "2025-12-20T00:00:00",
    role: "Contributor",
    tasks: { completed: 45, total: 45 }
  },
  {
    id: 4,
    name: "Payment Gateway Integration",
    category: "FinTech",
    status: "Completed",
    priority: "High",
    progress: 100,
    teamSize: 4,
    deadline: "2025-11-30T00:00:00",
    role: "Full Stack",
    tasks: { completed: 32, total: 32 }
  },
  {
    id: 5,
    name: "Mobile App V1",
    category: "Mobile",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    teamSize: 6,
    deadline: "2025-10-15T00:00:00",
    role: "Lead Developer",
    tasks: { completed: 120, total: 120 }
  }
];

const MyProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader 
        title="Completed Projects"
        subtitle="View all your successfully delivered projects"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MetricsCard 
          title="Total Completed"
          value={completedProjects.length}
          icon={CheckCircle2}
          trend="+3 this month"
          up={true}
          subtitle="successfully delivered"
          color="emerald"
        />
        <MetricsCard 
          title="Total Tasks Done"
          value="337"
          icon={FolderKanban}
          trend="100% completion"
          up={true}
          subtitle="across all projects"
          color="brand"
        />
        <MetricsCard 
          title="Avg. Rating"
          value="4.8"
          icon={Star}
          trend="Top performer"
          up={true}
          subtitle="client satisfaction"
          color="amber"
        />
        <MetricsCard 
          title="Revenue Generated"
          value="$52.5k"
          icon={TrendingUp}
          trend="+18% growth"
          up={true}
          subtitle="from completed work"
          color="violet"
        />
      </div>

      <ProjectsTable 
        projects={completedProjects}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </motion.div>
  );
};

export default MyProjects;

import { useState } from "react";
import { 
  Plus, 
  Target,
  BarChart3,
  HeartPulse,
  ShieldCheck,
  Users
} from "lucide-react";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { EntityRegistryTable } from "./Components/EntityRegistryTable";
import { AddTeamModal } from "./Components/AddTeamModal";
import { PageHeader } from "@/common/PageHeader/PageHeader";

const teams = [
  { 
    id: "team_1", 
    name: "Core Engineering", 
    industry: "Development", 
    status: "Active", 
    members: 12, 
    projects: 4, 
    location: "Level 4, HQ",
    revenue: "$0", // Teams don't usually have revenue in this context, but keeping structure
    logo: "CE"
  },
  { 
    id: "team_2", 
    name: "Product Design", 
    industry: "Design", 
    status: "Active", 
    members: 6, 
    projects: 3, 
    location: "Studio A",
    revenue: "$0",
    logo: "PD"
  },
  { 
    id: "team_3", 
    name: "Growth & Marketing", 
    industry: "Marketing", 
    status: "Suspended", 
    members: 8, 
    projects: 2, 
    location: "Remote",
    revenue: "$0",
    logo: "GM"
  },
];

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stats = [
    { title: "Total Teams", value: "12", icon: Users, trend: "+2", up: true, subtitle: "this month", color: "brand" },
    { title: "Active Members", value: "84", icon: ShieldCheck, trend: "+15%", up: true, subtitle: "engagement", color: "emerald" },
    { title: "Project Clusters", value: "9", icon: Target, trend: "Stable", up: true, subtitle: "active tracks", color: "violet" },
    { title: "Growth Velocity", value: "24%", icon: BarChart3, trend: "+5.4%", up: true, subtitle: "quarterly", color: "amber" },
    { title: "Resource Load", value: "78%", icon: HeartPulse, trend: "Optimal", up: true, subtitle: "system health", color: "rose" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <PageHeader 
        title="Teams"
        subtitle="Manage and monitor all teams within your organization."
        renderActions={() => (
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="h-10 px-5 bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm hover:scale-[1.02] transition-all font-semibold text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Team
          </Button>
        )}
      />

      {/* System Intelligence Stats - 5 Card Layout */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat, i) => (
          <MetricsCard
            key={i}
            {...stat}
            color={stat.color as any}
          />
        ))}
      </div>

      {/* Filter & Table Area */}
      <EntityRegistryTable 
        teams={teams as any} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <AddTeamModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </motion.div>
  );
};

export default Organizations;

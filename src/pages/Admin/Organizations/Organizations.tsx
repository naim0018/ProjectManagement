import { useState } from "react";
import { 
  Plus, 
  Target,
  BarChart3,
  HeartPulse,
  DollarSign,
  ShieldCheck
} from "lucide-react";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { EntityRegistryTable } from "./Components/EntityRegistryTable";

const organizations = [
  { 
    id: "org_1", 
    name: "TechFlow Solutions", 
    industry: "Software", 
    status: "Active", 
    members: 42, 
    projects: 8, 
    location: "San Francisco, CA",
    revenue: "$1.2M",
    logo: "TF"
  },
  { 
    id: "org_2", 
    name: "Global Logistics Co", 
    industry: "Logistics", 
    status: "Active", 
    members: 128, 
    projects: 15, 
    location: "Chicago, IL",
    revenue: "$3.5M",
    logo: "GL"
  },
  { 
    id: "org_3", 
    name: "Green Energy Inc", 
    industry: "Renewables", 
    status: "Suspended", 
    members: 15, 
    projects: 2, 
    location: "Austin, TX",
    revenue: "$450k",
    logo: "GE"
  },
  { 
    id: "org_4", 
    name: "Apex Healthcare", 
    industry: "Medical", 
    status: "Active", 
    members: 89, 
    projects: 12, 
    location: "Boston, MA",
    revenue: "$2.1M",
    logo: "AH"
  },
];

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { title: "Total Ecosystem", value: "24", icon: Target, trend: "+4", up: true, subtitle: "organizations", color: "brand" },
    { title: "Net Revenue", value: "$14.2M", icon: DollarSign, trend: "+12%", up: true, subtitle: "arr growth", color: "emerald" },
    { title: "Active Clusters", value: "21", icon: ShieldCheck, trend: "Stable", up: true, subtitle: "subscriptions", color: "violet" },
    { title: "Growth Velocity", value: "18%", icon: BarChart3, trend: "+2.4%", up: true, subtitle: "expansion", color: "amber" },
    { title: "System Health", value: "99.9%", icon: HeartPulse, trend: "Optimal", up: true, subtitle: "uptime", color: "rose" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">Organizations</h1>
          <p className="text-slate-500 text-base font-normal">Manage and monitor all tenant entities within the system.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="h-10 px-5 bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm hover:scale-[1.02] transition-all font-semibold text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        </div>
      </div>

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
        organizations={organizations} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
    </motion.div>
  );
};

export default Organizations;

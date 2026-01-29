import { useState } from "react";
import { 
  UserPlus, 
  Filter,
  Users2,
  Zap,
  AlertTriangle,
  Fingerprint
} from "lucide-react";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { UserDirectoryTable } from "./Components/UserDirectoryTable";

const users = [
  { 
    id: "usr_1", 
    name: "John Doe", 
    email: "john@techflow.com", 
    role: "Admin", 
    org: "TechFlow Solutions",
    status: "Active", 
    lastLogin: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=john"
  },
  { 
    id: "usr_2", 
    name: "Sarah Chen", 
    email: "sarah@logis.co", 
    role: "Leader", 
    org: "Global Logistics Co",
    status: "Active", 
    lastLogin: "1 day ago",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  { 
    id: "usr_3", 
    name: "Alex Rivera", 
    email: "alex@medical.com", 
    role: "Team Member", 
    org: "Apex Healthcare",
    status: "Inactive", 
    lastLogin: "3 days ago",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  { 
    id: "usr_4", 
    name: "Mike Ross", 
    email: "mike@techflow.com", 
    role: "Leader", 
    org: "TechFlow Solutions",
    status: "Active", 
    lastLogin: "Just now",
    avatar: "https://i.pravatar.cc/150?u=mike"
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { title: "Total Population", value: "842", icon: Users2, trend: "+12", up: true, subtitle: "active accounts", color: "brand" },
    { title: "Active Sessions", value: "112", icon: Zap, trend: "+8%", up: true, subtitle: "online now", color: "emerald" },
    { title: "Onboarding", value: "24", icon: UserPlus, trend: "+5", up: true, subtitle: "pending invites", color: "amber" },
    { title: "Security Risks", value: "3", icon: AlertTriangle, trend: "-1", up: true, subtitle: "flagged accounts", color: "rose" },
    { title: "Retention Rate", value: "95.4%", icon: Fingerprint, trend: "+2.1%", up: true, subtitle: "monthly avg", color: "violet" },
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
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">User Management</h1>
          <p className="text-slate-500 text-base font-normal">Control system access and assign roles across all organizations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 px-4 border-slate-200 rounded-lg shadow-sm hover:scale-[1.02] transition-all font-semibold">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="h-10 px-5 bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm hover:scale-[1.02] transition-all font-semibold text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite User
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

      {/* Users Table */}
      <UserDirectoryTable 
        users={users} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
    </motion.div>
  );
};

export default UserManagement;

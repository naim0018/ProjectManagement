import { 
  AlertTriangle, 
  MessageCircle, 
  Clock, 
  ChevronRight,
  Filter,
  Search,
  Flag,
  CheckCircle,
  Activity
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { PageHeader } from "@/common/PageHeader/PageHeader";

const issuesData = [
  {
    id: "ISS-102",
    title: "Database latency in production environment",
    description: "Postgres queries are taking >500ms for simple read operations since the last migration.",
    reportedBy: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=4" },
    priority: "Critical",
    status: "Open",
    category: "Technical",
    createdAt: "2h ago",
    comments: 4
  },
  {
    id: "ISS-105",
    title: "Project Alpha frontend team delay",
    description: "Resource shortage due to two members on sudden medical leave.",
    reportedBy: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=1" },
    priority: "High",
    status: "InProgress",
    category: "Operational",
    createdAt: "5h ago",
    comments: 2
  },
  {
    id: "ISS-108",
    title: "Missing documentation for API V3 endpoints",
    description: "The new authentication flow endpoints are not documented in the internal wiki.",
    reportedBy: { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=3" },
    priority: "Medium",
    status: "Resolved",
    category: "Documentation",
    createdAt: "1d ago",
    comments: 1
  },
  {
    id: "ISS-110",
    title: "Client request for expedited delivery",
    description: "Client from Global Logistics Co is asking if we can move the deadline 1 week earlier.",
    reportedBy: { name: "Emily Watson", avatar: "https://i.pravatar.cc/150?u=7" },
    priority: "High",
    status: "Open",
    category: "Client",
    createdAt: "3h ago",
    comments: 0
  },
];

export default function OrganizationIssues() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIssues = issuesData.filter(issue => 
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <PageHeader 
        title="Organization Issues"
        subtitle="Manage blockers, technical debts, and operational hurdles."
        renderActions={() => (
          <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl h-11 px-6 shadow-lg shadow-rose-500/20 active:scale-95 transition-all">
            <AlertTriangle className="mr-2 h-5 w-5" /> Report Issue
          </Button>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricsCard
          title="Critical"
          value="1"
          icon={AlertTriangle}
          trend="+50% from yesterday"
          up={false}
          subtitle="urgent attention"
          color="rose"
        />
        <MetricsCard
          title="High Priority"
          value="2"
          icon={Activity}
          trend="-1 from yesterday"
          up={true}
          subtitle="blocking progress"
          color="amber"
        />
        <MetricsCard
          title="Open Issues"
          value="3"
          icon={Search}
          trend="Steady volume"
          up={true}
          subtitle="active monitoring"
          color="brand"
        />
        <MetricsCard
          title="Resolved Today"
          value="5"
          icon={CheckCircle}
          trend="+3 over goal"
          up={true}
          subtitle="completion health"
          color="emerald"
        />
      </div>

      <Card className="border-slate-200 rounded-xl shadow-sm bg-white py-0 overflow-hidden gap-0">
        <CardHeader className="pt-4 pb-2 border-b border-slate-100 bg-slate-50/30">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <Input
                 placeholder="Search issues by ID or title..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-10 h-10 bg-white border-slate-200 focus:ring-brand-500/10 rounded-xl"
               />
             </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" className="h-10 rounded-xl border-slate-200 bg-white text-slate-600 gap-2">
                   <Filter size={16} /> Filter
                </Button>
             </div>
           </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="divide-y divide-slate-100">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="p-5 hover:bg-slate-50/50 transition-all cursor-pointer group flex items-start gap-5">
                   <div className={`mt-1 h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center ${
                     issue.priority === 'Critical' ? 'bg-rose-100 text-rose-600' : 
                     issue.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'
                   }`}>
                      <AlertTriangle size={20} className={issue.priority === 'Critical' ? 'animate-pulse' : ''} />
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                         <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{issue.id}</span>
                            <Badge variant="outline" className={`border-none font-bold text-[9px] px-2 rounded-md ${
                              issue.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 
                              issue.status === 'InProgress' ? 'bg-brand-50 text-brand-600' : 'bg-slate-100 text-slate-400'
                            }`}>
                              {issue.status}
                            </Badge>
                         </div>
                         <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Clock size={12} /> {issue.createdAt}
                         </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mt-1 mb-1 group-hover:text-brand-600 transition-colors truncate">{issue.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{issue.description}</p>
                      
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                         <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                               <Avatar className="h-6 w-6 border border-white shadow-sm">
                                  <AvatarImage src={issue.reportedBy.avatar} />
                                  <AvatarFallback>{issue.reportedBy.name[0]}</AvatarFallback>
                               </Avatar>
                               <span className="text-[10px] font-bold text-slate-600 italic">Reported by {issue.reportedBy.name.split(" ")[0]}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                               <MessageCircle size={14} />
                               <span className="text-[10px] font-bold">{issue.comments} comments</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                               <Flag size={14} />
                               <span className="text-[10px] font-bold">{issue.category}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-2">
                            {issue.status !== 'Resolved' && (
                              <Button className="h-8 bg-brand-600 hover:bg-brand-700 text-white font-bold text-[10px] uppercase tracking-widest rounded-lg px-4 transition-all active:scale-95">
                                 Resolve
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 rounded-lg">
                               <ChevronRight size={18} />
                            </Button>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

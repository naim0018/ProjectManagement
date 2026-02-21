import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Tag, 
  ChevronRight,
  MessageCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/common/PageHeader/PageHeader";

const issues = [
  {
    id: "ISS-451",
    title: "Authentication loop on mobile browsers",
    project: "Solaris ERP",
    status: "Active",
    priority: "Critical",
    type: "Bug",
    reportedBy: "Self",
    date: "2 hours ago",
    comments: 12
  },
  {
    id: "ISS-448",
    title: "Sidebar navigation glitch on tablet resize",
    project: "Zephyr UI",
    status: "In Review",
    priority: "Medium",
    type: "UI/UX",
    reportedBy: "Sarah Chen",
    date: "Yesterday",
    comments: 3
  },
  {
    id: "ISS-442",
    title: "API endpoint returning 500 on batch upload",
    project: "Nexus API Bridge",
    status: "Fixed",
    priority: "High",
    type: "Backend",
    reportedBy: "Self",
    date: "3 days ago",
    comments: 8
  },
  {
    id: "ISS-439",
    title: "Add support for dark mode in analytics charts",
    project: "Aurora Analytics",
    status: "Pending",
    priority: "Low",
    type: "Feature",
    reportedBy: "Self",
    date: "1 week ago",
    comments: 0
  }
];

const ReportsIssues = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <PageHeader 
        title="Reports & Issues"
        subtitle="Submit reports, track issues, and collaborate on fixes"
        renderActions={() => (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 text-slate-600 border-slate-200">
              <Filter size={16} className="mr-2" /> Filter
            </Button>
            <Button className="h-10 bg-rose-600 hover:bg-rose-700 text-white">
              <Plus size={16} className="mr-2" /> Report Issue
            </Button>
          </div>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricsCard 
          title="Active Issues"
          value="14"
          icon={AlertTriangle}
          trend="+2 today"
          up={false}
          subtitle="needs attention"
          color="rose"
        />
        <MetricsCard 
          title="Resolved This Week"
          value="32"
          icon={CheckCircle2}
          trend="85% rate"
          up={true}
          subtitle="resolution efficiency"
          color="emerald"
        />
        <MetricsCard 
          title="Ongoing Discussions"
          value="8"
          icon={MessageSquare}
          trend="4 Unread"
          up={true}
          subtitle="team collaboration"
          color="brand"
        />
      </div>


      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 mb-6">
          <TabsList variant="line">
            <TabsTrigger value="all">All Issues</TabsTrigger>
            <TabsTrigger value="reported">Reported by Me</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          
          <div className="relative mb-2 md:mb-0 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input placeholder="Search issues..." className="pl-9 h-9 bg-slate-50/50 border-slate-200 rounded-lg text-sm" />
          </div>
        </div>

        <TabsContent value="all" className="mt-0 space-y-4">
          {issues.map((issue) => (
            <Card key={issue.id} className="border-slate-200 hover:border-brand-300 transition-all bg-white cursor-pointer group">
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    issue.type === 'Bug' ? 'bg-rose-50 text-rose-600' :
                    issue.type === 'UI/UX' ? 'bg-amber-50 text-amber-600' :
                    issue.type === 'Backend' ? 'bg-violet-50 text-violet-600' : 'bg-brand-50 text-brand-600'
                  }`}>
                    <Tag size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{issue.id}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">{issue.project}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight">{issue.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded-md">
                          <Clock size={12} className="text-slate-400" />
                          <span className="text-[10px] font-semibold text-slate-500">{issue.date}</span>
                       </div>
                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded-md">
                          <Avatar className="h-3.5 w-3.5">
                             <AvatarImage src={`https://i.pravatar.cc/100?u=${issue.reportedBy}`} />
                             <AvatarFallback className="text-[6px]">U</AvatarFallback>
                          </Avatar>
                          <span className="text-[10px] font-semibold text-slate-500">{issue.reportedBy}</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <MessageCircle size={12} className="text-slate-400" />
                          <span className="text-[10px] font-semibold text-slate-500">{issue.comments} comments</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                  <div className="text-left md:text-right">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">PRIORITY</p>
                    <Badge variant="outline" className={`${
                      issue.priority === 'Critical' ? 'border-rose-200 text-rose-600 bg-rose-50' :
                      issue.priority === 'High' ? 'border-amber-200 text-amber-600 bg-amber-50' :
                      'border-slate-200 text-slate-600 bg-slate-50'
                    } border-none text-[10px] uppercase font-bold px-2 py-0`}>
                      {issue.priority}
                    </Badge>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">STATUS</p>
                    <Badge className={`${
                      issue.status === 'Fixed' ? 'bg-emerald-500' :
                      issue.status === 'In Review' ? 'bg-amber-500' :
                      issue.status === 'Pending' ? 'bg-slate-400' : 'bg-brand-600'
                    } text-white border-none text-[10px] uppercase font-bold px-2 py-0`}>
                      {issue.status}
                    </Badge>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button variant="ghost" className="w-full text-slate-400 font-semibold hover:text-brand-600 py-6 border-2 border-dashed border-slate-100 rounded-xl">
            Load More Archive Issues
          </Button>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ReportsIssues;

import { 
  AlertTriangle, 
  Users, 
  Clock,
  Briefcase,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaderDashboardData = {
  organizationName: "TechFlow Solutions",
  runningProjectsCount: 6,
  averageProgress: 68,
  monthlyDeliveryValue: 45000,
  teams: [
    { id: "tm-1", name: "Alex Rivera", role: "Frontend Lead", progress: 85, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: "tm-2", name: "Sarah Chen", role: "Backend Lead", progress: 62, avatar: "https://i.pravatar.cc/150?u=2" },
    { id: "tm-3", name: "Mike Ross", role: "Designer", progress: 45, avatar: "https://i.pravatar.cc/150?u=3" },
  ],
  upcomingDeadlines: [
    { id: "p-1", name: "Cloud Migration", date: "Feb 12", status: "At Risk" },
    { id: "p-2", name: "Auth V2", date: "Feb 18", status: "On Track" },
  ]
};

export default function LeadersDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight leading-none mb-1">
            {leaderDashboardData.organizationName}
          </h1>
          <p className="text-slate-500 font-normal text-base">Organization Management & Coordination</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-lg h-10 border-slate-200 shadow-sm hover:scale-[1.02] transition-all font-semibold">
              <Users className="mr-2 h-4 w-4" />
              Manage Teams
           </Button>
           <Button className="rounded-lg h-10 bg-brand-600 hover:bg-brand-700 shadow-sm font-semibold transition-all text-white hover:scale-[1.02]">
              New Project
           </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
         {[
           { label: "Total Revenue", val: `$${leaderDashboardData.monthlyDeliveryValue.toLocaleString()}`, trend: "+12%", color: "text-emerald-600", icon: ArrowUpRight },
           { label: "Active Projects", val: leaderDashboardData.runningProjectsCount, trend: "2 starting soon", color: "text-brand-600", icon: Briefcase },
           { label: "Avg. Progress", val: `${leaderDashboardData.averageProgress}%`, progress: leaderDashboardData.averageProgress },
           { label: "Open Issues", val: "4", trend: "2 high priority", color: "text-rose-600", icon: AlertTriangle },
         ].map((stat, i) => (
           <Card key={i} className="border-slate-200 rounded-xl shadow-sm hover:scale-[1.02] transition-all bg-white">
              <CardHeader className="pb-2">
                 <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{stat.label}</span>
                 <CardTitle className="text-xl font-semibold text-slate-900">{stat.val}</CardTitle>
              </CardHeader>
              <CardContent>
                 {stat.progress !== undefined ? (
                    <Progress value={stat.progress} className="h-1 mt-2" />
                 ) : (
                    <div className={`flex items-center ${stat.color} text-xs font-semibold gap-1`}>
                       {stat.icon && <stat.icon size={14} />} {stat.trend}
                    </div>
                 )}
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
         <Card className="lg:col-span-2 border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50">
               <div>
                  <h2 className="text-lg font-semibold text-slate-900 leading-none">Team Performance</h2>
                  <p className="text-sm text-slate-500 font-normal mt-1">Individual contribution levels.</p>
               </div>
               <Button variant="ghost" size="icon" className="text-slate-400 rounded-lg">
                  <MoreHorizontal size={18} />
               </Button>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                  <TableHeader className="bg-slate-50/30">
                     <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="px-6 h-10 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Member</TableHead>
                        <TableHead className="px-6 h-10 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Efficiency</TableHead>
                        <TableHead className="px-6 h-10 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Action</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {leaderDashboardData.teams.map((member) => (
                        <TableRow key={member.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                           <TableCell className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <Avatar className="h-9 w-9 border-none shadow-sm">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className="text-xs font-semibold">{member.name[0]}</AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <p className="font-semibold text-slate-800 text-sm leading-tight">{member.name}</p>
                                    <p className="text-xs text-slate-400 font-normal">{member.role}</p>
                                 </div>
                              </div>
                           </TableCell>
                           <TableCell className="px-6 py-4">
                              <div className="w-36 space-y-1.5">
                                 <div className="flex justify-between text-[10px] font-semibold text-brand-600">
                                    <span>PROGRESS</span>
                                    <span>{member.progress}%</span>
                                 </div>
                                 <Progress value={member.progress} className="h-1 shadow-none bg-slate-100" />
                              </div>
                           </TableCell>
                           <TableCell className="px-6 py-4 text-right">
                              <Button variant="ghost" size="sm" className="h-8 rounded-lg font-semibold text-[10px] uppercase tracking-widest text-slate-400 hover:text-brand-600 transition-colors">
                                 Details
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>

         <div className="space-y-8">
            <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
               <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <h2 className="text-lg font-semibold text-slate-900 leading-none">Deadlines</h2>
                  <p className="text-sm text-slate-500 font-normal mt-1">Due in next 7 days.</p>
               </CardHeader>
               <CardContent className="pt-6 space-y-4">
                  {leaderDashboardData.upcomingDeadlines.map((item) => (
                     <div key={item.id} className="flex items-start justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/30 hover:border-brand-100 hover:bg-white transition-all cursor-pointer group shadow-sm hover:scale-[1.02]">
                        <div className="flex gap-3">
                           <div className="h-9 w-9 rounded-lg bg-white flex flex-col items-center justify-center border border-slate-200 shadow-sm">
                              <span className="text-[8px] font-semibold text-slate-400 uppercase leading-none">FEB</span>
                              <span className="text-xs font-semibold text-brand-600 leading-tight">{item.date.split(" ")[1]}</span>
                           </div>
                           <div>
                              <h4 className="font-semibold text-sm text-slate-800 group-hover:text-brand-600 transition-colors">{item.name}</h4>
                              <p className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold italic mt-0.5">
                                 <Clock size={10} /> Urgent
                              </p>
                           </div>
                        </div>
                        <Badge variant="outline" className={`border-none font-semibold text-[9px] px-1.5 rounded-md ${
                           item.status === "At Risk" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                           {item.status}
                        </Badge>
                     </div>
                  ))}
                  <Button variant="outline" className="w-full text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-brand-600 border-slate-200 h-9 rounded-lg mt-2 transition-all">
                     View All
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </motion.div>
  );
}

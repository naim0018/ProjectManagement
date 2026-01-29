import { useState } from "react";
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Plus,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Layout,
  FileText,
  Zap,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMemberData = {
  name: "Alex Rivera",
  role: "Senior Full Stack Developer",
  impactScore: 94,
  activeTasks: 12,
  completedTasks: 156,
  hoursLogged: 32,
  projects: [
    { id: 1, name: "Solaris ERP", role: "Module Lead", progress: 78, status: "Active", urgency: "High", color: "brand" },
    { id: 2, name: "Nexus API", role: "Contributor", progress: 45, status: "Review", urgency: "Medium", color: "emerald" },
    { id: 3, name: "Zephyr UI", role: "Design Tech", progress: 100, status: "Completed", urgency: "Normal", color: "violet" },
  ],
  timeline: [
    { time: "09:00 AM", event: "Morning Standup", project: "Solaris ERP" },
    { time: "11:30 AM", event: "API Debugging", project: "Nexus API" },
    { time: "02:00 PM", event: "Final Review", project: "Zephyr UI" },
  ]
};

const TeamMemberDashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Header / Impact Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
        <div className="flex items-center gap-6">
           <Avatar className="h-20 w-20 border-2 border-white shadow-md ring-1 ring-slate-200">
              <AvatarImage src="https://i.pravatar.cc/150?u=alex" />
              <AvatarFallback className="text-xl font-semibold">AR</AvatarFallback>
           </Avatar>
           <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight leading-none mb-1">Welcome back, {teamMemberData.name.split(' ')[0]}!</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                 <Badge variant="secondary" className="bg-brand-50 text-brand-700 hover:bg-brand-100 font-semibold rounded-lg px-2.5 py-0.5">
                    {teamMemberData.role}
                 </Badge>
                 <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal">
                    <Clock size={14} /> Week 4 of Q1 Sprint
                 </div>
              </div>
           </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
           <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-3.5 flex items-center gap-4 hover:scale-[1.02] transition-all cursor-default min-w-[180px]">
              <div className="h-10 w-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 border border-brand-100/50">
                 <Star size={20} fill="currentColor" opacity={0.2} />
              </div>
              <div>
                 <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest">Impact Score</p>
                 <div className="flex items-end gap-1">
                    <span className="text-xl font-semibold text-slate-900 leading-none">{teamMemberData.impactScore}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold mb-0.5">+2.4%</span>
                 </div>
              </div>
           </Card>
           <Button className="h-11 px-6 bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:scale-[1.02] transition-all font-semibold text-white">
              <Zap className="mr-2 h-4 w-4" />
              Log Activity
           </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Tasks active", val: teamMemberData.activeTasks, icon: Layout, color: "text-brand-600", bg: "bg-brand-50" },
           { label: "Completed", val: teamMemberData.completedTasks, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
           { label: "Hours Q1", val: teamMemberData.hoursLogged, icon: FileText, color: "text-violet-600", bg: "bg-violet-50" },
         ].map((stat, i) => (
           <Card key={i} className="border-slate-200 rounded-xl shadow-sm hover:scale-[1.02] transition-all bg-white overflow-hidden p-5 flex items-center gap-5">
              <div className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center border border-slate-100`}>
                 <stat.icon size={22} />
              </div>
              <div>
                 <p className="text-sm font-semibold text-slate-500 leading-none mb-1.5">{stat.label}</p>
                 <h3 className="text-2xl font-semibold text-slate-900">{stat.val}</h3>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Main Project Area */}
         <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="projects" className="w-full">
               <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-2">
                  <TabsList className="bg-transparent h-auto p-0 gap-8 border-none">
                     <TabsTrigger value="projects" className="bg-transparent px-0 py-3 text-sm font-semibold text-slate-400 data-[state=active]:text-brand-600 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-brand-600 rounded-none transition-all">My Projects</TabsTrigger>
                     <TabsTrigger value="requests" className="bg-transparent px-0 py-3 text-sm font-semibold text-slate-400 data-[state=active]:text-brand-600 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-brand-600 rounded-none transition-all">Issue Board</TabsTrigger>
                  </TabsList>
                  <Button variant="ghost" size="sm" className="text-slate-400 font-semibold rounded-lg hover:text-brand-600">
                     View All <ChevronRight size={14} className="ml-1" />
                  </Button>
               </div>

               <TabsContent value="projects" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {teamMemberData.projects.map((project) => (
                        <Card key={project.id} className="border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all bg-white group cursor-pointer overflow-hidden ring-1 ring-slate-100">
                           <CardHeader className="pb-4">
                              <div className="flex items-center justify-between">
                                 <Badge variant="outline" className={`border-none rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                                    project.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-50 text-brand-600'
                                 }`}>
                                    {project.status}
                                 </Badge>
                                 <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{project.urgency}</div>
                              </div>
                              <CardTitle className="text-lg font-semibold text-slate-900 mt-4 group-hover:text-brand-600 transition-colors">{project.name}</CardTitle>
                              <CardDescription className="text-xs font-normal text-slate-500 mt-1">{project.role}</CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-4">
                              <div className="space-y-1.5">
                                 <div className="flex items-center justify-between text-[10px] font-semibold">
                                    <span className="text-slate-400 uppercase tracking-tighter">SPRINT PROGRESS</span>
                                    <span className="text-slate-900">{project.progress}%</span>
                                 </div>
                                 <Progress value={project.progress} className="h-1 shadow-none bg-slate-100" />
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                 <div className="flex -space-x-2">
                                    {[1,2,3].map(i => (
                                       <Avatar key={i} className="h-6 w-6 border-2 border-white">
                                          <AvatarFallback className="text-[8px] font-semibold">U{i}</AvatarFallback>
                                       </Avatar>
                                    ))}
                                 </div>
                                 <Button variant="ghost" size="sm" className="h-7 text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-brand-600 rounded-lg">
                                    Open Module
                                 </Button>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                     <button className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-brand-300 hover:bg-slate-50/50 hover:text-brand-500 transition-all group group-hover:scale-[1.02]">
                        <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-brand-50 transition-colors">
                           <Plus size={24} />
                        </div>
                        <span className="text-sm font-semibold">Join Project Scope</span>
                     </button>
                  </div>
               </TabsContent>
               <TabsContent value="requests">
                  <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl h-64 flex flex-center flex-col items-center justify-center p-8">
                     <Clock className="text-slate-300 mb-3" size={32} />
                     <p className="text-slate-500 text-sm font-semibold">No critical issues assigned for this sprint.</p>
                  </div>
               </TabsContent>
            </Tabs>
         </div>

         {/* Sidebar Timeline */}
         <div className="space-y-6">
            <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
               <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <h3 className="text-base font-semibold text-slate-900">Live Timeline</h3>
               </CardHeader>
               <CardContent className="p-5">
                  <div className="space-y-6 relative">
                     <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-slate-100"></div>
                     {teamMemberData.timeline.map((item, i) => (
                        <div key={i} className="flex gap-4 relative">
                           <div className="h-3 w-3 rounded-full bg-white border-2 border-brand-500 z-10 mt-1 shadow-sm"></div>
                           <div>
                              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter leading-none">{item.time}</p>
                              <p className="text-sm font-semibold text-slate-800 mt-1">{item.event}</p>
                              <p className="text-[11px] font-normal text-slate-500 italic">{item.project}</p>
                           </div>
                        </div>
                     ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-6 text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-brand-600 rounded-lg h-9 border-t border-slate-50">
                     View Calendar
                  </Button>
               </CardContent>
            </Card>

            <Card className="bg-brand-600 text-white rounded-xl shadow-lg shadow-brand-shadow p-5 relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <TrendingUp size={64} />
               </div>
               <h3 className="text-base font-semibold leading-tight">Weekly Peak Efficiency!</h3>
               <p className="text-xs text-brand-100 mt-2 font-normal leading-relaxed">Your output is 12% higher than average this week. Keep the momentum going!</p>
               <Button className="mt-4 h-8 bg-white text-brand-600 hover:bg-brand-50 text-[10px] font-semibold uppercase tracking-widest rounded-lg border-none shadow-sm transition-all">
                  Claim Reward
               </Button>
            </Card>
         </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberDashboard;

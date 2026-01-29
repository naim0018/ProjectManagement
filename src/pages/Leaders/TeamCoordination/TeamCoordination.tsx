import { 
  Mail, 
  Phone, 
  MoreHorizontal, 
  Search, 
  Filter,
  TrendingUp,
  Award,
  Clock,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const teamData = [
  {
    id: "M1",
    name: "Alex Rivera",
    role: "Frontend Lead",
    email: "alex.r@techflow.com",
    activeProjects: 3,
    efficiency: 94,
    avatar: "https://i.pravatar.cc/150?u=1",
    status: "Busy",
    lastActive: "Now"
  },
  {
    id: "M2",
    name: "Sarah Chen",
    role: "Backend Architect",
    email: "sarah.c@techflow.com",
    activeProjects: 2,
    efficiency: 88,
    avatar: "https://i.pravatar.cc/150?u=4",
    status: "Active",
    lastActive: "15m ago"
  },
  {
    id: "M3",
    name: "Mike Ross",
    role: "UI/UX Designer",
    email: "mike.r@techflow.com",
    activeProjects: 4,
    efficiency: 76,
    avatar: "https://i.pravatar.cc/150?u=3",
    status: "Inactive",
    lastActive: "2h ago"
  },
  {
    id: "M4",
    name: "Emily Watson",
    role: "QA Engineer",
    email: "emily.w@techflow.com",
    activeProjects: 1,
    efficiency: 91,
    avatar: "https://i.pravatar.cc/150?u=7",
    status: "Active",
    lastActive: "Now"
  },
  {
    id: "M5",
    name: "David Kim",
    role: "DevOps Engineer",
    email: "david.k@techflow.com",
    activeProjects: 5,
    efficiency: 82,
    avatar: "https://i.pravatar.cc/150?u=6",
    status: "Busy",
    lastActive: "5m ago"
  },
];

export default function TeamCoordination() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeam = teamData.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">Team Coordination</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor project allocations and team performance metrics.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="rounded-xl h-11 border-slate-200 shadow-sm font-semibold">
              <Mail className="mr-2 h-4 w-4" /> Broadcast
           </Button>
           <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl h-11 px-6 shadow-lg shadow-brand-500/20 active:scale-95 transition-all">
              Invite Member
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-slate-200 rounded-2xl shadow-sm bg-white p-4">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <TrendingUp size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">86.2%</p>
               </div>
            </div>
         </Card>
         <Card className="border-slate-200 rounded-2xl shadow-sm bg-white p-4">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Award size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Top Performer</p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">Alex Rivera</p>
               </div>
            </div>
         </Card>
         <Card className="border-slate-200 rounded-2xl shadow-sm bg-white p-4">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Briefcase size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Active Tasks</p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">15</p>
               </div>
            </div>
         </Card>
      </div>

      <Card className="border-slate-200 rounded-2xl shadow-sm bg-white overflow-hidden">
        <CardHeader className="p-4 border-b border-slate-100 bg-slate-50/50">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="relative w-full md:w-96">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <Input
                 placeholder="Search team members..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-10 h-10 bg-white border-slate-200 focus:ring-brand-500/10 rounded-xl"
               />
             </div>
             <Button variant="outline" className="h-10 rounded-xl border-slate-200 bg-white text-slate-600 gap-2">
                <Filter size={16} /> Filter
             </Button>
           </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="grid grid-cols-1 divide-y divide-slate-100">
              {filteredTeam.map((member) => (
                <div key={member.id} className="p-6 hover:bg-slate-50/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <Avatar className="h-14 w-14 border-2 border-white shadow-md ring-1 ring-slate-100 group-hover:scale-105 transition-all">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                         </Avatar>
                         <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-4 border-white shadow-sm ${
                           member.status === 'Active' ? 'bg-emerald-500' : 
                           member.status === 'Busy' ? 'bg-rose-500' : 'bg-slate-300'
                         }`} />
                      </div>
                      <div>
                         <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                            <Badge variant="outline" className={`border-none font-bold text-[9px] px-2 rounded-md ${
                              member.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                              member.status === 'Busy' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'
                            }`}>
                              {member.status}
                            </Badge>
                         </div>
                         <p className="text-sm font-semibold text-brand-600">{member.role}</p>
                         <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                               <Mail size={12} /> {member.email}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                               <Clock size={12} /> {member.lastActive}
                            </span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-8 md:gap-12">
                      <div className="text-center">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Projects</p>
                         <p className="text-lg font-bold text-slate-900">{member.activeProjects}</p>
                      </div>
                      <div className="w-32 md:w-48 space-y-2">
                         <div className="flex justify-between items-end">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                            <span className="text-sm font-bold text-brand-600">{member.efficiency}%</span>
                         </div>
                         <Progress value={member.efficiency} className="h-1.5 bg-slate-100" />
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-brand-50 hover:text-brand-600">
                            <Phone size={16} />
                         </Button>
                         <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100">
                            <MoreHorizontal size={18} />
                         </Button>
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

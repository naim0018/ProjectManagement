import { 
  Plus, 
  Search, 
  MoreVertical, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  LayoutGrid,
  List
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const projectsData = [
  {
    id: "P1",
    name: "Enterprise Cloud Migration",
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=1" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=2" },
      { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=3" },
    ],
    status: "In Progress",
    priority: "High",
    deadline: "Dec 15, 2024",
    progress: 65,
  },
  {
    id: "P2",
    name: "AI Customer Support Bot",
    team: [
      { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=4" },
      { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=5" },
    ],
    status: "Planning",
    priority: "Medium",
    deadline: "Jan 10, 2025",
    progress: 15,
  },
  {
    id: "P3",
    name: "Legacy System Audit",
    team: [
      { name: "David Kim", avatar: "https://i.pravatar.cc/150?u=6" },
    ],
    status: "Completed",
    priority: "Low",
    deadline: "Nov 20, 2024",
    progress: 100,
  },
  {
    id: "P4",
    name: "Mobile App V3 Refresh",
    team: [
      { name: "Emily Watson", avatar: "https://i.pravatar.cc/150?u=7" },
      { name: "Chris Evans", avatar: "https://i.pravatar.cc/150?u=8" },
      { name: "Tom Hardy", avatar: "https://i.pravatar.cc/150?u=9" },
    ],
    status: "On Hold",
    priority: "High",
    deadline: "Feb 05, 2025",
    progress: 42,
  },
];

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredProjects = projectsData.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">Project Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track, manage and coordinate your organization's projects.</p>
        </div>
        <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl h-11 px-6 shadow-lg shadow-brand-500/20 active:scale-95 transition-all">
          <Plus className="mr-2 h-5 w-5" /> New Project
        </Button>
      </div>

      <Card className="border-slate-200 rounded-2xl shadow-sm bg-white overflow-hidden">
        <CardHeader className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search projects by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-white border-slate-200 focus:ring-brand-500/10 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <Button 
                variant={viewMode === "list" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 px-3 rounded-lg text-xs font-bold ${viewMode === "list" ? "bg-white shadow-sm" : "text-slate-500"}`}
              >
                <List size={14} className="mr-1.5" /> List
              </Button>
              <Button 
                variant={viewMode === "grid" ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-8 px-3 rounded-lg text-xs font-bold ${viewMode === "grid" ? "bg-white shadow-sm" : "text-slate-500"}`}
              >
                <LayoutGrid size={14} className="mr-1.5" /> Grid
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {viewMode === "list" ? (
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow className="border-slate-100">
                  <TableHead className="px-6 h-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project</TableHead>
                  <TableHead className="px-6 h-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Team</TableHead>
                  <TableHead className="px-6 h-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Progress</TableHead>
                  <TableHead className="px-6 h-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Priority</TableHead>
                  <TableHead className="px-6 h-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</TableHead>
                  <TableHead className="px-6 h-12 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{project.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-1">
                          <Calendar size={10} /> {project.deadline}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center justify-center -space-x-2">
                        {project.team.map((m, i) => (
                          <Avatar key={i} className="h-7 w-7 border-2 border-white shadow-sm shrink-0">
                            <AvatarImage src={m.avatar} />
                            <AvatarFallback className="text-[10px]">{m.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="w-32 mx-auto space-y-1.5">
                        <div className="flex justify-between text-[9px] font-bold text-slate-500">
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1 bg-slate-100" />
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      <Badge variant="outline" className={`border-none font-bold text-[9px] px-2 rounded-md ${
                        project.priority === "High" ? "bg-rose-50 text-rose-600" :
                        project.priority === "Medium" ? "bg-amber-50 text-amber-600" :
                        "bg-emerald-50 text-emerald-600"
                      }`}>
                        {project.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {project.status === "Completed" ? <CheckCircle2 className="text-emerald-500" size={14} /> :
                         project.status === "On Hold" ? <Clock className="text-slate-400" size={14} /> :
                         <AlertCircle className="text-brand-500" size={14} />}
                        <span className="text-xs font-semibold text-slate-700">{project.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <MoreVertical size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-50/30">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="border-slate-200 rounded-2xl shadow-sm bg-white hover:scale-[1.03] transition-all cursor-pointer group">
                  <CardHeader className="p-4 pb-2 border-none">
                    <div className="flex justify-between items-start">
                      <Badge className={`border-none font-bold text-[9px] px-2 rounded-md ${
                        project.priority === "High" ? "bg-rose-100 text-rose-600" :
                        project.priority === "Medium" ? "bg-amber-100 text-amber-600" :
                        "bg-emerald-100 text-emerald-600"
                      }`}>
                        {project.priority}
                      </Badge>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">#{project.id}</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 mt-3 group-hover:text-brand-600 transition-colors">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex -space-x-2">
                         {project.team.map((m, i) => (
                           <Avatar key={i} className="h-8 w-8 border-2 border-white shadow-sm ring-1 ring-slate-100">
                              <AvatarImage src={m.avatar} />
                              <AvatarFallback>{m.name[0]}</AvatarFallback>
                           </Avatar>
                         ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{project.team.length} members</span>
                    </div>
                    
                    <div className="mt-5 space-y-2">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Progress</span>
                          <span className="text-sm font-bold text-slate-900">{project.progress}%</span>
                       </div>
                       <Progress value={project.progress} className="h-1.5 bg-slate-100" />
                    </div>

                    <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-50">
                       <div className="flex items-center gap-1.5 text-slate-500">
                          <Calendar size={12} />
                          <span className="text-[10px] font-bold">{project.deadline}</span>
                       </div>
                       <div className="flex items-center gap-1 text-slate-800">
                          <CheckCircle2 size={12} className={project.status === 'Completed' ? 'text-emerald-500' : 'text-slate-300'} />
                          <span className="text-[10px] font-bold">{project.status}</span>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

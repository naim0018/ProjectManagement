import { motion } from "framer-motion";
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Clock, 
  Users, 
  AlertCircle,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { format, differenceInDays, differenceInHours, differenceInMinutes, parseISO, isAfter } from "date-fns";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const projectsData = [
  {
    id: 1,
    name: "Solaris ERP",
    category: "Development",
    status: "Active",
    priority: "High",
    progress: 78,
    teamSize: 5,
    deadline: "2026-02-05T00:00:00",
    role: "Module Lead",
    tasks: { completed: 45, total: 60 }
  },
  {
    id: 2,
    name: "Nexus API Bridge",
    category: "Backend",
    status: "In Review",
    priority: "Medium",
    progress: 45,
    teamSize: 3,
    deadline: "2026-02-15T00:00:00",
    role: "Contributor",
    tasks: { completed: 12, total: 30 }
  },
  {
    id: 3,
    name: "Zephyr UI Lib",
    category: "Design System",
    status: "Completed",
    priority: "Normal",
    progress: 100,
    teamSize: 8,
    deadline: "2026-02-28T00:00:00",
    role: "Design Tech",
    tasks: { completed: 80, total: 80 }
  },
  {
    id: 4,
    name: "Aurora Analytics",
    category: "Data",
    status: "Active",
    priority: "High",
    progress: 25,
    teamSize: 4,
    deadline: "2026-02-04T12:00:00",
    role: "Full Stack",
    tasks: { completed: 5, total: 20 }
  }
];

const TimeRemaining = ({ deadline }: { deadline: string }) => {
  const targetDate = useMemo(() => parseISO(deadline), [deadline]);
  const now = new Date();
  
  const isPast = !isAfter(targetDate, now);
  const days = Math.abs(differenceInDays(targetDate, now));
  const hours = Math.abs(differenceInHours(targetDate, now)) % 24;
  const minutes = Math.abs(differenceInMinutes(targetDate, now)) % 60;

  const isUrgent = days < 3 && !isPast;

  return (
    <div className={`flex flex-col gap-1 ${isUrgent ? "text-rose-600" : "text-slate-600"}`}>
       <div className="flex items-center gap-2">
          <Calendar size={14} className={isUrgent ? "text-rose-500" : "text-slate-400"} />
          <span className="text-xs font-bold whitespace-nowrap">
             {format(targetDate, "EEEE, dd MMMM, yyyy")}
          </span>
       </div>
       <div className="flex items-center gap-2">
          <Clock size={14} className={isUrgent ? "text-rose-500 animate-pulse" : "text-slate-400"} />
          <span className="text-[11px] font-bold uppercase tracking-wider">
             {isPast ? "Overdue: " : "Remaining: "}
             {days > 0 && `${days}d `}
             {hours > 0 && `${hours}h `}
             {minutes}m
          </span>
       </div>
    </div>
  );
};

const MyProjects = () => {
  const navigate = useNavigate();
  const sortedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => {
      const dateA = parseISO(a.deadline).getTime();
      const dateB = parseISO(b.deadline).getTime();
      return dateA - dateB;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">My Projects</h1>
          <p className="text-sm text-slate-500">Manage and track your active project contributions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 text-slate-600 border-slate-200">
            <Filter size={16} className="mr-2" /> Filter
          </Button>
          <Button className="h-10 bg-brand-600 hover:bg-brand-700 text-white">
            <Plus size={16} className="mr-2" /> Request Scope
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MetricsCard 
          title="Total Projects"
          value={projectsData.length}
          icon={FolderKanban}
          trend="+3 new"
          up={true}
          subtitle="started this month"
          color="brand"
        />
        <MetricsCard 
          title="Active Now"
          value="4"
          icon={Clock}
          trend="Currently working"
          up={true}
          subtitle="on track"
          color="emerald"
        />
        <MetricsCard 
          title="Upcoming Deadlines"
          value="2"
          icon={AlertCircle}
          trend="Due in < 3 days"
          up={false}
          subtitle="needs attention"
          color="amber"
        />
        <MetricsCard 
          title="Collaborators"
          value="28"
          icon={Users}
          trend="Active team"
          up={true}
          subtitle="across 4 projects"
          color="violet"
        />
      </div>


      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          placeholder="Search projects by name, role or technology..." 
          className="pl-10 h-12 bg-white border-slate-200 focus:ring-brand-500 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedProjects.map((project) => (
          <Card 
            key={project.id} 
            className="border-slate-200 hover:shadow-md transition-all bg-white group overflow-hidden cursor-pointer active:scale-[0.98]"
            onClick={() => navigate(`project-details/${project.id}`)}
          >
            <div className={`h-1.5 w-full ${
              project.status === 'Completed' ? 'bg-emerald-500' : 
              project.status === 'In Review' ? 'bg-amber-500' : 'bg-brand-500'
            }`} />
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between gap-2 overflow-hidden">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
                      {project.name}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase tracking-wider shrink-0">
                      {project.category}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 shrink-0">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Project Stats</DropdownMenuItem>
                      <DropdownMenuItem className="text-rose-600">Leave Project</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="text-sm font-medium text-slate-500">
                  {project.role}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DEADLINE & REMAINING TIME</p>
                    <TimeRemaining deadline={project.deadline} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">STATUS</p>
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${
                          project.status === 'Completed' ? 'bg-emerald-500' : 
                          project.status === 'In Review' ? 'bg-amber-500' : 'bg-brand-500'
                        }`} />
                        <span className="text-xs font-semibold text-slate-700">{project.status}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PRIORITY</p>
                      <Badge className={`${
                        project.priority === 'High' ? 'bg-rose-50 text-rose-600' : 
                        project.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                      } border-none text-[10px] h-5`}>
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">SPRINT PROGRESS</p>
                      <span className="text-xs font-bold text-slate-900">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} showValue className="h-2.5 bg-slate-100" />

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      <span>{project.tasks.completed}/{project.tasks.total} Tasks</span>
                      <span>{project.tasks.total - project.tasks.completed} Left</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div className="flex -space-x-2">
                      {[...Array(project.teamSize)].slice(0, 4).map((_, i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-white ring-1 ring-slate-100">
                          <AvatarImage src={`https://i.pravatar.cc/100?u=proj${project.id}-u${i}`} />
                          <AvatarFallback className="text-[10px]">U{i}</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.teamSize > 4 && (
                        <div className="h-8 w-8 rounded-full bg-slate-50 border-2 border-white ring-1 ring-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          +{project.teamSize - 4}
                        </div>
                      )}
                    </div>
                    <Button className="h-9 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 rounded-lg">
                      Open Module
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default MyProjects;


import { 
  MoreVertical, 
  Calendar,
  Clock,
  Users,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel 
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { format, differenceInDays, differenceInHours, parseISO, isAfter } from "date-fns";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  category: string;
  status: string;
  priority: string;
  progress: number;
  teamSize: number;
  deadline: string;
  role: string;
  tasks: { completed: number; total: number };
}

interface ProjectsTableProps {
  projects: Project[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TimeRemaining = ({ deadline }: { deadline: string }) => {
  const targetDate = useMemo(() => parseISO(deadline), [deadline]);
  const now = new Date();
  
  const isPast = !isAfter(targetDate, now);
  const days = Math.abs(differenceInDays(targetDate, now));
  const hours = Math.abs(differenceInHours(targetDate, now)) % 24;

  const isUrgent = days < 3 && !isPast;

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${isUrgent ? 'bg-rose-500 animate-pulse' : isPast ? 'bg-slate-300' : 'bg-emerald-500'}`} />
      <span className={`text-xs font-semibold ${isUrgent ? 'text-rose-600' : isPast ? 'text-slate-400' : 'text-slate-600'}`}>
        {isPast ? 'Overdue' : days > 0 ? `${days}d ${hours}h` : `${hours}h`}
      </span>
    </div>
  );
};

export const ProjectsTable = ({ projects, searchTerm, onSearchChange }: ProjectsTableProps) => {
  const navigate = useNavigate();

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = parseISO(a.deadline).getTime();
        const dateB = parseISO(b.deadline).getTime();
        return dateA - dateB;
      });
  }, [projects, searchTerm]);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Active': 'bg-brand-50 text-brand-700',
      'In Review': 'bg-amber-50 text-amber-700',
      'Completed': 'bg-emerald-50 text-emerald-700',
      'Blocked': 'bg-rose-50 text-rose-700',
    };
    return styles[status] || 'bg-slate-100 text-slate-600';
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      'High': 'bg-rose-50 text-rose-600 border-rose-200',
      'Medium': 'bg-amber-50 text-amber-600 border-amber-200',
      'Normal': 'bg-slate-50 text-slate-600 border-slate-200',
      'Low': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    };
    return styles[priority] || 'bg-slate-50 text-slate-600';
  };

  return (
    <Card className="border-slate-200 rounded-xl shadow-sm bg-white py-0 overflow-hidden gap-0">
      <CardHeader className="border-b border-slate-100 bg-slate-50/30 pt-4 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-slate-900">Project Registry</CardTitle>
          <div className="relative w-full md:w-80">
            <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by name, role or category..." 
              className="pl-10 h-10 rounded-lg border-slate-200"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100">
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Project</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Role</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Progress</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Priority</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Status</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Deadline</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Team</TableHead>
              <TableHead className="px-6 h-12 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow 
                key={project.id} 
                className="border-slate-100 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                onClick={() => navigate(`project-details/${project.id}`)}
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      project.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                      project.status === 'In Review' ? 'bg-amber-100 text-amber-600' :
                      'bg-brand-100 text-brand-600'
                    }`}>
                      <AlertCircle size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm leading-tight">{project.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{project.category}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-xs font-semibold text-slate-600">{project.role}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="w-32 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{project.progress}%</span>
                      <span className="text-[10px] text-slate-400">{project.tasks.completed}/{project.tasks.total}</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5 bg-slate-100" />
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="outline" className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${getPriorityBadge(project.priority)}`}>
                    {project.priority}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border-none ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Calendar size={12} />
                      <span className="text-xs font-medium">{format(parseISO(project.deadline), "dd MMM yyyy")}</span>
                    </div>
                    <TimeRemaining deadline={project.deadline} />
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(project.teamSize, 3))].map((_, i) => (
                      <Avatar key={i} className="h-7 w-7 border-2 border-white ring-1 ring-slate-100">
                        <AvatarImage src={`https://i.pravatar.cc/100?u=proj${project.id}-u${i}`} />
                        <AvatarFallback className="text-[9px] font-bold">U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.teamSize > 3 && (
                      <div className="h-7 w-7 rounded-full bg-slate-100 border-2 border-white ring-1 ring-slate-50 flex items-center justify-center text-[9px] font-bold text-slate-500">
                        +{project.teamSize - 3}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-200 shadow-xl">
                      <DropdownMenuLabel className="px-3 pt-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase">Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-slate-700">
                        <ExternalLink size={14} /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-slate-700">
                        <Clock size={14} /> Activity Log
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-100" />
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-rose-600 hover:bg-rose-50">
                        <Users size={14} /> Leave Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

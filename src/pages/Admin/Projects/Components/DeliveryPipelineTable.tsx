import {
  FolderKanban,
  Search,
  MoreVertical,
  Calendar,
  Clock,
  Building2,
  AlertCircle,
  XCircle,
  Layers,
  Code2,
  Database,
  Cpu,
  Smartphone,
  Filter,
  UserPlus,
  RefreshCcw,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface Project {
  id: string;
  clientName: string;
  profileName: string;
  assignedOrg: string;
  assignments: {
    ui: string;
    frontend: string;
    backend: string;
    ai: string;
    app: string;
  };
  orderDate: string;
  deliverDate: string;
  status: string;
  progress: number;
  revision: number;
  priority: string;
}

interface DeliveryPipelineTableProps {
  projects: Project[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const DeliveryPipelineTable = ({
  projects,
  searchTerm,
  onSearchChange,
}: DeliveryPipelineTableProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "In Progress":
        return {
          color: "bg-blue-50 text-blue-700 border-blue-100",
          dot: "bg-blue-500",
        };
      case "Revision":
        return {
          color: "bg-amber-50 text-amber-700 border-amber-100",
          dot: "bg-amber-500",
        };
      case "Canceled":
        return {
          color: "bg-rose-50 text-rose-700 border-rose-100",
          dot: "bg-rose-500",
        };
      default:
        return {
          color: "bg-slate-50 text-slate-700 border-slate-100",
          dot: "bg-slate-500",
        };
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm bg-white py-0 overflow-hidden rounded-xl gap-0">
      <CardHeader className="pt-4 pb-2 border-b border-slate-100 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-600 border border-slate-100">
              <FolderKanban size={20} />
            </div>
            <div>
              <div className="p-0 border-none bg-transparent">
                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                  Delivery Pipeline
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Real-time oversight of all organization workloads.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input
                placeholder="Search by profile, client, or cluster..."
                className="pl-11 h-11 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 rounded-xl text-sm transition-all"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="h-11 px-4 border-slate-200 rounded-xl flex items-center gap-2 text-slate-500 font-semibold"
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="min-w-[1500px]">
            <TableHeader className="bg-slate-50/30">
              <TableRow className="border-slate-100/50 hover:bg-transparent">
                <TableHead className="px-6 h-14 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Profile Name
                </TableHead>
                <TableHead className="px-6 h-14 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Client Name
                </TableHead>
                <TableHead className="px-6 h-14 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Organization & Cluster
                </TableHead>
                <TableHead className="px-6 h-14 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Progress
                </TableHead>
                <TableHead className="px-6 h-14 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </TableHead>
                <TableHead className="px-6 h-14 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Order / Delivery
                </TableHead>
                <TableHead className="px-6 h-14 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Execution Squad
                </TableHead>
                <TableHead className="px-6 h-14 text-right pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects
                .filter((p) =>
                  p.profileName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
                )
                .map((project) => {
                  const status = getStatusConfig(project.status);
                  return (
                    <TableRow
                      key={project.id}
                      className="border-slate-50 hover:bg-slate-50/30 transition-all cursor-default group"
                    >
                      {/* Profile Name */}
                      <TableCell className="px-6 py-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-900 text-white leading-none">
                              {project.id}
                            </span>
                            <span className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                              {project.profileName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-[9px] px-1.5 py-0 border-none font-bold uppercase tracking-tight ${
                                project.priority === "High"
                                  ? "bg-rose-50 text-rose-600"
                                  : project.priority === "Medium"
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {project.priority} Prio
                            </Badge>
                            <span className="text-slate-300 text-xs">•</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Rev {project.revision}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Client Name */}
                      <TableCell className="px-6 py-5">
                        <span className="text-sm font-bold text-slate-700">
                          {project.clientName}
                        </span>
                      </TableCell>

                      {/* Assigned Organization */}
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                            <Building2 size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 leading-none mb-1">
                              {project.assignedOrg}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              Main Cluster
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Progress */}
                      <TableCell className="px-6 py-5">
                        <div className="min-w-[160px] space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Current Velocity
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                              {project.progress}%
                            </span>
                          </div>
                          <Progress
                            value={project.progress}
                            className="h-1.5 bg-slate-100 overflow-hidden rounded-full [&>div]:bg-brand-600"
                          />
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-6 py-5">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-transparent font-bold text-[10px] uppercase tracking-widest ${status.color}`}
                        >
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${status.dot} animate-pulse`}
                          />
                          {project.status}
                        </div>
                      </TableCell>

                      {/* Timeline */}
                      <TableCell className="px-6 py-5">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                            <Calendar size={14} className="text-slate-300" />
                            {project.orderDate}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-brand-600 font-extrabold italic">
                            <Clock size={14} className="text-brand-400" />
                            {project.deliverDate}
                          </div>
                        </div>
                      </TableCell>

                      {/* Assigned Member */}
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center justify-center -space-x-3">
                          <TooltipProvider delayDuration={0}>
                            {[
                              {
                                icon: Layers,
                                name: project.assignments.ui,
                                role: "UI Design",
                                bg: "indigo",
                              },
                              {
                                icon: Code2,
                                name: project.assignments.frontend,
                                role: "Frontend",
                                bg: "emerald",
                              },
                              {
                                icon: Database,
                                name: project.assignments.backend,
                                role: "Backend",
                                bg: "amber",
                              },
                              {
                                icon: Cpu,
                                name: project.assignments.ai,
                                role: "AI/ML",
                                bg: "violet",
                              },
                              {
                                icon: Smartphone,
                                name: project.assignments.app,
                                role: "Mobile",
                                bg: "rose",
                              },
                            ].map((m, idx) => (
                              <Tooltip key={idx}>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`h-10 w-10 rounded-full border-2 border-white bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 cursor-pointer shadow-sm hover:-translate-y-1 transition-all`}
                                  >
                                    <m.icon size={14} />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-900 border-none text-white p-3 rounded-xl shadow-2xl">
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 leading-none">
                                    {m.role}
                                  </p>
                                  <p className="text-sm font-bold leading-none">
                                    {m.name}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                            <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-50 text-slate-400 flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-900 hover:text-white transition-all">
                              <Plus size={14} />
                            </div>
                          </TooltipProvider>
                        </div>
                      </TableCell>

                      {/* Options */}
                      <TableCell className="px-6 py-5 text-right pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-10 w-10 p-0 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                            >
                              <MoreVertical size={20} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-56 p-2 rounded-2xl border-slate-200 shadow-2xl"
                          >
                            <DropdownMenuLabel className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                              Global Management
                            </DropdownMenuLabel>
                            <DropdownMenuItem className="rounded-xl gap-3 font-bold text-sm cursor-pointer py-2.5">
                              <RefreshCcw
                                size={16}
                                className="text-brand-500"
                              />{" "}
                              Reassign Organization
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl gap-3 font-bold text-sm cursor-pointer py-2.5">
                              <UserPlus
                                size={16}
                                className="text-emerald-500"
                              />{" "}
                              Reassign Members
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1.5" />
                            <DropdownMenuItem className="rounded-xl gap-3 font-bold text-sm cursor-pointer py-2.5 text-slate-700">
                              <AlertCircle
                                size={16}
                                className="text-amber-500"
                              />{" "}
                              Adjust Priority
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl gap-3 font-bold text-sm text-rose-600 focus:text-rose-600 cursor-pointer py-2.5 bg-rose-50/0 hover:bg-rose-50/100">
                              <XCircle size={16} /> Terminate Scope
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>

        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/10">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            End of registry
          </p>
          <div className="flex items-center gap-2 text-brand-600 font-bold text-sm cursor-pointer hover:gap-3 transition-all">
            System Documentation <ChevronRight size={16} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

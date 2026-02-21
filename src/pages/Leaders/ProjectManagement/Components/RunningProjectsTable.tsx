import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Project {
  id: string;
  name: string;
  clientName: string;
  profileName: string;
  startDate: string;
  deliveryDate: string;
  value: string;
  progress: number;
  currentPhase: string;
  prevPhase: string;
  assignedMember?: {
    name: string;
    avatar: string;
  };
}

interface RunningProjectsTableProps {
  projects: Project[];
}

export const RunningProjectsTable = ({ projects }: RunningProjectsTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-slate-50/50">
        <TableRow className="border-slate-100 h-10 hover:bg-transparent">
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Project Name</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Client Name</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Profile Name</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Starting Date</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Delivery Date</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Project Value</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">Previous Phase</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">Running Phase</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-right">Assigned Member</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors h-20">
            <TableCell className="px-4 py-3">
               <p className="font-semibold text-slate-900 text-sm">{project.name}</p>
               <div className="w-24 mt-2">
                 <Progress value={project.progress} className="h-1 bg-slate-100 shadow-none" />
                 <span className="text-[9px] font-semibold text-slate-400 uppercase mt-1">{project.progress}% Done</span>
               </div>
            </TableCell>
            <TableCell className="px-4 py-3 text-sm text-slate-600">{project.clientName}</TableCell>
            <TableCell className="px-4 py-3 text-sm text-brand-600 font-medium">{project.profileName}</TableCell>
            <TableCell className="px-4 py-3 text-sm text-slate-500">{project.startDate}</TableCell>
            <TableCell className="px-4 py-3 text-sm text-rose-500 font-semibold">{project.deliveryDate}</TableCell>
            <TableCell className="px-4 py-3 text-sm text-emerald-600 font-bold">{project.value}</TableCell>
            <TableCell className="px-4 py-3 text-center">
               <Badge variant="ghost" className="bg-slate-100 text-slate-500 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md border-none">
                 {project.prevPhase}
               </Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-center">
               <div className="flex items-center justify-center gap-1.5 bg-brand-50 text-brand-600 px-2 py-1 rounded-md border border-brand-100 inline-flex mx-auto">
                  <div className="size-1.5 rounded-full bg-brand-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase">{project.currentPhase}</span>
               </div>
            </TableCell>
            <TableCell className="px-4 py-3 text-right">
               <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                     <p className="text-sm font-semibold text-slate-800 leading-tight">{project.assignedMember?.name}</p>
                     <p className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">Asset Lead</p>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-1 ring-slate-100">
                     <AvatarImage src={project.assignedMember?.avatar} />
                     <AvatarFallback>{project.assignedMember?.name[0]}</AvatarFallback>
                  </Avatar>
               </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

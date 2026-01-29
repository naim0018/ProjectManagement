import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  name: string;
  clientName: string;
  profileName: string;
  startDate: string;
  deliveryDate: string;
  value: string;
  currentPhase: string;
}

interface QueueTableProps {
  projects: Project[];
}

export const QueueTable = ({ projects }: QueueTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-slate-50/30">
        <TableRow className="border-slate-100 h-12">
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Project Name</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Client Name</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Profile Name</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">Phase</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Starting Date</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Delivery Date</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">Project Value</TableHead>
          <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-right">Assign Option</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors h-16">
            <TableCell className="px-6 py-4 font-semibold text-sm text-slate-900">{project.name}</TableCell>
            <TableCell className="px-6 py-4 text-sm text-slate-600">{project.clientName}</TableCell>
            <TableCell className="px-6 py-4 text-sm text-brand-600 font-medium">{project.profileName}</TableCell>
            <TableCell className="px-6 py-4 text-center">
               <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md border border-amber-100">
                  <div className="size-1.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-bold uppercase">{project.currentPhase}</span>
               </div>
            </TableCell>
            <TableCell className="px-6 py-4 text-sm text-slate-500">{project.startDate}</TableCell>
            <TableCell className="px-6 py-4 text-sm text-rose-500 font-semibold">{project.deliveryDate}</TableCell>
            <TableCell className="px-6 py-4 text-center text-sm text-emerald-600 font-bold">{project.value}</TableCell>
            <TableCell className="px-6 py-4 text-right">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg h-9 px-4 active:scale-95 transition-all text-xs">
                 Assign Member
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

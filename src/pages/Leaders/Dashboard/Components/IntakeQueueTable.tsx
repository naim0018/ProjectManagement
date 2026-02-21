import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface IntakeProject {
  id: string;
  name: string;
  clientName: string;
  profileName: string;
  startDate: string;
  deliveryDate: string;
  value: string;
  currentPhase: string;
}

interface IntakeQueueTableProps {
  projects: IntakeProject[];
  pendingCount: number;
}

export const IntakeQueueTable = ({ projects, pendingCount }: IntakeQueueTableProps) => {
  return (
    <Card className="lg:col-span-2 border-slate-200 rounded-xl shadow-sm bg-white py-0 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 pt-4 pb-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 leading-none">Newly Added (Queue)</h2>
          <p className="text-sm text-slate-500 font-normal mt-1.5">Projects waiting for a lead member assignment.</p>
        </div>
        <Badge className="bg-amber-50 text-amber-700 border-none font-semibold px-2 py-1 rounded-lg text-xs">
          {pendingCount} Pending
        </Badge>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/30">
            <TableRow className="hover:bg-transparent border-slate-100 h-10">
              <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">Client Name</TableHead>
              <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">Profile Name</TableHead>
              <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">Phase</TableHead>
              <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">Start Date</TableHead>
              <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">Deliv. Date</TableHead>
              <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap text-center">Value</TableHead>
              <TableHead className="px-6 text-[10px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors h-16">
                <TableCell className="px-4 py-3 text-sm font-semibold text-slate-900 whitespace-nowrap">{project.clientName}</TableCell>
                <TableCell className="px-4 py-3 text-[11px] font-semibold text-brand-600 uppercase tracking-tight whitespace-nowrap">{project.profileName}</TableCell>
                <TableCell className="px-4 py-3 text-center">
                   <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-100">
                      <div className="size-1 rounded-full bg-amber-500" />
                      <span className="text-[10px] font-bold uppercase">{project.currentPhase}</span>
                   </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 whitespace-nowrap">{project.startDate}</TableCell>
                <TableCell className="px-4 py-3 text-center text-[11px] font-semibold text-rose-500 whitespace-nowrap">{project.deliveryDate}</TableCell>
                <TableCell className="px-4 py-3 text-center text-sm font-semibold text-emerald-600 whitespace-nowrap">{project.value}</TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Button variant="ghost" className="h-8 px-3 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg">
                    Assign Member
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight, Clock } from "lucide-react";

const pendingProjects = [
    {
      id: "p-101",
      name: "Alpha Core",
      org: "TechFlow",
      value: "$45k",
      priority: "High",
    },
    {
      id: "p-102",
      name: "Data Sync",
      org: "GlobalLog",
      value: "$12k",
      priority: "Medium",
    },
    {
      id: "p-103",
      name: "Secure Vault",
      org: "ApexHealth",
      value: "$85k",
      priority: "Critical",
    },
  ];

export const PendingProjectsTable = () => {
  return (
    <Card className="lg:col-span-2 border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Queue Management
          </h2>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Projects awaiting initiation approval.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-brand-600 font-semibold rounded-lg"
        >
          Full Queue <ChevronRight size={14} className="ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50/30">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="px-6 h-10 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Project
              </TableHead>
              <TableHead className="px-6 h-10 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Client
              </TableHead>
              <TableHead className="px-6 h-10 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-right">
                Est. Value
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingProjects.map((p) => (
              <TableRow
                key={p.id}
                className="border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer group"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm leading-tight">
                        {p.name}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter mt-0.5">
                        {p.priority} Priority
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-600">
                    {p.org}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <span className="text-sm font-semibold text-slate-900">
                    {p.value}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

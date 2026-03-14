import { 
  MoreVertical, 
  Calendar,
  DollarSign,
  Briefcase,
  ExternalLink,
  User,
  Layers
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel 
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface NewProject {
  id: string;
  name: string;
  clientName: string;
  profileName: string;
  deliveryDate: string;
  value: string;
  status: string;
  category: string;
}

interface NewProjectsTableProps {
  projects: NewProject[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const NewProjectsTable = ({ projects, searchTerm, onSearchChange }: NewProjectsTableProps) => {
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Open': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'In Progress': 'bg-brand-50 text-brand-700 border-brand-200',
      'At Risk': 'bg-rose-50 text-rose-700 border-rose-200',
      'Review Required': 'bg-amber-50 text-amber-700 border-amber-200',
      'Assigned': 'bg-violet-50 text-violet-700 border-violet-200',
      'Closed': 'bg-slate-100 text-slate-600 border-slate-200',
    };
    return styles[status] || 'bg-slate-100 text-slate-600';
  };

  const getCategoryBadge = (category: string) => {
    const styles: Record<string, string> = {
      'DevOps': 'bg-violet-50 text-violet-600',
      'AI/ML': 'bg-cyan-50 text-cyan-600',
      'FinTech': 'bg-emerald-50 text-emerald-600',
      'Dashboard': 'bg-amber-50 text-amber-600',
      'Mobile': 'bg-rose-50 text-rose-600',
      'Healthcare': 'bg-teal-50 text-teal-600',
    };
    return styles[category] || 'bg-slate-100 text-slate-600';
  };

  return (
    <Card className="border-slate-200 rounded-xl shadow-sm bg-white py-0 overflow-hidden gap-0">
      <CardHeader className="border-b border-slate-100 bg-slate-50/30 pt-4 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-slate-900">Intake Queue</CardTitle>
          <div className="relative w-full md:w-80">
            <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by project, client or category..." 
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
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Client</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Profile</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Category</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Value</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Delivery</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Status</TableHead>
              <TableHead className="px-6 h-12 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow 
                key={project.id} 
                className="border-slate-100 hover:bg-slate-50/50 transition-colors group"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm leading-tight">{project.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{project.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <User size={14} className="text-slate-400" />
                    <span className="text-xs font-semibold">{project.clientName}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Layers size={14} className="text-violet-400" />
                    <span className="text-xs font-semibold">{project.profileName}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border-none ${getCategoryBadge(project.category)}`}>
                    {project.category}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <DollarSign size={14} className="text-emerald-500" />
                    <span className="text-sm font-bold text-slate-800">{project.value.replace('$', '')}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar size={14} />
                    <span className="text-xs font-medium">{project.deliveryDate}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="outline" className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-200 shadow-xl">
                      <DropdownMenuLabel className="px-3 pt-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase">Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-slate-700">
                        <ExternalLink size={14} /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-brand-600 hover:bg-brand-50">
                        <Briefcase size={14} /> Apply for Project
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-100" />
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-slate-700">
                        <User size={14} /> View Client Profile
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

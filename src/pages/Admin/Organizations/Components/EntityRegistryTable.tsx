import {
  MoreVertical,
  ExternalLink,
  Users,
  Briefcase,
  ShieldCheck,
  MapPin,
  Globe,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface Team {
  id: string;
  name: string;
  industry: string;
  status: string;
  members: number;
  projects: number;
  location: string;
  revenue: string;
  logo: string;
}

interface EntityRegistryTableProps {
  teams: Team[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const EntityRegistryTable = ({
  teams,
  searchTerm,
  onSearchChange,
}: EntityRegistryTableProps) => {
  return (
    <Card className="border-slate-200 rounded-xl shadow-sm bg-white py-0 overflow-hidden gap-0">
      <CardHeader className="border-b border-slate-100 bg-slate-50/30 pt-4 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Teams
          </CardTitle>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Filter by name or industry..."
              className="pl-10 h-10 rounded-lg border-slate-200 focus:ring-brand-500/10 focus:border-brand-500"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="">
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Team
              </TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Scale
              </TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Location
              </TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Status
              </TableHead>
              <TableHead className="px-6 h-12 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams
              .filter((team) =>
                team.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((team) => (
                <TableRow
                  key={team.id}
                  className="border-slate-100 hover:bg-slate-50/50 transition-colors group"
                >
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 font-semibold border border-brand-100">
                        {team.logo}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm leading-tight">
                          {team.name}
                        </p>
                        <p className="text-xs text-slate-400 font-normal">
                          {team.industry}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Users size={14} className="text-slate-400" />
                        <span className="text-xs font-semibold">
                          {team.members}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Briefcase size={14} className="text-slate-400" />
                        <span className="text-xs font-semibold">
                          {team.projects}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin size={14} />
                      <span className="text-xs font-normal">
                        {team.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest border-none ${
                        team.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {team.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg"
                        >
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-xl p-2 border-slate-200 shadow-xl"
                      >
                        <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-slate-700">
                          <ExternalLink size={14} /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-slate-700">
                          <Globe size={14} /> Visit Domain
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-rose-600 hover:bg-rose-50">
                          <ShieldCheck size={14} /> Suspend Access
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

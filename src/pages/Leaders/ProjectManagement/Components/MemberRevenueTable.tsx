import { 
  Trophy, 
  TrendingUp, 
  Award,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MemberRevenue {
  id: string;
  name: string;
  avatar: string;
  role: string;
  revenueThisMonth: number;
  revenueAllTime: number;
  projectsCount: number;
  isTopPerformer: boolean;
}

interface MemberRevenueTableProps {
  data: MemberRevenue[];
  timeframe: "month" | "all";
}

export function MemberRevenueTable({ data, timeframe }: MemberRevenueTableProps) {
  // Sort data by revenue based on timeframe to identify current top
  const sortedData = [...data].sort((a, b) => {
    const valA = timeframe === "month" ? a.revenueThisMonth : a.revenueAllTime;
    const valB = timeframe === "month" ? b.revenueThisMonth : b.revenueAllTime;
    return valB - valA;
  });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="w-[300px] text-[11px] font-bold text-slate-500 uppercase tracking-wider">Team Member</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Projects</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">
              {timeframe === "month" ? "This Month Revenue" : "Total Revenue"}
            </TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Growth</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Performance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((member, index) => {
            const displayRevenue = timeframe === "month" ? member.revenueThisMonth : member.revenueAllTime;
            const isRank1 = index === 0;
            
            return (
              <TableRow 
                key={member.id} 
                className={`group border-slate-50 transition-colors ${isRank1 ? 'bg-brand-50/30' : 'hover:bg-slate-50/50'}`}
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:scale-105 transition-transform">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      {member.isTopPerformer && (
                        <div className="absolute -top-1 -right-1 bg-amber-400 text-white p-0.5 rounded-full border-2 border-white shadow-sm">
                          <Trophy size={10} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{member.name}</span>
                        {member.isTopPerformer && (
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-1.5 py-0 text-[9px] font-black uppercase tracking-wider h-4">
                            Top
                          </Badge>
                        )}
                        {isRank1 && (
                          <Badge className="bg-brand-100 text-brand-700 hover:bg-brand-100 border-none px-1.5 py-0 text-[9px] font-black uppercase tracking-wider h-4 animate-pulse">
                            MVP
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{member.role}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    {member.projectsCount}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className={`text-sm font-bold ${isRank1 ? 'text-brand-600' : 'text-slate-900'}`}>
                    ${displayRevenue.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-600">
                    <TrendingUp size={12} />
                    <span>+{Math.floor(Math.random() * 15 + 5)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Award 
                        key={star} 
                        size={14} 
                        className={star <= (isRank1 ? 5 : 4) ? "text-amber-400 fill-amber-400" : "text-slate-200"} 
                      />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

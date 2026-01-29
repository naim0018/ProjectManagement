import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  progress: number;
  avatar: string;
}

interface TeamEfficiencySidebarProps {
  teams: TeamMember[];
}

export const TeamEfficiencySidebar = ({ teams }: TeamEfficiencySidebarProps) => {
  return (
    <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-900 leading-none">Active Leads</h2>
        <p className="text-sm text-slate-500 font-normal mt-1.5">Efficiency tracking.</p>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        {teams.map((member) => (
          <div key={member.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border shadow-sm">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-slate-800 leading-tight">{member.name}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">{member.role}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-brand-600">{member.progress}%</span>
              <Progress value={member.progress} className="h-1 w-12 mt-1" />
            </div>
          </div>
        ))}
        <Button variant="ghost" className="w-full text-xs font-semibold text-slate-400 hover:text-brand-600 uppercase tracking-widest pt-2">
          View Full Team
        </Button>
      </CardContent>
    </Card>
  );
};

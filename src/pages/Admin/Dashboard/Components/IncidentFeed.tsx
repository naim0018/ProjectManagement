import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VerticalSlider } from "./VerticalSlider";
import { Issue } from "@/types/dashboard.types";

interface IncidentFeedProps {
  issues: Issue[];
}

export const IncidentFeed = ({ issues }: IncidentFeedProps) => {
  return (
    <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden flex flex-col">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Incident Feed
          </h2>
          <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
        </div>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Live critical system blockers.
        </p>
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <VerticalSlider items={issues} />
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Archive size={16} className="text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">
                Archived Issues
              </span>
            </div>
            <Badge
              variant="outline"
              className="bg-slate-50 text-slate-400 border-slate-200 font-semibold text-[10px]"
            >
              124
            </Badge>
          </div>
          <Button
            variant="outline"
            className="w-full h-10 uppercase text-[10px] font-semibold tracking-widest border-slate-200 hover:bg-slate-50 transition-all rounded-lg"
          >
            Launch Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

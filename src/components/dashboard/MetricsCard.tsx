import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  up: boolean;
  subtitle: string;
  color: "brand" | "emerald" | "amber" | "rose" | "violet" | "slate";
  progress?: number;
}

export function MetricsCard({
  title,
  value,
  icon: Icon,
  trend,
  up,
  subtitle,
  color,
  progress,
}: MetricsCardProps) {
  const getColors = () => {
    switch (color) {
      case "brand":
        return "bg-brand-50 text-brand-600";
      case "emerald":
        return "bg-emerald-50 text-emerald-600";
      case "amber":
        return "bg-amber-50 text-amber-600";
      case "violet":
        return "bg-violet-50 text-violet-600";
      case "rose":
        return "bg-rose-50 text-rose-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const trendColor = up ? "text-emerald-600" : "text-rose-600";
  // const TrendIcon = up ? ArrowUpRight : ArrowDownRight; // Previous design didn't use trend icons in the subtitle line, just text color, actually let's check.
  // Step 697 code: <span className={`text-[10px] font-semibold truncate ${stat.up ? "text-emerald-600" : "text-rose-600"}`}>{stat.trend}</span>
  // It did NOT use Arrow icons in the trend line.
  
  return (
    <Card className="border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider truncate">
          {title}
        </span>
        <div className={`p-1.5 rounded-lg ${getColors()}`}>
          <Icon size={14} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-semibold text-slate-900 leading-none">
            {value}
          </div>
          {progress !== undefined && (
            <div className="flex-1 mb-[3px]">
              <Progress value={progress} className="h-0.5 bg-slate-100" />
            </div>
          )}
        </div>
        <div className="flex justify-between mt-2 items-center">
          <span className={`text-[10px] font-semibold truncate ${trendColor}`}>
            {trend}
          </span>
          <span className="text-[10px] text-slate-400 font-normal truncate">
            {subtitle}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

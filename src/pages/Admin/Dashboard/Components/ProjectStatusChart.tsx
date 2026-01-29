import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProjectStatusChartProps {
  data: { name: string; value: number }[];
  totalProjects: number;
}

export const ProjectStatusChart = ({ data, totalProjects }: ProjectStatusChartProps) => {
  return (
    <Card className="md:col-span-3 border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
      <CardHeader>
        <h2 className="text-lg font-semibold text-slate-900">
          Portfolio Health
        </h2>
        <p className="text-sm text-slate-500 mt-1 font-normal">
          Distribution of global project statuses.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={85}
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      [
                        "var(--color-brand-600)",
                        "#10b981",
                        "#f59e0b",
                        "#94a3b8",
                        "#f43f5e",
                      ][index]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-semibold text-slate-900">
              {totalProjects + 16}
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-tighter">
              TOTAL
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-2 mt-4">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: [
                    "var(--color-brand-600)",
                    "#10b981",
                    "#f59e0b",
                    "#94a3b8",
                    "#f43f5e",
                  ][idx],
                }}
              />
              <span className="text-slate-500 font-normal">
                {item.name}
              </span>
              <span className="font-semibold text-slate-800 ml-auto mr-4">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

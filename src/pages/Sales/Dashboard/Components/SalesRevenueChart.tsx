import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Oct", revenue: 4200 },
  { month: "Nov", revenue: 3800 },
  { month: "Dec", revenue: 6500 },
  { month: "Jan", revenue: 8200 },
  { month: "Feb", revenue: 7800 },
  { month: "Mar", revenue: 12450 },
];

export const SalesRevenueChart = () => {
  return (
    <Card className="lg:col-span-2 border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 py-4 px-6">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-900 leading-none">
            Revenue Momentum
          </CardTitle>
          <p className="text-sm text-slate-500 mt-1.5 font-normal">
            Monthly gross revenue across all sales channels.
          </p>
        </div>
        <Badge
          variant="outline"
          className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-100 font-bold rounded-full text-[10px] uppercase tracking-wider"
        >
          +32% Growth
        </Badge>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0ea5e9"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#revenueGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

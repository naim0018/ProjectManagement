import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";

const data = [
  { name: "Fiverr", value: 65, color: "#1dbf73" },
  { name: "Upwork", value: 20, color: "#14a800" },
  { name: "Direct", value: 15, color: "#0ea5e9" },
];

export const PlatformDistributionChart = () => {
  return (
    <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4 px-6">
        <CardTitle className="text-lg font-semibold text-slate-900 leading-none">
          Client Sources
        </CardTitle>
        <p className="text-sm text-slate-500 mt-1.5 font-normal">
          Distribution of projects by acquisition channel.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontSize: '12px',
                  fontWeight: '600'
                }} 
              />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-50 space-y-3">
            {data.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{item.value}%</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Download,
  FileBarChart2,
  CalendarDays,
  TrendingUp,
  DollarSign,
  FolderKanban,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { PageHeader } from "@/common/PageHeader/PageHeader";

// ─── Mock data ────────────────────────────────────────────────────────────────
const monthlyRevenue = [
  { month: "Aug", revenue: 85000, target: 90000 },
  { month: "Sep", revenue: 92000, target: 95000 },
  { month: "Oct", revenue: 105000, target: 100000 },
  { month: "Nov", revenue: 98000, target: 110000 },
  { month: "Dec", revenue: 115000, target: 115000 },
  { month: "Jan", revenue: 125000, target: 120000 },
];

const projectsByStatus = [
  { status: "Completed", count: 12 },
  { status: "Running", count: 8 },
  { status: "Blocked", count: 2 },
  { status: "Pending", count: 12 },
  { status: "Canceled", count: 4 },
];

const statusColors: Record<string, string> = {
  Completed: "#10b981",
  Running: "#3b82f6",
  Blocked: "#f43f5e",
  Pending: "#f59e0b",
  Canceled: "#94a3b8",
};

const orgPerformance = [
  { org: "TechFlow", revenue: 45000, projects: 6, completion: 85 },
  { org: "Creative Pulse", revenue: 28000, projects: 4, completion: 72 },
  { org: "Nexus Dynamics", revenue: 32000, projects: 8, completion: 60 },
];

const summaryStats = [
  {
    title: "Total Revenue",
    value: "$620k",
    icon: DollarSign,
    trend: "+18%",
    up: true,
    subtitle: "vs last period",
    color: "brand" as const,
  },
  {
    title: "Projects Delivered",
    value: "38",
    icon: FolderKanban,
    trend: "+5 this period",
    up: true,
    subtitle: "new completions",
    color: "emerald" as const,
  },
  {
    title: "Avg. Completion Rate",
    value: "72%",
    icon: TrendingUp,
    trend: "-3% vs target",
    up: false,
    subtitle: "across all orgs",
    color: "amber" as const,
  },
  {
    title: "Open Incidents",
    value: "3",
    icon: AlertTriangle,
    trend: "-2 resolved",
    up: true,
    subtitle: "resolved this week",
    color: "rose" as const,
  },
];



// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Reports() {
  const [activePeriod, setActivePeriod] = useState<"month" | "quarter" | "year">("month");

  const periods: Array<"month" | "quarter" | "year"> = ["month", "quarter", "year"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8 pb-10"
    >
      {/* ── Header ── */}
      <PageHeader 
        title="Reports & Analytics"
        subtitle="Aggregated performance, delivery, and financial intelligence."
        renderActions={() => (
          <>
            {/* Period switcher */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-all ${
                    activePeriod === p
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg"
            >
              <Download size={14} />
              Export
            </Button>
          </>
        )}
      />

      {/* ── Summary Cards ── */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
          >
            <MetricsCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* ── Revenue Chart ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
      >
        <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Revenue vs Target
              </h2>
              <p className="text-sm text-slate-500 font-normal mt-1">
                Six-month actual delivery against monthly targets.
              </p>
            </div>
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-brand-50 text-brand-700 hover:bg-brand-100 font-semibold rounded-lg"
            >
              <CalendarDays size={12} className="mr-1.5" />
              6M
            </Badge>
          </CardHeader>
          <CardContent className="pt-6 pb-4">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-600)" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="var(--color-brand-600)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
                    }}
                    formatter={(v: number | undefined) => [v !== undefined ? `$${(v / 1000).toFixed(0)}k` : "—"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="var(--color-brand-600)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#revGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    name="Target"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#targetGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Lower Row: Project Status Pie + Org Bar ── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Project Status Distribution */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
        >
          <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden h-full">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-900">
                Project Distribution
              </h2>
              <p className="text-sm text-slate-500 font-normal mt-1">
                Status breakdown across all active projects.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectsByStatus}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {projectsByStatus.map((entry) => (
                        <Cell
                          key={entry.status}
                          fill={statusColors[entry.status]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(v) => (
                        <span className="text-xs font-semibold text-slate-600">
                          {v}
                        </span>
                      )}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Org Performance Bar Chart */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
        >
          <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden h-full">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-900">
                Organization Performance
              </h2>
              <p className="text-sm text-slate-500 font-normal mt-1">
                Revenue and completion rates by organization.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orgPerformance} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="org"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                      tickFormatter={(v) => `$${v / 1000}k`}
                      yAxisId="rev"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                      tickFormatter={(v) => `${v}%`}
                      yAxisId="comp"
                      orientation="right"
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
                      }}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(v) => (
                        <span className="text-xs font-semibold text-slate-600 capitalize">
                          {v}
                        </span>
                      )}
                    />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      fill="var(--color-brand-600)"
                      radius={[6, 6, 0, 0]}
                      yAxisId="rev"
                    />
                    <Bar
                      dataKey="completion"
                      name="Completion %"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                      yAxisId="comp"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Downloadable Report Tiles ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.45, ease: "easeOut" }}
      >
        <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-900">
              Downloadable Reports
            </h2>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Export structured data snapshots for offline review.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Monthly Revenue Report",
                  desc: "Detailed monthly revenue breakdown per org.",
                  badge: "PDF",
                  badgeColor: "bg-rose-50 text-rose-600",
                },
                {
                  title: "Project Status Summary",
                  desc: "Full status matrix across all active projects.",
                  badge: "XLSX",
                  badgeColor: "bg-emerald-50 text-emerald-600",
                },
                {
                  title: "Incident Log Export",
                  desc: "All open & resolved incident records.",
                  badge: "CSV",
                  badgeColor: "bg-amber-50 text-amber-600",
                },
              ].map((r) => (
                <div
                  key={r.title}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group cursor-pointer"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-white border border-slate-200 transition-all">
                    <FileBarChart2 size={18} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {r.title}
                      </p>
                      <span
                        className={`flex-shrink-0 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${r.badgeColor}`}
                      >
                        {r.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-normal leading-snug">
                      {r.desc}
                    </p>
                  </div>
                  <Download
                    size={14}
                    className="flex-shrink-0 text-slate-300 group-hover:text-brand-600 transition-colors mt-0.5"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

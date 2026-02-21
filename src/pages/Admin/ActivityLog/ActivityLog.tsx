import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FolderKanban,
  UserPlus,
  LogIn,
  RefreshCw,
  Filter,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard/MetricsCard";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ActivityCategory = "all" | "project" | "user" | "system" | "incident";

interface ActivityEvent {
  id: string;
  category: Exclude<ActivityCategory, "all">;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  severity?: "info" | "warning" | "critical" | "success";
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const ACTIVITIES: ActivityEvent[] = [
  {
    id: "act-01",
    category: "incident",
    title: "Critical incident raised",
    description: "API integration is failing in the production environment for proj-101.",
    actor: "user-5",
    timestamp: "2026-02-22T00:45:00Z",
    severity: "critical",
  },
  {
    id: "act-02",
    category: "project",
    title: "Project approved",
    description: "\"Cloud Migration\" project was approved and moved to active status.",
    actor: "Admin",
    timestamp: "2026-02-21T22:10:00Z",
    severity: "success",
  },
  {
    id: "act-03",
    category: "user",
    title: "New user registered",
    description: "Sarah Chen joined the platform under TechFlow Solutions.",
    actor: "System",
    timestamp: "2026-02-21T19:30:00Z",
    severity: "info",
  },
  {
    id: "act-04",
    category: "system",
    title: "System backup completed",
    description: "Automated database backup job finished successfully.",
    actor: "System",
    timestamp: "2026-02-21T18:00:00Z",
    severity: "success",
  },
  {
    id: "act-05",
    category: "incident",
    title: "High severity bug reported",
    description: "Mobile dashboard UI breaks on viewports below 375px for proj-105.",
    actor: "user-8",
    timestamp: "2026-02-21T16:45:00Z",
    severity: "warning",
  },
  {
    id: "act-06",
    category: "project",
    title: "Project blocked",
    description: "\"Mobile App V2\" was flagged as blocked due to resource constraints.",
    actor: "PM-lead",
    timestamp: "2026-02-21T14:20:00Z",
    severity: "critical",
  },
  {
    id: "act-07",
    category: "user",
    title: "Role updated",
    description: "user-12 promoted from Team Member to Project Lead.",
    actor: "Admin",
    timestamp: "2026-02-21T12:50:00Z",
    severity: "info",
  },
  {
    id: "act-08",
    category: "system",
    title: "Config change applied",
    description: "Email notification templates updated for delivery reports.",
    actor: "Admin",
    timestamp: "2026-02-21T11:00:00Z",
    severity: "info",
  },
  {
    id: "act-09",
    category: "project",
    title: "Project completed",
    description: "\"E-commerce Redesign\" successfully delivered and archived.",
    actor: "team-lead-3",
    timestamp: "2026-02-21T09:30:00Z",
    severity: "success",
  },
  {
    id: "act-10",
    category: "user",
    title: "Admin login",
    description: "Super admin logged in from a new IP address — 192.168.0.45.",
    actor: "Admin",
    timestamp: "2026-02-21T08:15:00Z",
    severity: "warning",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const SEVERITY_STYLES: Record<string, string> = {
  critical: "bg-rose-50 text-rose-700 border-rose-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

const SEVERITY_DOT: Record<string, string> = {
  critical: "bg-rose-500",
  warning: "bg-amber-500",
  success: "bg-emerald-500",
  info: "bg-blue-500",
};

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  project: <FolderKanban size={15} />,
  user: <UserPlus size={15} />,
  system: <RefreshCw size={15} />,
  incident: <AlertTriangle size={15} />,
};

const CATEGORY_FILTERS: { label: string; value: ActivityCategory }[] = [
  { label: "All", value: "all" },
  { label: "Projects", value: "project" },
  { label: "Users", value: "user" },
  { label: "System", value: "system" },
  { label: "Incidents", value: "incident" },
];

const summaryTiles = [
  {
    title: "Total Events (24h)",
    value: "48",
    icon: Activity,
    trend: "Last 24 hours",
    up: true,
    subtitle: "platform-wide",
    color: "brand" as const,
  },
  {
    title: "Critical Incidents",
    value: "2",
    icon: AlertTriangle,
    trend: "+1 since yesterday",
    up: false,
    subtitle: "requires attention",
    color: "rose" as const,
  },
  {
    title: "Resolved Today",
    value: "5",
    icon: CheckCircle2,
    trend: "+5 closures",
    up: true,
    subtitle: "incidents closed",
    color: "emerald" as const,
  },
  {
    title: "Logins",
    value: "14",
    icon: LogIn,
    trend: "+3 vs yesterday",
    up: true,
    subtitle: "active sessions",
    color: "amber" as const,
  },
];

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ActivityLog() {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = ACTIVITIES.filter((a) => {
    const matchesCategory = activeCategory === "all" || a.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.actor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8 pb-10"
    >
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">
            Activity Log
          </h1>
          <p className="text-slate-500 font-normal">
            Real-time system events, user actions, and incident trail.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg self-start sm:self-auto"
        >
          <Filter size={14} />
          Advanced Filter
        </Button>
      </div>

      {/* ── Summary Tiles ── */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summaryTiles.map((tile, i) => (
          <motion.div
            key={tile.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
          >
            <MetricsCard {...tile} />
          </motion.div>
        ))}
      </div>

      {/* ── Feed ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.45, ease: "easeOut" }}
      >
        <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search events, actors…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-normal text-slate-700 placeholder:text-slate-400"
                />
              </div>
              {/* Category filters */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 flex-wrap">
                {CATEGORY_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setActiveCategory(f.value)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      activeCategory === f.value
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-16 text-slate-400"
                >
                  <Clock size={32} strokeWidth={1.5} />
                  <p className="text-sm font-semibold">No events found.</p>
                </motion.div>
              ) : (
                filtered.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
                    className="flex items-start gap-4 px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          SEVERITY_DOT[event.severity ?? "info"]
                        }`}
                      />
                      <div className="w-px flex-1 bg-slate-100 min-h-[16px]" />
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200 group-hover:border-slate-300 transition-all">
                      {CATEGORY_ICON[event.category]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-slate-800">
                          {event.title}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold uppercase border ${
                            SEVERITY_STYLES[event.severity ?? "info"]
                          }`}
                        >
                          {event.severity}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-[10px] font-semibold text-slate-400 border-slate-200 uppercase"
                        >
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed">
                        {event.description}
                      </p>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1.5">
                        by{" "}
                        <span className="text-slate-600">{event.actor}</span>
                      </p>
                    </div>

                    {/* Timestamp */}
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs font-semibold text-slate-600">
                        {formatTime(event.timestamp)}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {formatDate(event.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

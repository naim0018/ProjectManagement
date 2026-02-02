import { motion } from "framer-motion";
import { 
  BarChart3, 
  ShieldCheck, 
  Users, 
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const dashboards = [
  {
    title: "Admin Dashboard",
    description: "Manage system settings, users, and overall project oversight.",
    icon: <ShieldCheck className="w-6 h-6 text-brand-500" />,
    path: "/admin",
    color: "emerald",
    features: ["User Management", "System Audit", "Resource Allocation"]
  },
  {
    title: "Leader Dashboard",
    description: "Coordinate team activities, track progress, and approve deliverables.",
    icon: <BarChart3 className="w-6 h-6 text-brand-500" />,
    path: "/leader",
    color: "violet",
    features: ["Task Overview", "Performance Metrics", "Team Scheduling"]
  },
  {
    title: "Team Dashboard",
    description: "View assigned tasks, update work status, and collaborate with peers.",
    icon: <Users className="w-6 h-6 text-brand-500" />,
    path: "/team",
    color: "amber",
    features: ["Assigned Tasks", "Progress Update", "Peer Review"]
  }
];

const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl w-full px-4">
      {dashboards.map((dashboard, index) => (
        <motion.div
          key={dashboard.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="flex"
        >
          <Link to={dashboard.path} className="flex-1 group">
            <Card className="h-full border-brand-100/50 hover:border-brand-500/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 bg-white/70 backdrop-blur-md overflow-hidden relative flex flex-col">
              {/* Decorative Background Pattern */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-colors duration-500" />
              
              <CardHeader className="p-5 pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                    {dashboard.icon}
                  </div>
                  <div className="p-1 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-3 h-3 text-brand-600" />
                  </div>
                </div>
                <CardTitle className="text-base font-bold tracking-tight text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
                  {dashboard.title}
                </CardTitle>
                <CardDescription className="text-[11px] leading-relaxed text-slate-500 line-clamp-2">
                  {dashboard.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-5 pt-0 flex-1">
                <div className="pt-4 border-t border-slate-50 space-y-2">
                  {dashboard.features.map((feature) => (
                    <div key={feature} className="flex items-center text-[10px] font-medium text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-200 mr-2 group-hover:bg-brand-500 transition-colors duration-300" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700 absolute bottom-0 left-0" />
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardGrid;

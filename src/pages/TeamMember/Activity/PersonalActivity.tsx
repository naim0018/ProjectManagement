import { motion } from "framer-motion";
import { 
  Calendar, 
  GitCommit, 
  MessageSquare, 
  FileCode, 
  Clock, 
  Zap,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


const activities = [
  {
    day: "Today",
    items: [
      {
        id: 1,
        type: "commit",
        title: "Pushed 4 commits to 'feature/auth-provider'",
        project: "Solaris ERP",
        time: "10:45 AM",
        icon: <GitCommit className="size-4" />,
        iconBg: "bg-brand-50 text-brand-600",
        details: "Implemented biometrics support and fixed session timeout logic."
      },
      {
        id: 2,
        type: "review",
        title: "Reviewed Pull Request #128",
        project: "Zephyr UI",
        time: "09:20 AM",
        icon: <MessageSquare className="size-4" />,
        iconBg: "bg-emerald-50 text-emerald-600",
        details: "Approved changes to the DataGrid component with 2 minor suggestions."
      }
    ]
  },
  {
    day: "Yesterday",
    items: [
      {
        id: 3,
        type: "task",
        title: "Completed task 'Update API Documentation'",
        project: "Nexus API Bridge",
        time: "04:30 PM",
        icon: <FileCode className="size-4" />,
        iconBg: "bg-violet-50 text-violet-600",
        details: "Updated Swagger specs for the new transaction endpoints."
      }
    ]
  },
  {
    day: "Feb 01, 2026",
    items: [
      {
        id: 4,
        type: "milestone",
        title: "Reached Sprint Goal: Beta Phase 1",
        project: "Solaris ERP",
        time: "11:00 AM",
        icon: <Zap className="size-4" />,
        iconBg: "bg-amber-50 text-amber-600",
        details: "All core modules integrated and ready for internal testing."
      }
    ]
  }
];

const PersonalActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Personal Activity</h1>
          <p className="text-sm text-slate-500">Track your contributions and performance timeline</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 text-slate-600 border-slate-200">
            <Calendar size={16} className="mr-2" /> Monthly View
          </Button>
          <Button variant="outline" className="h-10 text-slate-600 border-slate-200">
            <Download size={16} className="mr-2" /> Export Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {activities.map((group, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">{group.day}</h3>
                <div className="h-[1px] flex-grow bg-slate-100" />
              </div>
              
              <div className="space-y-6 ml-4 border-l-2 border-slate-100 pl-8">
                {group.items.map((item) => (
                  <div key={item.id} className="relative">
                    <div className={`absolute -left-[45px] top-0 h-8 w-8 rounded-lg flex items-center justify-center border-2 border-white ring-4 ring-white z-10 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                      </div>
                      <p className="text-xs text-brand-600 font-bold uppercase tracking-tight">{item.project}</p>
                      <p className="text-sm text-slate-500 max-w-2xl leading-relaxed mt-1">
                        {item.details}
                      </p>
                      <div className="pt-2 flex items-center gap-4">
                         <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] font-bold text-slate-400 hover:text-brand-600 hover:bg-slate-50">
                            Details
                         </Button>
                         <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] font-bold text-slate-400 hover:text-brand-600 hover:bg-slate-50">
                            Source
                         </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-900">Efficiency Metrics</CardTitle>
              <CardDescription className="text-xs">Based on latest sprint data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">PRODUCTIVITY</span>
                  <span className="text-xs font-bold text-brand-600">88%</span>
                </div>
                <Progress value={88} className="h-1.5 bg-slate-100" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">CODE QUALITY</span>
                  <span className="text-xs font-bold text-emerald-600">94%</span>
                </div>
                <Progress value={94} className="h-1.5 bg-slate-100" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">COLLABORATION</span>
                  <span className="text-xs font-bold text-violet-600">72%</span>
                </div>
                <Progress value={72} className="h-1.5 bg-slate-100" />
              </div>

              <div className="pt-4 border-t border-slate-50">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
                       <Clock size={16} />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Average Reply Time</p>
                       <p className="text-sm font-bold text-slate-900">14 Minutes</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">Very responsive this sprint! Higher than 92% of the team.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white overflow-hidden group">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-slate-900">Sprint Achievements</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-50">
                  <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                     <div className="h-10 w-10 shrink-0 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100">
                        <Zap size={18} className="text-amber-500" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-900">The Fixer</p>
                        <p className="text-[10px] text-slate-500">Resolved 10+ bugs in one week</p>
                     </div>
                  </div>
                  <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                     <div className="h-10 w-10 shrink-0 bg-brand-50 rounded-full flex items-center justify-center border border-brand-100">
                        <FileCode size={18} className="text-brand-500" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-900">Code Master</p>
                        <p className="text-[10px] text-slate-500">1000+ lines of quality code</p>
                     </div>
                  </div>
               </div>
               <Button variant="ghost" className="w-full h-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest rounded-none border-t border-slate-50">
                  View All Badges
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalActivity;

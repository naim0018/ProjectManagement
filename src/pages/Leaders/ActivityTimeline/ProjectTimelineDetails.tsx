import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowLeft,
  Calendar,
  User,
  CheckCircle,
  AlertTriangle,
  FileText,
  BarChart,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Phase {
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  deliveryDate: string;
  assignee: string;
  icon: React.ReactNode;
}

interface ProjectTimelineDetailsProps {
  project: {
    id: string;
    name: string;
    phases: Phase[];
  };
  onBack: () => void;
}

const ProjectTimelineDetails = ({ project, onBack }: ProjectTimelineDetailsProps) => {
  const getStatusColor = (status: Phase['status']) => {
    switch (status) {
      case 'completed': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case 'in_progress': return 'text-brand-500 bg-brand-50 border-brand-100';
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  const getStatusIcon = (status: Phase['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-brand-500 animate-pulse" />;
      default: return <Circle className="w-5 h-5 text-slate-300" />;
    }
  };

  const projectIssues = [
    { id: "ISS-01", title: "API latency in Auth module", priority: "High", status: "Open", reportedBy: "Alex", time: "2h ago" },
    { id: "ISS-02", title: "Responsive layout fix for mobile", priority: "Medium", status: "Resolved", reportedBy: "Sarah", time: "1d ago" },
    { id: "ISS-03", title: "Missing environmental variables", priority: "Critical", status: "InProgress", reportedBy: "Mike", time: "5h ago" },
  ];

  const projectReports = [
    { title: "Weekly Resource Report", date: "Jan 28, 2024", type: "Performance", icon: <TrendingUp className="w-4 h-4" /> },
    { title: "Security Audit Log", date: "Jan 25, 2024", type: "Security", icon: <ShieldCheck className="w-4 h-4" /> },
    { title: "Budget Allocation Summary", date: "Jan 20, 2024", type: "Financial", icon: <BarChart className="w-4 h-4" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">{project.name}</h1>
            <p className="text-xs text-slate-500">Comprehensive project tracking and insights</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full px-4 py-1.5 border-brand-100 bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-wider">
            Project Active
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="timeline" className="rounded-lg text-xs font-bold uppercase tracking-tight data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="issues" className="rounded-lg text-xs font-bold uppercase tracking-tight data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2">
            Issues <Badge className="ml-2 bg-rose-500 text-white text-[9px] h-4 min-w-[16px] px-1">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg text-xs font-bold uppercase tracking-tight data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="focus-visible:ring-0">
          <div className="relative pl-8 md:pl-0 mt-8">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 md:-translate-x-1/2 hidden md:block" />
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100 md:hidden" />

            <div className="space-y-12 pb-12">
              {project.phases.map((phase, index) => (
                <motion.div 
                  key={phase.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-10">
                    <div className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                      phase.status === 'completed' ? 'bg-emerald-500' : 
                      phase.status === 'in_progress' ? 'bg-brand-500' : 'bg-slate-200'
                    }`}>
                      {phase.status === 'completed' ? (
                         <CheckCircle className="w-4 h-4 text-white" />
                      ) : phase.status === 'in_progress' ? (
                         <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                      ) : (
                         <div className="w-2 h-2 rounded-full bg-slate-400" />
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-[45%]">
                    <Card className={`group border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                      phase.status === 'in_progress' ? 'ring-2 ring-brand-100' : ''
                    }`}>
                      <div className={`h-1.5 w-full ${
                        phase.status === 'completed' ? 'bg-emerald-500' : 
                        phase.status === 'in_progress' ? 'bg-brand-500' : 'bg-slate-200'
                      }`} />
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-xl ${getStatusColor(phase.status)}`}>
                            {phase.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{phase.name} Phase</h3>
                              {getStatusIcon(phase.status)}
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium">{phase.status.replace('_', ' ').toUpperCase()}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Calendar className="w-3 h-3" />
                              <span className="text-[10px] uppercase font-bold tracking-wider">Delivery</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-700">{phase.deliveryDate}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <User className="w-3 h-3" />
                              <span className="text-[10px] uppercase font-bold tracking-wider">Assignee</span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-700">{phase.assignee}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="focus-visible:ring-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {projectIssues.map((issue) => (
              <Card key={issue.id} className="border-slate-100 hover:border-rose-200 transition-all shadow-sm rounded-2xl overflow-hidden group">
                <CardHeader className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
                  <Badge variant="outline" className={`text-[9px] font-bold border-none uppercase ${
                    issue.priority === 'Critical' ? 'bg-rose-100 text-rose-600' : 
                    issue.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {issue.priority} Priority
                  </Badge>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{issue.id}</span>
                </CardHeader>
                <CardContent className="p-5">
                  <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2">{issue.title}</h4>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-white">
                        <AvatarFallback className="text-[10px]">{issue.reportedBy[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] font-bold text-slate-500 italic">By {issue.reportedBy}</span>
                    </div>
                    <Badge className={`text-[9px] font-bold px-2 rounded-md ${
                      issue.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-50 text-brand-600'
                    }`}>
                      {issue.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed border-slate-200 hover:border-brand-500 bg-slate-50/30 cursor-pointer flex items-center justify-center p-8 transition-all group">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-5 h-5 text-slate-400 group-hover:text-brand-600" />
                </div>
                <p className="text-xs font-bold text-slate-500 group-hover:text-brand-600">Report New Issue</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="focus-visible:ring-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-brand-600 to-brand-400 p-4 text-white">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">Task Velocity</p>
                  </div>
                  <span className="text-xs font-black text-emerald-600">+12%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">Daily Burnout</p>
                  </div>
                  <span className="text-xs font-black text-orange-600">4.2h/avg</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden">
              <CardHeader className="p-4 border-b border-slate-100 bg-slate-50">
                <CardTitle className="text-sm font-bold text-slate-900">Recent Documentation & Reports</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {projectReports.map((report) => (
                    <div key={report.title} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {report.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{report.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{report.type} • {report.date}</p>
                        </div>
                      </div>
                      <FileText className="w-4 h-4 text-slate-300 group-hover:text-brand-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProjectTimelineDetails;

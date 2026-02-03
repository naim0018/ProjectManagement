import { motion } from "framer-motion";
import { 
  Search, 
  Clock, 
  TrendingUp, 
  Briefcase,
  ChevronRight,
  Filter
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MetricsCard } from "@/components/dashboard/MetricsCard";

const projectsQueue = [
  {
    id: "Q-701",
    name: "Enterprise Cloud Migration",
    clientName: "Tech Solutions Inc",
    profileName: "Infrastructure",
    deliveryDate: "Dec 15, 2024",
    value: "$45,000",
    status: "Open",
    category: "DevOps"
  },
  {
    id: "Q-702",
    name: "AI Support Bot",
    clientName: "Global Retail",
    profileName: "Customer UX",
    deliveryDate: "Jan 10, 2025",
    value: "$12,500",
    status: "Open",
    category: "AI/ML"
  },
  {
    id: "Q-703",
    name: "FinTech Mobile Suite",
    clientName: "Capital One",
    profileName: "Mobile Platform",
    deliveryDate: "Oct 22, 2024",
    value: "$28,000",
    status: "Review Required",
    category: "FinTech"
  },
  {
    id: "Q-704",
    name: "Supply Chain Dashboard",
    clientName: "LogiTrans Group",
    profileName: "Analytics",
    deliveryDate: "Nov 05, 2024",
    value: "$15,400",
    status: "Open",
    category: "Dashboard"
  }
];

const NewProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projectsQueue.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 leading-tight">New Projects</h1>
          <p className="text-slate-500 text-sm mt-1">Available projects in the intake queue awaiting your contribution.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 border-slate-200">
             <Filter size={16} className="mr-2" /> Filter Profile
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard 
            title="Projects in Queue" 
            value={projectsQueue.length.toString()} 
            icon={Clock} 
            trend="+2 this week" 
            up={true} 
            subtitle="awaiting assignment" 
            color="brand"
          />
          <MetricsCard 
            title="Total Queue Value" 
            value="$101.9k" 
            icon={TrendingUp} 
            trend="Stable" 
            up={true} 
            subtitle="potential revenue" 
            color="emerald"
          />
          <MetricsCard 
            title="Your Matching" 
            value="3 Projects" 
            icon={Briefcase} 
            trend="High match" 
            up={true} 
            subtitle="based on skills" 
            color="violet"
          />
          <MetricsCard 
            title="Intake Velocity" 
            value="12h" 
            icon={TrendingUp} 
            trend="Fast" 
            up={true} 
            subtitle="avg. assignment time" 
            color="brand"
          />
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by project or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-white border-slate-200 rounded-lg"
              />
           </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <div key={project.id} className="p-6 hover:bg-slate-50/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-all">
                         <Briefcase size={22} />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.id}</span>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[10px] font-bold py-0 h-4 uppercase tracking-tighter">
                               {project.category}
                            </Badge>
                         </div>
                         <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-brand-600 transition-colors">{project.name}</h3>
                         <p className="text-sm text-slate-500 mt-1">{project.clientName} • {project.profileName}</p>
                      </div>
                   </div>

                   <div className="flex flex-wrap items-center gap-8 md:gap-12">
                      <div className="text-left md:text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">TARGET DELIVERY</p>
                         <p className="text-sm font-bold text-slate-700">{project.deliveryDate}</p>
                      </div>
                      <div className="text-left md:text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">PROJECT VALUE</p>
                         <p className="text-sm font-black text-brand-600">{project.value}</p>
                      </div>
                      <div className="text-left md:text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">STATUS</p>
                         <Badge className={`${
                           project.status === 'Open' ? 'bg-emerald-500' : 'bg-amber-500'
                         } text-white border-none text-[10px] uppercase font-bold px-2 py-0.5`}>
                           {project.status}
                         </Badge>
                      </div>
                      <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 px-6 rounded-lg shadow-sm shadow-slate-200">
                         View Details <ChevronRight size={14} className="ml-1" />
                      </Button>
                   </div>
                </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewProjects;

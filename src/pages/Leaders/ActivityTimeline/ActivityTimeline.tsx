import { 
  Plus, 
  CheckCircle2, 
  MessageSquare, 
  Settings, 
  UserPlus, 
  ExternalLink,
  Calendar,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const timelineData = [
  {
    id: 1,
    type: "project",
    user: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=1", role: "Frontend Lead" },
    action: "created a new project",
    target: "Mobile App V3 Refresh",
    time: "10:30 AM",
    date: "Today",
    icon: <Plus size={16} />,
    iconBg: "bg-brand-100 text-brand-600"
  },
  {
    id: 2,
    type: "task",
    user: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=4", role: "Backend Architect" },
    action: "completed task",
    target: "Database Indexing optimization",
    time: "09:15 AM",
    date: "Today",
    icon: <CheckCircle2 size={16} />,
    iconBg: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 3,
    type: "comment",
    user: { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=3", role: "UI/UX Designer" },
    action: "commented on",
    target: "Auth V2 Design Specs",
    time: "Yesterday",
    date: "Jan 29",
    icon: <MessageSquare size={16} />,
    iconBg: "bg-blue-100 text-blue-600"
  },
  {
    id: 4,
    type: "system",
    user: { name: "System Bot", avatar: "", role: "Automation" },
    action: "updated settings for",
    target: "TechFlow Solutions Organization",
    time: "Yesterday",
    date: "Jan 29",
    icon: <Settings size={16} />,
    iconBg: "bg-slate-100 text-slate-600"
  },
  {
    id: 5,
    type: "user",
    user: { name: "Emily Watson", avatar: "https://i.pravatar.cc/150?u=7", role: "QA Engineer" },
    action: "added new member",
    target: "Chris Evans to QA Team",
    time: "2 days ago",
    date: "Jan 28",
    icon: <UserPlus size={16} />,
    iconBg: "bg-purple-100 text-purple-600"
  },
  {
    id: 6,
    type: "project",
    user: { name: "David Kim", avatar: "https://i.pravatar.cc/150?u=6", role: "DevOps" },
    action: "deployed",
    target: "Enterprise Cloud Migration (v1.2.0)",
    time: "3 days ago",
    date: "Jan 27",
    icon: <ExternalLink size={16} />,
    iconBg: "bg-orange-100 text-orange-600"
  },
];

export default function ActivityTimeline() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">Activity Timeline</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time audit log of all actions across the organization.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="rounded-xl h-10 border-slate-200 bg-white text-slate-600 gap-2 font-semibold">
              <Calendar size={16} /> Jan 2024
           </Button>
           <Button variant="outline" className="rounded-xl h-10 border-slate-200 bg-white text-slate-600 gap-2 font-semibold">
              <Filter size={16} /> Filter Logs
           </Button>
        </div>
      </div>

      <div className="relative">
         {/* Vertical Line */}
         <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-100 hidden md:block" />

         <div className="space-y-8">
            {timelineData.map((item) => (
              <div key={item.id} className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group">
                 {/* Icon Node */}
                 <div className={`z-10 h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 border-4 border-white ${item.iconBg}`}>
                    {item.icon}
                 </div>

                 <Card className="flex-1 border-slate-200 rounded-2xl shadow-sm bg-white hover:border-brand-200 hover:shadow-md transition-all">
                    <CardContent className="p-5">
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                             <Avatar className="h-10 w-10 border-2 border-slate-50 shadow-sm">
                                <AvatarImage src={item.user.avatar} />
                                <AvatarFallback className="text-[10px]">{item.user.name[0]}</AvatarFallback>
                             </Avatar>
                             <div>
                                <h4 className="font-bold text-slate-900 text-sm leading-tight">
                                   <span className="text-brand-600">{item.user.name}</span>
                                   <span className="text-slate-400 font-medium ml-2">{item.user.role}</span>
                                </h4>
                                <p className="text-xs font-bold text-slate-500 mt-0.5">
                                   {item.action} <span className="text-slate-900 font-black italic">"{item.target}"</span>
                                </p>
                             </div>
                          </div>
                          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{item.date}</span>
                             <span className="text-[10px] font-bold text-brand-500 italic bg-brand-50 px-1.5 py-0.5 rounded uppercase">{item.time}</span>
                          </div>
                       </div>
                       
                       {/* Optional dynamic content based on type could go here */}
                       {item.type === 'comment' && (
                          <div className="mt-4 p-3 rounded-xl bg-slate-50 border-l-4 border-slate-200">
                             <p className="text-xs text-slate-600 font-medium italic">"Found a potential breaking change in the middleware during my review. Please check the logs."</p>
                          </div>
                       )}
                    </CardContent>
                 </Card>
              </div>
            ))}
         </div>
      </div>
      
      <div className="text-center py-8">
         <Button variant="ghost" className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] hover:text-brand-600">
            Load More Activities
         </Button>
      </div>
    </motion.div>
  );
}

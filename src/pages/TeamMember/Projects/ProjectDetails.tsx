import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Pencil,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Mock Data (consistent with MyProjects + Timeline phases)
const projectData = {
  id: "1",
  name: "Solaris ERP",
  phases: [
    { id: 1, name: "Discovery", status: 'completed', deliveryDate: "Jan 15, 2024", assignee: "Alex Rivera", icon: <Calendar className="w-4 h-4" /> },
    { id: 2, name: "UI Design", status: 'in_progress', deliveryDate: "Feb 05, 2024", assignee: "Sarah Chen", icon: <Pencil className="w-4 h-4" /> },
    { id: 3, name: "Development", status: 'pending', deliveryDate: "Mar 20, 2024", assignee: "Mike Ross", icon: <Clock className="w-4 h-4" /> },
    { id: 4, name: "Testing", status: 'pending', deliveryDate: "Apr 10, 2024", assignee: "Testing Team", icon: <CheckCircle2 className="w-4 h-4" /> },
  ]
};

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(projectData);

  console.log("Viewing project:", projectId);

  // In a real app, fetch project by projectId here
  
  const handleUpdatePhase = (phaseId: number, newStatus: string) => {
    const updatedPhases = project.phases.map((p: any) => 
      p.id === phaseId ? { ...p, status: newStatus } : p
    );
    // In real app, API call to update
    setProject({ ...project, phases: updatedPhases as any });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case 'in_progress': return 'text-brand-500 bg-brand-50 border-brand-100';
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">{project.name}</h1>
          <p className="text-sm text-slate-500">Project Details & Timeline</p>
        </div>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-xl mb-6">
          <TabsTrigger value="timeline" className="px-6 py-2">Timeline</TabsTrigger>
          <TabsTrigger value="details" className="px-6 py-2">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Project Timeline</CardTitle>
              <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold uppercase tracking-widest">
                <Plus className="w-3 h-3 mr-2" /> Add Phase
              </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="relative p-8">
                  <div className="absolute left-8 md:left-1/2 top-8 bottom-8 w-0.5 bg-slate-100 md:-translate-x-1/2 transform" />
                  
                  <div className="space-y-8">
                    {project.phases.map((phase: any, index: number) => (
                      <div key={phase.id} className={`relative flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}>
                        
                        {/* Timeline Node */}
                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-sm bg-white">
                           <div className={`w-3 h-3 rounded-full ${
                             phase.status === 'completed' ? 'bg-emerald-500' : 
                             phase.status === 'in_progress' ? 'bg-brand-500' : 'bg-slate-300'
                           }`} />
                        </div>

                        {/* Content Card */}
                        <div className="w-full md:w-[45%] pl-16 md:pl-0">
                          <Card className={`group relative hover:shadow-md transition-all cursor-pointer ${
                             phase.status === 'in_progress' ? 'border-brand-200 ring-1 ring-brand-50' : 'border-slate-200'
                          }`}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className={`p-1.5 rounded-lg ${getStatusColor(phase.status)}`}>
                                    {phase.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-slate-900">{phase.name}</h4>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">{phase.deliveryDate}</p>
                                  </div>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] uppercase font-bold tracking-widest text-brand-600 hover:bg-brand-50">
                                      Update
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Update Phase Status</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label>Current Status</Label>
                                        <Select 
                                          defaultValue={phase.status} 
                                          onValueChange={(val) => handleUpdatePhase(phase.id, val)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Notes (Optional)</Label>
                                        <Input placeholder="Add update notes..." />
                                      </div>
                                      <Button className="w-full" onClick={() => document.getElementById('close-dialog')?.click()}>
                                        Save Changes
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <div className="flex items-center justify-between border-t border-slate-50 pt-2 mt-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assignee:</span>
                                  <span className="text-xs font-semibold text-slate-700">{phase.assignee}</span>
                                </div>
                                <Badge className={`text-[9px] uppercase font-bold ${
                                  phase.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                  phase.status === 'in_progress' ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'
                                } border-none`}>
                                  {phase.status.replace('_', ' ')}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="hidden md:block w-[45%]" />
                      </div>
                    ))}
                  </div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card>
                <CardHeader>
                   <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-slate-500 text-sm">
                      Full-scale implementation of the Solaris ERP system modules including finance, HR, and supply chain management.
                   </p>
                </CardContent>
             </Card>
          </div>
        </TabsContent>
        
      </Tabs>
    </motion.div>
  );
};

export default ProjectDetails;

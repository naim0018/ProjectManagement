import { motion } from "framer-motion";
import { 
  Briefcase, 
  ArrowRight, 
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProjectListProps {
  projects: any[];
  onSelectProject: (project: any) => void;
}

const ProjectList = ({ projects, onSelectProject }: ProjectListProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">Project Collections</h1>
          <p className="text-slate-500 text-sm mt-1">Select a project to view its detailed activity timeline.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10 h-10 rounded-xl border-slate-200 bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="group cursor-pointer border-slate-200 hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 rounded-2xl overflow-hidden"
              onClick={() => onSelectProject(project)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform duration-500">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{project.name}</h3>
                      <p className="text-xs text-slate-500">{project.client}</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-brand-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-400">Completion Progress</span>
                    <span className="text-brand-600">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-1.5 bg-brand-50" />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.phases.slice(0, 4).map((phase: any) => (
                    <Badge 
                      key={phase.name} 
                      variant="secondary" 
                      className={`text-[9px] font-bold uppercase tracking-tight py-0.5 px-2 rounded-md ${
                        phase.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        phase.status === 'in_progress' ? 'bg-brand-50 text-brand-600 border-brand-100' : 
                        'bg-slate-50 text-slate-400 border-slate-100'
                      }`}
                    >
                      {phase.name}
                    </Badge>
                  ))}
                  {project.phases.length > 4 && (
                    <Badge variant="outline" className="text-[9px] font-bold py-0.5 px-2 rounded-md border-dashed border-slate-200 text-slate-400">
                      +{project.phases.length - 4} MORE
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectList;

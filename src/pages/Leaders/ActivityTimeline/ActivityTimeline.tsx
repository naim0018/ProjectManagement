import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { 
  Layout, 
  Code2, 
  Smartphone, 
  Database, 
  Link2, 
  CloudCog, 
  Flag 
} from "lucide-react";
import ProjectList from "./ProjectList";
import ProjectTimelineDetails from "./ProjectTimelineDetails";
import { PageHeader } from "@/common/PageHeader/PageHeader";

const projectsData = [
  {
    id: "proj-1",
    name: "Enterprise ERP Dashboard",
    client: "Global Logistics Inc",
    progress: 75,
    phases: [
      { name: "UI/UX", status: "completed", deliveryDate: "Jan 10, 2024", assignee: "Mike Ross", icon: <Layout className="w-4 h-4" /> },
      { name: "Frontend", status: "completed", deliveryDate: "Jan 20, 2024", assignee: "Alex Rivera", icon: <Code2 className="w-4 h-4" /> },
      { name: "App", status: "completed", deliveryDate: "Feb 05, 2024", assignee: "Sarah Chen", icon: <Smartphone className="w-4 h-4" /> },
      { name: "Backend", status: "in_progress", deliveryDate: "Feb 15, 2024", assignee: "James Bond", icon: <Database className="w-4 h-4" /> },
      { name: "Integration", status: "pending", deliveryDate: "Feb 25, 2024", assignee: "Emily Watson", icon: <Link2 className="w-4 h-4" /> },
      { name: "DevOps", status: "pending", deliveryDate: "Mar 05, 2024", assignee: "David Kim", icon: <CloudCog className="w-4 h-4" /> },
      { name: "Close", status: "pending", deliveryDate: "Mar 15, 2024", assignee: "System Admin", icon: <Flag className="w-4 h-4" /> },
    ]
  },
  {
    id: "proj-2",
    name: "E-Commerce App V2",
    client: "Retail Connect",
    progress: 35,
    phases: [
      { name: "UI/UX", status: "completed", deliveryDate: "Jan 15, 2024", assignee: "Emily Blunt", icon: <Layout className="w-4 h-4" /> },
      { name: "Frontend", status: "in_progress", deliveryDate: "Feb 10, 2024", assignee: "Chris Evans", icon: <Code2 className="w-4 h-4" /> },
      { name: "App", status: "pending", deliveryDate: "Feb 25, 2024", assignee: "Scarlett J", icon: <Smartphone className="w-4 h-4" /> },
      { name: "Backend", status: "pending", deliveryDate: "Mar 10, 2024", assignee: "Robert DJ", icon: <Database className="w-4 h-4" /> },
      { name: "Integration", status: "pending", deliveryDate: "Mar 20, 2024", assignee: "Mark Ruffalo", icon: <Link2 className="w-4 h-4" /> },
      { name: "DevOps", status: "pending", deliveryDate: "Mar 30, 2024", assignee: "Jeremy R", icon: <CloudCog className="w-4 h-4" /> },
      { name: "Close", status: "pending", deliveryDate: "Apr 05, 2024", assignee: "Admin", icon: <Flag className="w-4 h-4" /> },
    ]
  },
  {
    id: "proj-3",
    name: "Financial Data Tool",
    client: "Capital Trust",
    progress: 100,
    phases: [
      { name: "UI/UX", status: "completed", deliveryDate: "Dec 01, 2023", assignee: "Mike Ross", icon: <Layout className="w-4 h-4" /> },
      { name: "Frontend", status: "completed", deliveryDate: "Dec 15, 2023", assignee: "Alex Rivera", icon: <Code2 className="w-4 h-4" /> },
      { name: "App", status: "completed", deliveryDate: "Dec 30, 2023", assignee: "Sarah Chen", icon: <Smartphone className="w-4 h-4" /> },
      { name: "Backend", status: "completed", deliveryDate: "Jan 10, 2024", assignee: "James Bond", icon: <Database className="w-4 h-4" /> },
      { name: "Integration", status: "completed", deliveryDate: "Jan 15, 2024", assignee: "Emily Watson", icon: <Link2 className="w-4 h-4" /> },
      { name: "DevOps", status: "completed", deliveryDate: "Jan 20, 2024", assignee: "David Kim", icon: <CloudCog className="w-4 h-4" /> },
      { name: "Close", status: "completed", deliveryDate: "Jan 25, 2024", assignee: "Admin", icon: <Flag className="w-4 h-4" /> },
    ]
  }
];

export default function ActivityTimeline() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="space-y-6">
      {!selectedProject && (
        <PageHeader 
          title="Operational Timeline"
          subtitle="Real-time pulse of project lifecycles and delivery phases."
        />
      )}
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectTimelineDetails 
            key="details"
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
          />
        ) : (
          <ProjectList 
            key="list"
            projects={projectsData} 
            onSelectProject={setSelectedProject} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

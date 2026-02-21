import { motion } from "framer-motion";
import { PageHeader } from "@/common/PageHeader/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, LifeBuoy, FileText } from "lucide-react";

const Support = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8 pb-10"
    >
      <PageHeader 
        title="Support Center"
        subtitle="Get help with your workspace and explore our documentation."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="h-12 w-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Live Chat</h3>
            <p className="text-slate-500 text-sm mb-4">Talk to our support team for immediate assistance with any issues.</p>
            <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold">Start Chat</Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
              <LifeBuoy size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Help Desk</h3>
            <p className="text-slate-500 text-sm mb-4">Submit a ticket and we'll get back to you within 24 hours.</p>
            <Button variant="outline" className="w-full border-slate-200 text-slate-600 font-semibold">Open Ticket</Button>
          </CardContent>
        </Card>

        <Card className="border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Documentation</h3>
            <p className="text-slate-500 text-sm mb-4">Browse our guides and tutorials to master the ProjectHub platform.</p>
            <Button variant="outline" className="w-full border-slate-200 text-slate-600 font-semibold">View Docs</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Support;
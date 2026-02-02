import CommonWrapper from "@/common/CommonWrapper";
import DashboardGrid from "./components/DashboardGrid";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <CommonWrapper className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-brand-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="min-h-[90vh] py-12 px-4 flex flex-col items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent mb-4">
            Unified Project Workspace
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Access your specific role-based dashboard to manage tasks, collaborate with your team, 
            and track project progress in real-time.
          </p>
        </motion.div>

        <DashboardGrid />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-[10px] text-brand-600 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span>Version 0.1.0 (BETA)</span>
          </div>
        </motion.div>
      </div>
    </CommonWrapper>
  );
};

export default Home;

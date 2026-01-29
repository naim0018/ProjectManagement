import { useState, useEffect } from "react";
import { Users2, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Issue } from "@/types/dashboard.types";

export const VerticalSlider = ({ items }: { items: Issue[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="h-[210px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all h-full flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge
                  variant="outline"
                  className={`border-none font-semibold text-[9px] px-1.5 rounded-md ${
                    items[index].severity === "critical"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {items[index].severity.toUpperCase()}
                </Badge>
                <span className="text-[10px] font-semibold text-slate-400">
                  ID: {items[index].id}
                </span>
              </div>
              <h4 className="font-semibold text-slate-800 text-base leading-snug mb-2">
                {items[index].description}
              </h4>
              <div className="flex items-center gap-3 mt-auto">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                  <Users2 size={12} className="text-brand-500" />{" "}
                  {items[index].submittedBy}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                  <Activity size={12} className="text-emerald-500" />{" "}
                  {items[index].status}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 h-8 text-[10px] font-semibold uppercase tracking-widest rounded-lg border-slate-200"
            >
              Take Action
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

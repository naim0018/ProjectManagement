import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  renderActions?: () => React.ReactNode;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  renderActions, 
  className 
}: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8", className)}>
      <div className="flex items-start gap-4">
        {/* Accent Bar */}
        <div className="w-1 h-12 bg-rose-600 rounded-full mt-1.5" />
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-none mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-500 text-base font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {renderActions && (
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          {renderActions()}
        </div>
      )}
    </div>
  );
};

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, description, className, id, ...props }, ref) => {
    const internalId = React.useId();
    const generatedId = id || internalId;
    
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <Label 
            htmlFor={generatedId}
            className={cn(error ? "text-rose-500" : "text-slate-700")}
          >
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </Label>
        )}
        
        <Textarea
          id={generatedId}
          ref={ref}
          className={cn(
            "border-slate-200 focus:border-brand-500 focus-visible:ring-brand-500/20",
            error && "border-rose-500 focus:border-rose-500 focus-visible:ring-rose-200 text-rose-500",
            "transition-all duration-200 focus:scale-[1.005] scrollbar-hide",
            className
          )}
          {...props}
        />
        
        {description && !error && (
          <p className="text-[11px] text-slate-400 font-normal leading-tight ml-0.5">
            {description}
          </p>
        )}
        
        {error && (
          <p className="text-[11px] text-rose-500 font-semibold leading-tight ml-0.5 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

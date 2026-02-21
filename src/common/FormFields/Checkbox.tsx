import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps {
  label: string;
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  error?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export const CheckboxField = ({
  label,
  id,
  checked,
  onCheckedChange,
  error,
  description,
  disabled,
  required,
}: CheckboxFieldProps) => {
  const internalId = React.useId();
  const generatedId = id || internalId;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={generatedId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={cn(
            "border-slate-300 focus-visible:ring-brand-500/20 focus-visible:border-brand-500",
            error && "border-rose-500 focus-visible:ring-rose-200"
          )}
        />
        <Label
          htmlFor={generatedId}
          className={cn(
            "text-sm font-semibold cursor-pointer select-none",
            error ? "text-rose-500" : "text-slate-700",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </Label>
      </div>
      
      {description && !error && (
        <p className="text-[11px] text-slate-400 font-normal leading-tight ml-6">
          {description}
        </p>
      )}
      
      {error && (
        <p className="text-[11px] text-rose-500 font-semibold leading-tight ml-6 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

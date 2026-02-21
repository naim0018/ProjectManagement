import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonFieldProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export const RadioButtonField = ({
  label,
  options,
  value,
  onValueChange,
  error,
  description,
  disabled,
  required,
}: RadioButtonFieldProps) => {
  const generatedId = React.useId();

  return (
    <div className="space-y-3">
      {label && (
        <Label className={cn(error ? "text-rose-500" : "text-slate-700", "text-sm font-semibold")}>
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </Label>
      )}
      
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className="flex flex-col gap-2"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={option.value} 
              id={`${generatedId}-${option.value}`} 
              className={cn(
                "border-slate-300 focus-visible:ring-brand-500/20 focus-visible:border-brand-500",
                error && "border-rose-500 focus-visible:ring-rose-200"
              )}
            />
            <Label
              htmlFor={`${generatedId}-${option.value}`}
              className={cn(
                "text-sm font-normal cursor-pointer",
                error ? "text-rose-500" : "text-slate-600",
                disabled && "opacity-50"
              )}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>

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
};

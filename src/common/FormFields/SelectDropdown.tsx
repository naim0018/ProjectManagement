import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectDropdownFieldProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export const SelectDropdownField = ({
  label,
  placeholder = "Select an option",
  options,
  value,
  onValueChange,
  error,
  description,
  disabled,
  required,
}: SelectDropdownFieldProps) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label className={cn(error ? "text-rose-500" : "text-slate-700")}>
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </Label>
      )}
      
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger 
          className={cn(
            "w-full bg-transparent border-slate-200 focus:border-brand-500 focus:ring-brand-500/20",
            error && "border-rose-500 text-rose-500 focus:border-rose-500 focus:ring-rose-200"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-xl border-slate-200 rounded-xl shadow-2xl">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="rounded-lg hover:bg-brand-50 focus:bg-brand-50 transition-colors"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

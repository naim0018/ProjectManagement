import { Card } from "@/components/ui/card";
import { ChevronRight, LucideIcon } from "lucide-react";

interface SettingsCardProps {
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  title: string;
  description: string;
  variant?: 'default' | 'danger';
  onClick?: () => void;
}

export const SettingsCard = ({ 
  icon: Icon, 
  iconBg = "bg-slate-100",
  iconColor = "text-slate-500",
  title, 
  description, 
  variant = 'default',
  onClick 
}: SettingsCardProps) => {
  const isDanger = variant === 'danger';

  return (
    <Card 
      className={`
        rounded-3xl shadow-sm overflow-hidden p-6 transition-colors cursor-pointer group
        ${isDanger 
          ? 'border-rose-100 bg-rose-50/50 hover:bg-rose-50' 
          : 'border-slate-200 bg-white hover:border-brand-100'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`
          h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
          ${isDanger ? 'bg-white border border-rose-100 shadow-sm' : iconBg}
        `}>
          <Icon size={22} className={isDanger ? 'text-rose-500' : iconColor} />
        </div>
        <div className="flex-1">
          <h3 className={`font-bold text-sm ${isDanger ? 'text-rose-900' : 'text-slate-900'}`}>
            {title}
          </h3>
          <p className={`text-[10px] font-bold mt-0.5 ${isDanger ? 'text-rose-400' : 'text-slate-400'}`}>
            {description}
          </p>
        </div>
        <ChevronRight className={isDanger ? 'text-rose-200' : 'text-slate-300'} size={20} />
      </div>
    </Card>
  );
};

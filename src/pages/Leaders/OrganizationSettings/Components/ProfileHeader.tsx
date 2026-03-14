import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  initials: string;
  description: string;
  memberSince: string;
  avatarUrl?: string;
}

export const ProfileHeader = ({ 
  name, 
  initials, 
  description, 
  memberSince,
  avatarUrl 
}: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
      <div className="relative group">
        <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-brand-600 text-white text-3xl font-black">
            {initials}
          </AvatarFallback>
        </Avatar>
        <Button 
          size="icon" 
          className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-white border border-slate-200 text-slate-500 shadow-md hover:text-brand-600 transition-all"
        >
          <Camera size={18} />
        </Button>
      </div>
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 leading-tight">{name}</h2>
        <p className="text-slate-400 font-bold text-sm italic">{description}</p>
        <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mt-2">
          Member since {memberSince}
        </p>
      </div>
    </div>
  );
};

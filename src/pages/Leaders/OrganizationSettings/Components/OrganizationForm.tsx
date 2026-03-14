import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Mail, Globe, MapPin, Shield } from "lucide-react";

interface OrganizationFormData {
  name: string;
  email: string;
  website: string;
  headquarters: string;
  bio: string;
}

interface OrganizationFormProps {
  data: OrganizationFormData;
  onChange: (field: keyof OrganizationFormData, value: string) => void;
}

export const OrganizationForm = ({ data, onChange }: OrganizationFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Building2 size={12} className="text-brand-500" /> Organization Name
          </Label>
          <Input 
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="rounded-xl h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 font-bold text-slate-800" 
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Mail size={12} className="text-brand-500" /> Business Email
          </Label>
          <Input 
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="rounded-xl h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 font-bold text-slate-800" 
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Globe size={12} className="text-brand-500" /> Website URL
          </Label>
          <Input 
            value={data.website}
            onChange={(e) => onChange('website', e.target.value)}
            className="rounded-xl h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 font-bold text-slate-800" 
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <MapPin size={12} className="text-brand-500" /> Head Quarters
          </Label>
          <Input 
            value={data.headquarters}
            onChange={(e) => onChange('headquarters', e.target.value)}
            className="rounded-xl h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 font-bold text-slate-800" 
          />
        </div>
        <div className="space-y-1.5 flex flex-col">
          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1.5">
            <Shield size={12} className="text-brand-500" /> Organization BIO
          </Label>
          <textarea 
            value={data.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            className="flex min-h-[110px] w-full rounded-xl bg-slate-50 border-transparent px-3 py-2 text-xs font-bold text-slate-800 ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

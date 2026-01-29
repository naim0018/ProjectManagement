import { 
  Building2, 
  Mail, 
  Globe, 
  MapPin, 
  Shield, 
  Users, 
  Save,
  Camera,
  LogOut,
  ChevronRight,
  Bell,
  Lock
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OrganizationSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">Organization Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage global preferences and company profile configurations.</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl h-11 px-8 shadow-lg shadow-brand-500/20 transition-all active:scale-95"
        >
          {isSaving ? "Saving..." : <span className="flex items-center gap-2"><Save size={18} /> Save Changes</span>}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-slate-100/50 p-1 rounded-2xl border border-slate-200 gap-1 inline-flex">
          <TabsTrigger value="profile" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs">General</TabsTrigger>
          <TabsTrigger value="members" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs">Teams</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs">Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
           <Card className="border-slate-200 rounded-3xl shadow-sm bg-white overflow-hidden">
             <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
               <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="relative group">
                     <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-brand-600 text-white text-3xl font-black">TF</AvatarFallback>
                     </Avatar>
                     <Button size="icon" className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-white border border-slate-200 text-slate-500 shadow-md hover:text-brand-600 transition-all">
                        <Camera size={18} />
                     </Button>
                  </div>
                  <div className="space-y-1">
                     <h2 className="text-2xl font-black text-slate-900 leading-tight">TechFlow Solutions</h2>
                     <p className="text-slate-400 font-bold text-sm italic">Cloud Computing & Software Development</p>
                     <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mt-2">Member since Jan 2024</p>
                  </div>
               </div>
             </CardHeader>
             <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Building2 size={12} className="text-brand-500" /> Organization Name
                         </Label>
                         <Input defaultValue="TechFlow Solutions" className="rounded-xl h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 font-bold text-slate-800" />
                      </div>
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Mail size={12} className="text-brand-500" /> Business Email
                         </Label>
                         <Input defaultValue="ops@techflow.com" className="rounded-xl h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 font-bold text-slate-800" />
                      </div>
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Globe size={12} className="text-brand-500" /> Website URL
                         </Label>
                         <Input defaultValue="https://techflow.solutions" className="rounded-xl h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 font-bold text-slate-800" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <MapPin size={12} className="text-brand-500" /> Head Quarters
                         </Label>
                         <Input defaultValue="San Francisco, CA" className="rounded-xl h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 font-bold text-slate-800" />
                      </div>
                      <div className="space-y-1.5 flex flex-col">
                         <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1.5">
                            <Shield size={12} className="text-brand-500" /> Organization BIO
                         </Label>
                         <textarea 
                           className="flex min-h-[110px] w-full rounded-xl bg-slate-50 border-transparent px-3 py-2 text-xs font-bold text-slate-800 ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                           defaultValue="Transforming enterprise infrastructure with cutting edge cloud solutions and AI powered workflow automation."
                         />
                      </div>
                   </div>
                </div>
             </CardContent>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-slate-200 rounded-3xl shadow-sm bg-white overflow-hidden p-6 hover:border-brand-100 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
                       <Users size={24} />
                    </div>
                    <div className="flex-1">
                       <h3 className="font-bold text-slate-900 text-sm">Transfer Ownership</h3>
                       <p className="text-[10px] text-slate-400 font-bold mt-0.5">Change the primary admin for this ORG.</p>
                    </div>
                    <ChevronRight className="text-slate-300" size={20} />
                 </div>
              </Card>
              <Card className="border-rose-100 rounded-3xl shadow-sm bg-rose-50/50 overflow-hidden p-6 hover:bg-rose-50 transition-colors cursor-pointer group">
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                       <LogOut size={22} className="rotate-180" />
                    </div>
                    <div className="flex-1">
                       <h3 className="font-bold text-rose-900 text-sm">Deactivate Account</h3>
                       <p className="text-[10px] text-rose-400 font-bold mt-0.5">Completely remove TechFlow records.</p>
                    </div>
                    <ChevronRight className="text-rose-200" size={20} />
                 </div>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
           <Card className="border-slate-200 rounded-3xl shadow-sm bg-white overflow-hidden p-8">
              <div className="space-y-8">
                 <div className="flex items-center justify-between gap-8 pb-8 border-b border-slate-50">
                    <div className="flex gap-4">
                       <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                          <Lock size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 text-sm">Two-Factor Authentication</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Add an extra layer of security to all ORG members.</p>
                       </div>
                    </div>
                    <Button variant="outline" className="rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 text-slate-400">Enable</Button>
                 </div>
                 <div className="flex items-center justify-between gap-8 pb-8 border-b border-slate-50">
                    <div className="flex gap-4">
                       <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                          <Shield size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 text-sm">IP Whitelisting</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Restrict access to specific office network ranges.</p>
                       </div>
                    </div>
                    <Button variant="outline" className="rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 text-slate-400">Configure</Button>
                 </div>
                 <div className="flex items-center justify-between gap-8">
                    <div className="flex gap-4">
                       <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                          <Bell size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 text-sm">Audit Log Retention</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Define how long you want to keep activity history.</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-slate-400">90 DAYS</span>
                       <ChevronRight className="text-slate-300" size={16} />
                    </div>
                 </div>
              </div>
           </Card>
        </TabsContent>

        <TabsContent value="members">
           <Card className="border-slate-200 rounded-3xl shadow-sm bg-white p-20 text-center">
              <div className="max-w-xs mx-auto space-y-4">
                 <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 mx-auto">
                    <Users size={40} />
                 </div>
                 <h3 className="text-xl font-black text-slate-900">Manage Org Teams</h3>
                 <p className="text-xs text-slate-400 font-bold leading-relaxed italic">Configure team hierarchies and permission levels for all your organization members.</p>
                 <Button className="bg-brand-600 text-white rounded-xl px-8 h-10 font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-500/20">Access Directory</Button>
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Mail, 
  Camera, 
  Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


const ProfileSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Profile Settings</h1>
          <p className="text-sm text-slate-500">Manage your account information and preferences</p>
        </div>
        <Button className="bg-brand-600 hover:bg-brand-700 text-white gap-2">
          <Check size={16} /> Save Changes
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0 space-y-6">
           <Card className="border-slate-200 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center">
                 <div className="relative group">
                    <Avatar className="h-24 w-24 border-4 border-slate-50 shadow-sm ring-1 ring-slate-200">
                       <AvatarImage src="https://i.pravatar.cc/150?u=alex" />
                       <AvatarFallback className="text-2xl font-bold">AR</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 h-8 w-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 shadow-sm hover:text-brand-600 hover:border-brand-200 transition-all">
                       <Camera size={14} />
                    </button>
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mt-4 leading-none">Alex Rivera</h3>
                 <p className="text-xs font-medium text-slate-500 mt-1">Senior Full Stack Developer</p>
                 <Badge variant="secondary" className="mt-3 bg-brand-50 text-brand-600 border-none font-bold text-[10px] uppercase tracking-wider px-2">
                    PRO Plan
                 </Badge>
              </CardContent>
           </Card>

           <div className="space-y-1">
              {[
                { label: "General", icon: User, active: true },
                { label: "Notifications", icon: Bell, active: false },
                { label: "Security", icon: Lock, active: false },
                { label: "Integrations", icon: Globe, active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    item.active 
                      ? 'bg-brand-50 text-brand-600' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
           </div>
        </div>

        <div className="flex-grow space-y-6">
           <Card className="border-slate-200 bg-white">
              <CardHeader>
                 <CardTitle className="text-base font-bold text-slate-900">Personal Information</CardTitle>
                 <CardDescription className="text-xs">This information will be displayed on your public profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label htmlFor="first-name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">First Name</Label>
                       <Input id="first-name" defaultValue="Alex" className="h-10 bg-slate-50/50 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="last-name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Last Name</Label>
                       <Input id="last-name" defaultValue="Rivera" className="h-10 bg-slate-50/50 border-slate-200" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</Label>
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                       <Input id="email" defaultValue="alex.rivera@company.com" className="pl-10 h-10 bg-slate-50/50 border-slate-200" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="bio" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bio</Label>
                    <textarea 
                       id="bio" 
                       rows={4}
                       className="w-full rounded-md border border-slate-200 bg-slate-50/50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                       defaultValue="Full stack developer passionate about building scalable web applications and clean user interfaces."
                    />
                 </div>
              </CardContent>
           </Card>

           <Card className="border-slate-200 bg-white">
              <CardHeader>
                 <CardTitle className="text-base font-bold text-slate-900">Notifications</CardTitle>
                 <CardDescription className="text-xs">Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <p className="text-sm font-bold text-slate-900">Email Notifications</p>
                       <p className="text-xs text-slate-500">Receive weekly summaries of your activity.</p>
                    </div>
                    <Switch defaultChecked />
                 </div>
                 <Separator className="bg-slate-50" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <p className="text-sm font-bold text-slate-900">Push Notifications</p>
                       <p className="text-xs text-slate-500">Get notified when someone mentions you.</p>
                    </div>
                    <Switch defaultChecked />
                 </div>
                 <Separator className="bg-slate-50" />
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <p className="text-sm font-bold text-slate-900">Project Updates</p>
                       <p className="text-xs text-slate-500">Daily updates about your assigned projects.</p>
                    </div>
                    <Switch />
                 </div>
              </CardContent>
           </Card>

           <Card className="border-rose-100 bg-rose-50/30">
              <CardHeader>
                 <CardTitle className="text-base font-bold text-rose-900">Danger Zone</CardTitle>
                 <CardDescription className="text-xs text-rose-700/70">Proceed with extreme caution</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-100 hover:text-rose-700 font-bold text-xs uppercase tracking-widest">
                    Deactivate Account
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSettings;

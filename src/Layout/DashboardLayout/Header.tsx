import { useRef } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Header = ({ isCollapsed, setIsCollapsed }: HeaderProps) => {
  return (
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30 transition-all duration-500 shadow-sm">
      {/* Left Area: Toggle & Search */}
      <div className="flex items-center gap-6 flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-9 w-9 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
        >
          {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </Button>

        <div className="relative group w-full max-w-md hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-slate-200/50 rounded-lg text-sm font-normal focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:bg-white focus:border-brand-300 transition-all"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all relative group">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-600 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-5 w-[1px] bg-slate-200 mx-1"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <button className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100/80 transition-all outline-none group">
                <Avatar className="h-9 w-9 border border-slate-200 shadow-sm transition-transform group-hover:scale-105">
                   <AvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff" />
                   <AvatarFallback className="font-semibold text-xs bg-brand-50 text-brand-600">JD</AvatarFallback>
                </Avatar>
                <div className="text-left hidden lg:block">
                   <p className="text-sm font-semibold text-slate-900 leading-tight">John Doe</p>
                   <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">Super Admin</p>
                </div>
                <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
             </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl mt-3 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300 origin-top-right">
             <div className="px-3 py-3 mb-2 bg-slate-50/50 rounded-lg border border-slate-100 flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-white shadow-sm">
                   <AvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff" />
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-slate-900 leading-none">John Doe</p>
                  <p className="text-[11px] text-slate-500 mt-1">john@enterprise.com</p>
                </div>
             </div>
             
             <DropdownMenuLabel className="px-3 pt-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Workspace</DropdownMenuLabel>
             <DropdownMenuItem className="rounded-lg px-3 py-2.5 gap-3 cursor-pointer hover:bg-brand-50 group font-semibold text-slate-700 transition-all border border-transparent hover:border-brand-100">
                <User size={16} className="text-slate-400 group-hover:text-brand-600" />
                <span>My Profile</span>
             </DropdownMenuItem>
             <DropdownMenuItem className="rounded-lg px-3 py-2.5 gap-3 cursor-pointer hover:bg-brand-50 group font-semibold text-slate-700 transition-all border border-transparent hover:border-brand-100">
                <Settings size={16} className="text-slate-400 group-hover:text-brand-600" />
                <span>Dashboard Settings</span>
             </DropdownMenuItem>
             
             <DropdownMenuSeparator className="my-2 bg-slate-100" />
             
             <DropdownMenuItem className="rounded-lg px-3 py-2.5 gap-3 cursor-pointer hover:bg-rose-50 group font-semibold text-rose-600 transition-all border border-transparent hover:border-rose-100">
                <LogOut size={16} className="text-rose-400 group-hover:text-rose-600" />
                <span>Sign Out</span>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

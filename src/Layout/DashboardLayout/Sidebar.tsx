import { Link, NavLink, useLocation } from "react-router-dom";
import { adminRoutes } from "@/routes/AdminRoutes";
import { leaderRoutes } from "@/routes/LeaderRoutes";
import { teamRoutes } from "@/routes/TeamRoutes";
import { menuGenerator, MenuItem } from "@/utils/Generator/MenuGenerator";
import { Location } from "react-router-dom";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const NavItem = ({
  item,
  location,
  isCollapsed
}: {
  item: MenuItem;
  level: number;
  location: Location;
  isCollapsed: boolean;
}) => {
  const hasChildren = !!item.children?.length;

  const isRouteActive = (item: MenuItem, currentPath: string): boolean => {
    if (item.path && currentPath === item.path) return true;
    if (item.children)
      return item.children.some((child) => isRouteActive(child, currentPath));
    return false;
  };

  const active = isRouteActive(item, location.pathname);

  const itemClasses = `flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-start px-4'} py-2.5 text-sm rounded-lg transition-all duration-300 no-underline group relative
    ${
      active
        ? "bg-brand-600 text-white shadow-sm font-semibold hover:scale-[1.02]"
        : "text-slate-500 hover:bg-slate-50 hover:text-brand-600 font-normal"
    }`;

  const content = (
    <>
      <div className={`transition-transform duration-300 ${active ? "scale-105" : "group-hover:scale-105"} ${isCollapsed ? 'mx-0' : ''}`}>
        {item.icon}
      </div>
      {!isCollapsed && <span className="flex-1 tracking-tight truncate ml-3">{item.label}</span>}
      {!isCollapsed && hasChildren && <span className="text-[10px] transition-transform duration-200">▶</span>}
      
      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-widest rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl">
          {item.label}
        </div>
      )}
    </>
  );

  return (
    <div className="relative">
      {!item.path ? (
        <div className={`${itemClasses} cursor-default whitespace-nowrap`}>{content}</div>
      ) : (
        <NavLink to={item.path} className={`${itemClasses} cursor-pointer whitespace-nowrap`}>
          {content}
        </NavLink>
      )}
    </div>
  );
};

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();
  
  let currentRoutes: any[] = [];
  let basePath = "";
  let brandName = "Dashboard";

  if (location.pathname.startsWith("/admin")) {
    currentRoutes = adminRoutes;
    basePath = "/admin";
    brandName = "Admin";
  } else if (location.pathname.startsWith("/leader")) {
    currentRoutes = leaderRoutes;
    basePath = "/leader";
    brandName = "Leader";
  } else if (location.pathname.startsWith("/team")) {
    currentRoutes = teamRoutes;
    basePath = "/team";
    brandName = "Team";
  }

  const menu = menuGenerator(currentRoutes, basePath);
  const groupedMenu = menu.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const group = item.group || "General";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-slate-200 sticky top-0 z-40 flex flex-col p-4 transition-all duration-500 overflow-hidden`}>
      <div className={`mb-10 flex items-center ${isCollapsed ? 'justify-center' : 'px-2'} gap-3`}>
        <div className="h-9 w-9 bg-brand-600 rounded-lg flex items-center justify-center shadow-sm shrink-0 transition-transform hover:scale-105">
           <LayoutDashboard className="text-white" size={20} />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
             <Link to="/" className="no-underline block">
               <h2 className="text-lg font-semibold text-slate-900 tracking-tighter leading-none">{brandName}</h2>
             </Link>
             <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Enterprise</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto no-scrollbar pr-1">
        {Object.entries(groupedMenu).map(([group, items]) => (
          <div key={group}>
            {!isCollapsed && (
              <p className="px-3 mb-3 text-[10px] font-semibold uppercase text-slate-400 tracking-[0.15em]">
                {group}
              </p>
            )}
            <div className="space-y-1">
              {items.map((item) => (
                <NavItem 
                  key={item.label + (item.path || "")} 
                  item={item} 
                  level={0} 
                  location={location} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col items-center">
         <div className={`p-2 bg-slate-50/50 border border-slate-100 rounded-xl mb-4 shadow-sm group hover:border-brand-200 transition-all cursor-pointer w-full ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className="flex items-center gap-3">
               <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-600 font-semibold text-xs shrink-0 group-hover:border-brand-300">
                  JD
               </div>
               {!isCollapsed && (
                 <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">John Doe</p>
                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter">Premium</p>
                 </div>
               )}
            </div>
         </div>
         <div className={`flex gap-2 w-full ${isCollapsed ? 'flex-col items-center' : ''}`}>
            <Button variant="ghost" size="icon" className={`${isCollapsed ? 'h-10 w-10' : 'flex-1 h-9'} rounded-lg hover:bg-slate-100 text-slate-500 transition-all`}>
               <Settings size={18} />
            </Button>
            <Button variant="ghost" size="icon" className={`${isCollapsed ? 'h-10 w-10' : 'flex-1 h-9'} rounded-lg hover:bg-rose-50 text-rose-500 transition-all`}>
               <LogOut size={18} />
            </Button>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { AdminThemeProvider, useAdminTheme } from "@/context/AdminThemeContext";

// Inner component so it can consume the context
const AdminShell = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDark } = useAdminTheme();

  return (
    <div
      className={`flex min-h-screen overflow-hidden h-screen transition-colors duration-300 ${
        isDark ? "admin-dark bg-[#0f1117]" : "bg-slate-50"
      }`}
    >
      <ThemeSwitcher />

      {/* Sidebar with state */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardLayout = () => (
  <AdminThemeProvider>
    <AdminShell />
  </AdminThemeProvider>
);

export default DashboardLayout;

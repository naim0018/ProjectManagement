import { createContext, useContext, useState, useEffect } from "react";

interface AdminThemeContextValue {
  isDark: boolean;
  toggleDark: () => void;
  setDark: (val: boolean) => void;
}

const AdminThemeContext = createContext<AdminThemeContextValue>({
  isDark: false,
  toggleDark: () => {},
  setDark: () => {},
});

export const AdminThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("admin-dark-mode") === "true";
  });

  const setDark = (val: boolean) => {
    setIsDark(val);
    localStorage.setItem("admin-dark-mode", String(val));
  };

  const toggleDark = () => setDark(!isDark);

  // Sync with body and handle storage events
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("admin-dark");
    } else {
      document.body.classList.remove("admin-dark");
    }

    const handler = (e: StorageEvent) => {
      if (e.key === "admin-dark-mode") {
        setIsDark(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handler);
    
    return () => {
      window.removeEventListener("storage", handler);
      document.body.classList.remove("admin-dark");
    };
  }, [isDark]);

  return (
    <AdminThemeContext.Provider value={{ isDark, toggleDark, setDark }}>
      {children}
    </AdminThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminTheme = () => useContext(AdminThemeContext);

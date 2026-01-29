import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { UserRole } from "@/types/dashboard.types";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children?: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  allowedRoles, 
  children,
  redirectTo = "/login" 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

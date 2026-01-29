# Project Management Dashboard System - Implementation Plan

A comprehensive role-based dashboard system with strict data isolation and organization-scoped access control.

## Project Overview

This implementation creates a multi-tenant Project Management Dashboard with three distinct role-based views:

1. **Admin Dashboard** - Global system oversight across all organizations
2. **Leaders & Project Leads Dashboard** - Organization-level management and coordination
3. **Team Member Dashboard** - Personal task and contribution tracking

### Core Principles
- **Strict Role-Based Access Control (RBAC)** - JWT-based authentication with role validation
- **Data Isolation** - Organization-scoped data visibility with no cross-org leakage
- **Modern UX** - Professional, responsive UI with real-time updates
- **Type Safety** - Full TypeScript coverage with strict type checking

---

## Technology Stack

### Current Stack (Already in Project)
- **React 19.0.0** - UI framework
- **TypeScript 5.7.2** - Type safety
- **Vite 6.2.0** - Build tool and dev server
- **Redux Toolkit 2.6.1** - State management
- **React Router DOM 7.3.0** - Routing
- **Tailwind CSS 4.0.12** - Styling
- **Framer Motion 12.23.26** - Animations
- **Axios 1.8.2** - HTTP client
- **Radix UI** - Accessible components
- **React Hook Form 7.54.2** - Form management
- **Zod 3.24.2** - Schema validation

### Additional Dependencies Needed
```bash
# Data visualization
npm install recharts

# Date utilities
npm install date-fns

# Additional UI components
npm install @radix-ui/react-select @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-dropdown-menu
```

---

## User Review Required

> [!IMPORTANT]
> **Backend API Requirements**
> This frontend implementation assumes a backend API is available (or will be developed) with the following endpoints. Please confirm:
> - Authentication endpoint returning JWT with user role and organization ID
> - Dashboard data endpoints filtered by role and organization
> - Proper CORS configuration for development

> [!WARNING]
> **Breaking Changes**
> - Current routing structure may need reorganization to accommodate role-based dashboards
> - Authentication flow must be implemented before dashboards are functional
> - Existing public routes will coexist with new protected dashboard routes

> [!CAUTION]
> **Data Security**
> - All API responses must enforce server-side role/organization filtering
> - Never rely solely on frontend role checks for data security
> - JWT tokens must contain minimal user info (id, role, orgId only)

---

## Proposed Changes

### Component 1: Type Definitions & Interfaces

#### [NEW] [types.ts](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/types/dashboard.types.ts)

Complete TypeScript type definitions for all dashboard entities:

```typescript
// User roles enum
export enum UserRole {
  ADMIN = 'admin',
  MAIN_LEADER = 'main_leader',
  CO_LEADER = 'co_leader',
  FRONTEND_LEADER = 'frontend_leader',
  BACKEND_LEADER = 'backend_leader',
  PROJECT_LEAD = 'project_lead',
  TEAM_MEMBER = 'team_member'
}

// Dashboard data types
export interface Organization {
  id: string;
  name: string;
  activeProjects: number;
  completionRate: number;
  revenue: number;
  deliveryTarget: number;
  notes: string;
  orgColors: { primary: string; secondary: string };
  totalStars: number;
  totalProjectsCompleted: number;
  totalCanceled: number;
}

export interface Project {
  id: string;
  name: string;
  organizationId: string;
  status: 'running' | 'completed' | 'blocked' | 'canceled';
  cancelReason?: string;
  progress: number;
  deadline: Date;
  monthlyValue: number;
  isAtRisk: boolean; // delay > 20%
  stars: number;
  reviews: string[]; // Array of image URLs
}

export interface TeamMember {
  id: string;
  name: string;
  role: UserRole;
  organizationId: string;
  assignedProjects: string[];
  totalProjects: number;
  highestRevenue: number;
  totalCanceled: number;
  totalProjectStars: number;
  avgStar: number;
}

export interface Issue {
  id: string;
  projectId: string;
  submittedBy: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: Date;
}

// Dashboard-specific data structures
export interface AdminDashboardData {
  totalOrganizations: number;
  totalProjects: number;
  completedProjects: number;
  runningProjects: number;
  monthlyDeliveryValue: number;
  organizations: Organization[];
  openIssues: Issue[];
  blockedProjects: Project[];
}

export interface LeadersDashboardData {
  organizationId: string;
  runningProjectsCount: number;
  averageProgress: number;
  monthlyDeliveryValue: number;
  assignedTeams: TeamMember[];
  dailyUpdates: ProgressUpdate[];
  issues: Issue[];
  upcomingDeadlines: Project[];
  atRiskProjects: Project[];
}

export interface TeamMemberDashboardData {
  userId: string;
  monthlyRevenue: number;
  assignedProjects: Project[];
  personalProgress: Record<string, number>; // projectId -> progress%
  submittedIssues: Issue[];
}
```

---

### Component 2: Authentication & Authorization

#### [NEW] [AuthContext.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/contexts/AuthContext.tsx)

Authentication context with role-based access control:

```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '@/types/dashboard.types';

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  organizationId?: string; // undefined for Admin
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  canAccessDashboard: (dashboardType: 'admin' | 'leader' | 'member') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode<AuthUser>(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    const decoded = jwtDecode<AuthUser>(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const hasRole = (roles: UserRole[]) => {
    return user ? roles.includes(user.role) : false;
  };

  const canAccessDashboard = (dashboardType: 'admin' | 'leader' | 'member') => {
    // Implementation of access rules from specs
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, hasRole, canAccessDashboard }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

#### [NEW] [ProtectedRoute.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/components/ProtectedRoute.tsx)

Protected route wrapper for role-based access:

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/dashboard.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

---

### Component 3: Redux Store Configuration

#### [MODIFY] [store/index.ts](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/store/index.ts)

Add dashboard API slices:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { adminDashboardApi } from './Api/adminDashboardApi';
import { leadersDashboardApi } from './Api/leadersDashboardApi';
import { teamMemberDashboardApi } from './Api/teamMemberDashboardApi';

export const store = configureStore({
  reducer: {
    [adminDashboardApi.reducerPath]: adminDashboardApi.reducer,
    [leadersDashboardApi.reducerPath]: leadersDashboardApi.reducer,
    [teamMemberDashboardApi.reducerPath]: teamMemberDashboardApi.reducer,
    // ... existing reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminDashboardApi.middleware,
      leadersDashboardApi.middleware,
      teamMemberDashboardApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### [NEW] [adminDashboardApi.ts](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/store/Api/adminDashboardApi.ts)

Admin dashboard RTK Query API:

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminDashboardData } from '@/types/dashboard.types';

export const adminDashboardApi = createApi({
  reducerPath: 'adminDashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['AdminDashboard'],
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<AdminDashboardData, {
      organizationId?: string;
      projectId?: string;
      startDate?: string;
      endDate?: string;
    }>({
      query: (params) => ({
        url: '/admin/dashboard',
        params,
      }),
      providesTags: ['AdminDashboard'],
    }),
  }),
});

export const { useGetAdminDashboardQuery } = adminDashboardApi;
```

Similar API files for `leadersDashboardApi.ts` and `teamMemberDashboardApi.ts`.

---

### Component 4: Routing Structure

#### [NEW] [DashboardRoutes.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/routes/DashboardRoutes.tsx)

```typescript
import { UserRole } from '@/types/dashboard.types';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import AdminDashboard from '@/pages/Dashboard/AdminDashboard';
import LeadersDashboard from '@/pages/Dashboard/LeadersDashboard';
import TeamMemberDashboard from '@/pages/Dashboard/TeamMemberDashboard';

export const dashboardRoutes = [
  {
    path: '/dashboard/admin',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/leaders',
    element: (
      <ProtectedRoute
        allowedRoles={[
          UserRole.MAIN_LEADER,
          UserRole.CO_LEADER,
          UserRole.FRONTEND_LEADER,
          UserRole.BACKEND_LEADER,
          UserRole.PROJECT_LEAD,
        ]}
      >
        <LeadersDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/team',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.TEAM_MEMBER]}>
        <TeamMemberDashboard />
      </ProtectedRoute>
    ),
  },
];
```

---

### Component 5: Reusable Dashboard Components

#### [NEW] [components/Dashboard/MetricCard.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/components/Dashboard/MetricCard.tsx)

```typescript
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'orange' | 'red';
}

export const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue' }: MetricCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span className="ml-1">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};
```

#### [NEW] [components/Dashboard/DataTable.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/components/Dashboard/DataTable.tsx)

Generic data table with sorting and filtering:

```typescript
import { useState } from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends Record<string, any>>({ 
  columns, 
  data, 
  onRowClick 
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const modifier = sortDirection === 'asc' ? 1 : -1;
        return aVal > bVal ? modifier : -modifier;
      })
    : data;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {column.sortable && sortKey === column.key && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

#### [NEW] [components/Dashboard/FilterPanel.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/components/Dashboard/FilterPanel.tsx)

Dynamic filter panel with date range and multi-select:

```typescript
import { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';

export interface FilterConfig {
  organizations?: boolean;
  projects?: boolean;
  dateRange?: boolean;
  teamMembers?: boolean;
}

interface FilterPanelProps {
  config: FilterConfig;
  onFilterChange: (filters: Record<string, any>) => void;
  organizationOptions?: Array<{ value: string; label: string }>;
  projectOptions?: Array<{ value: string; label: string }>;
  teamMemberOptions?: Array<{ value: string; label: string }>;
}

export const FilterPanel = ({
  config,
  onFilterChange,
  organizationOptions = [],
  projectOptions = [],
  teamMemberOptions = [],
}: FilterPanelProps) => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.organizations && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization
            </label>
            {/* Radix Select implementation */}
          </div>
        )}

        {config.projects && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            {/* Radix Select implementation */}
          </div>
        )}

        {config.dateRange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            {/* Date range picker */}
          </div>
        )}

        {config.teamMembers && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Member
            </label>
            {/* Radix Select implementation */}
          </div>
        )}
      </div>
    </div>
  );
};
```

#### [NEW] [components/Dashboard/ChartComponents.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/components/Dashboard/ChartComponents.tsx)

Reusable chart wrappers using Recharts:

```typescript
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const ProjectStatusPieChart = ({ data }: { data: { name: string; value: number }[] }) => {
  const COLORS = ['#10b981', '#3b82f6', '#ef4444'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const RevenueBarChart = ({ data }: { data: { month: string; revenue: number }[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};
```

---

### Component 6: Dashboard Pages

#### [NEW] [AdminDashboard.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/pages/Dashboard/AdminDashboard.tsx)

Complete Admin dashboard with all required components:

```typescript
import { useGetAdminDashboardQuery } from '@/store/Api/adminDashboardApi';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { DataTable } from '@/components/Dashboard/DataTable';
import { FilterPanel } from '@/components/Dashboard/FilterPanel';
import { ProjectStatusPieChart, RevenueBarChart } from '@/components/Dashboard/ChartComponents';
import { Building2, FolderKanban, DollarSign, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboard() {
  const [filters, setFilters] = useState({});
  const { data, isLoading, error } = useGetAdminDashboardQuery(filters);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard</div>;
  if (!data) return null;

  const projectStatusData = [
    { name: 'Completed', value: data.completedProjects },
    { name: 'Running', value: data.runningProjects },
    { name: 'Blocked', value: data.blockedProjects.length },
  ];

  const orgColumns = [
    { key: 'name', label: 'Organization', sortable: true },
    { key: 'activeProjects', label: 'Active Projects', sortable: true },
    { 
      key: 'completionRate', 
      label: 'Completion Rate', 
      sortable: true,
      render: (value: number) => `${value}%`
    },
    {
      key: 'revenue',
      label: 'Revenue',
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Filters */}
        <FilterPanel
          config={{ organizations: true, projects: true, dateRange: true }}
          onFilterChange={setFilters}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Organizations"
            value={data.totalOrganizations}
            icon={Building2}
            color="blue"
          />
          <MetricCard
            title="Total Projects"
            value={data.totalProjects}
            subtitle={`${data.runningProjects} running`}
            icon={FolderKanban}
            color="green"
          />
          <MetricCard
            title="Monthly Delivery Value"
            value={`$${data.monthlyDeliveryValue.toLocaleString()}`}
            icon={DollarSign}
            color="orange"
          />
          <MetricCard
            title="Open Issues"
            value={data.openIssues.length}
            icon={AlertTriangle}
            color="red"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h2>
            <ProjectStatusPieChart data={projectStatusData} />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h2>
            {/* Monthly revenue chart would go here */}
          </div>
        </div>

        {/* Organization Performance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization Performance</h2>
          <DataTable columns={orgColumns} data={data.organizations} />
        </div>

        {/* Blocked Projects & Open Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Blocked Projects</h2>
            {/* Blocked projects list */}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Open Issues</h2>
            {/* Open issues list */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### [NEW] [LeadersDashboard.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/pages/Dashboard/LeadersDashboard.tsx)

Shared dashboard for all leader roles:

```typescript
import { useGetLeadersDashboardQuery } from '@/store/Api/leadersDashboardApi';
import { useAuth } from '@/contexts/AuthContext';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { FilterPanel } from '@/components/Dashboard/FilterPanel';
import { Users, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

export default function LeadersDashboard() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({});
  
  const { data, isLoading } = useGetLeadersDashboardQuery({
    organizationId: user?.organizationId!,
    ...filters,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Leaders & Project Leads Dashboard
        </h1>

        {/* Filters */}
        <FilterPanel
          config={{ projects: true, dateRange: true, teamMembers: true }}
          onFilterChange={setFilters}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Running Projects"
            value={data.runningProjectsCount}
            subtitle={`${data.averageProgress}% avg progress`}
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="Monthly Delivery Value"
            value={`$${data.monthlyDeliveryValue.toLocaleString()}`}
            icon={Users}
            color="green"
          />
          <MetricCard
            title="At-Risk Projects"
            value={data.atRiskProjects.length}
            subtitle="Delays > 20%"
            icon={AlertCircle}
            color="red"
          />
          <MetricCard
            title="Upcoming Deadlines"
            value={data.upcomingDeadlines.length}
            subtitle="Next 7 days"
            icon={Calendar}
            color="orange"
          />
        </div>

        {/* Team Members & Daily Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Teams</h2>
            {/* Team members list */}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Progress Updates</h2>
            {/* Progress feed */}
          </div>
        </div>

        {/* Issues & Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Issues</h2>
            {/* Issues sorted by severity */}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            {/* Calendar view */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### [NEW] [TeamMemberDashboard.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/pages/Dashboard/TeamMemberDashboard.tsx)

Personal dashboard for team members:

```typescript
import { useGetTeamMemberDashboardQuery } from '@/store/Api/teamMemberDashboardApi';
import { useAuth } from '@/contexts/AuthContext';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { DollarSign, CheckCircle2, FileText } from 'lucide-react';

export default function TeamMemberDashboard() {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<string | undefined>();

  const { data, isLoading } = useGetTeamMemberDashboardQuery({
    userId: user?.id!,
    projectId: selectedProject,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>

        {/* Personal Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Monthly Revenue Contribution"
            value={`$${data.monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Assigned Projects"
            value={data.assignedProjects.length}
            icon={FileText}
            color="blue"
          />
          <MetricCard
            title="Submitted Issues"
            value={data.submittedIssues.length}
            icon={CheckCircle2}
            color="orange"
          />
        </div>

        {/* Assigned Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Projects</h2>
          {/* Projects list with progress and deadlines */}
        </div>

        {/* Issue Submission & Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit Issue</h2>
            {/* Issue submission form */}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Issues</h2>
            {/* Issue tracking list */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Component 7: Dashboard Layout

#### [NEW] [DashboardLayout.tsx](file:///c:/Users/rakib/OneDrive/Desktop/ProjectManagement/src/Layout/DashboardLayout/DashboardLayout.tsx)

```typescript
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

---

## Verification Plan

### Automated Tests

```bash
# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom

# Run tests
npm test
```

**Test Coverage:**
1. Authentication flow (login, logout, role validation)
2. Protected routes (unauthorized access blocked)
3. Dashboard data fetching and rendering
4. Filter functionality across all dashboards
5. Chart rendering with mock data
6. Role-based component visibility

### Manual Verification

1. **Role-Based Access Testing**
   - Log in as Admin → verify access to Admin dashboard only
   - Log in as Leader → verify org-scoped data visibility
   - Log in as Team Member → verify assigned projects only
   - Attempt cross-role access → verify redirects

2. **Data Isolation**
   - As Leader, verify no cross-org data leakage
   - Confirm filters work correctly
   - Test edge cases (no projects, empty org)

3. **UI/UX Testing**
   - Test responsive design on mobile, tablet, desktop
   - Verify chart interactions (tooltips, legends)
   - Test loading states and error handling
   - Confirm animations are smooth

4. **Performance**
   - Check dashboard load times
   - Verify no unnecessary re-renders
   - Test with large datasets (100+ projects)

### Browser Testing
Use the browser_subagent tool to:
- Navigate through all three dashboards
- Test filter interactions
- Verify chart responsiveness
- Take screenshots for documentation

---

## Environment Variables

Create `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Project Management Dashboard
```

---

## Project Structure

```
src/
├── pages/
│   └── Dashboard/
│       ├── AdminDashboard.tsx
│       ├── LeadersDashboard.tsx
│       └── TeamMemberDashboard.tsx
├── components/
│   ├── Dashboard/
│   │   ├── MetricCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── ChartComponents.tsx
│   │   └── IssueForm.tsx
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx
├── store/
│   ├── Api/
│   │   ├── adminDashboardApi.ts
│   │   ├── leadersDashboardApi.ts
│   │   └── teamMemberDashboardApi.ts
│   └── index.ts
├── types/
│   └── dashboard.types.ts
├── routes/
│   └── DashboardRoutes.tsx
└── Layout/
    └── DashboardLayout/
        ├── DashboardLayout.tsx
        ├── DashboardHeader.tsx
        └── DashboardSidebar.tsx
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- Set up TypeScript types
- Implement authentication context
- Create protected routing
- Set up Redux store

### Phase 2: Core Components (Week 2)
- Build reusable dashboard components
- Implement charts
- Create filter panel
- Build data table

### Phase 3: Dashboard Pages (Week 3)
- Develop Admin dashboard
- Develop Leaders dashboard
- Develop Team Member dashboard

### Phase 4: Integration & Testing (Week 4)
- API integration
- E2E testing
- Performance optimization
- Bug fixes and polish

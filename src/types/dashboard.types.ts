
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
  
  // Custom fields
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
  
  // Custom fields
  stars: number;
  reviews: string[]; // Array of image URLs
}

export interface TeamMember {
  id: string;
  name: string;
  role: UserRole;
  organizationId: string;
  assignedProjects: string[]; // IDs of assigned projects
  
  // Custom fields
  totalProjects: number;
  highestRevenue: number;
  totalCanceled: number;
  totalProjectStars: number;
  avgStar: number;
}

export interface Issue {
  id: string;
  projectId: string;
  submittedBy: string; // User ID
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

export interface ProgressUpdate {
  id: string;
  projectId: string;
  userId: string;
  message: string;
  createdAt: Date;
}

import { AdminDashboardData, TeamMemberDashboardData, UserRole } from './dashboard.types';

export const mockAdminData: AdminDashboardData = {
  totalOrganizations: 5,
  totalProjects: 24,
  completedProjects: 12,
  runningProjects: 8,
  monthlyDeliveryValue: 125000,
  organizations: [
    {
      id: 'org-1',
      name: 'TechFlow Solutions',
      activeProjects: 6,
      completionRate: 85,
      revenue: 45000,
      deliveryTarget: 50000,
      notes: 'High performing organization.',
      orgColors: { primary: '#3b82f6', secondary: '#93c5fd' },
      totalStars: 45,
      totalProjectsCompleted: 20,
      totalCanceled: 1,
    },
    {
      id: 'org-2',
      name: 'Creative Pulse',
      activeProjects: 4,
      completionRate: 72,
      revenue: 28000,
      deliveryTarget: 35000,
      notes: 'Recently onboarded two new project leads.',
      orgColors: { primary: '#ec4899', secondary: '#fbcfe8' },
      totalStars: 32,
      totalProjectsCompleted: 15,
      totalCanceled: 2,
    },
    {
      id: 'org-3',
      name: 'Nexus Dynamics',
      activeProjects: 8,
      completionRate: 60,
      revenue: 32000,
      deliveryTarget: 60000,
      notes: 'Currently facing some resource constraints.',
      orgColors: { primary: '#10b981', secondary: '#6ee7b7' },
      totalStars: 28,
      totalProjectsCompleted: 10,
      totalCanceled: 0,
    }
  ],
  openIssues: [
    {
      id: 'issue-1',
      projectId: 'proj-101',
      submittedBy: 'user-5',
      severity: 'critical',
      description: 'API integration failing in production environment.',
      status: 'open',
      createdAt: new Date('2026-01-25'),
    },
    {
      id: 'issue-2',
      projectId: 'proj-105',
      submittedBy: 'user-8',
      severity: 'high',
      description: 'Major UI bug on mobile view for dashboard.',
      status: 'in_progress',
      createdAt: new Date('2026-01-27'),
    },
    {
      id: 'issue-3',
      projectId: 'proj-110',
      submittedBy: 'user-12',
      severity: 'medium',
      description: 'Performance degradation in data export feature.',
      status: 'open',
      createdAt: new Date('2026-01-28'),
    }
  ],
  blockedProjects: [
    {
      id: 'proj-101',
      name: 'Cloud Migration',
      organizationId: 'org-1',
      status: 'blocked',
      progress: 45,
      deadline: new Date('2026-03-15'),
      monthlyValue: 12000,
      isAtRisk: true,
      stars: 4,
      reviews: []
    },
    {
      id: 'proj-120',
      name: 'Mobile App V2',
      organizationId: 'org-3',
      status: 'blocked',
      progress: 15,
      deadline: new Date('2026-05-20'),
      monthlyValue: 8000,
      isAtRisk: true,
      stars: 3,
      reviews: []
    }
  ]
};

export const mockTeamMemberData: TeamMemberDashboardData = {
  userId: 'user-10',
  monthlyRevenue: 8500,
  assignedProjects: [
    {
      id: 'proj-105',
      name: 'E-commerce Redesign',
      organizationId: 'org-1',
      status: 'running',
      progress: 65,
      deadline: new Date('2026-02-28'),
      monthlyValue: 4500,
      isAtRisk: false,
      stars: 5,
      reviews: []
    },
    {
      id: 'proj-108',
      name: 'Auth Service Migration',
      organizationId: 'org-1',
      status: 'running',
      progress: 30,
      deadline: new Date('2026-03-15'),
      monthlyValue: 4000,
      isAtRisk: false,
      stars: 4,
      reviews: []
    }
  ],
  personalProgress: {
    'proj-105': 80,
    'proj-108': 25
  },
  submittedIssues: [
    {
      id: 'task-1',
      projectId: 'proj-105',
      submittedBy: 'user-10',
      severity: 'medium',
      description: 'Checkout page responsive issues on small devices.',
      status: 'in_progress',
      createdAt: new Date('2026-01-26')
    }
  ]
};


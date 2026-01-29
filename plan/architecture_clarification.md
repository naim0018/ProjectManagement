# FINAL ARCHITECTURE CLARIFICATION

## System Type: Multi-Organization (Multi-Tenant)

### Overview
This is a **multi-organization project management system** where:
- **One Admin** manages the entire system
- Admin can **create multiple organizations**
- Admin can **create, move, and assign members** to different organizations
- Each organization has its own leaders and team members

---

## Organization Structure

```
System (Admin manages all)
├── Organization A
│   ├── Leaders (Main, Co, Frontend, Backend, Project Leads)
│   ├── Team Members
│   └── Projects
│
├── Organization B
│   ├── Leaders
│   ├── Team Members
│   └── Projects
│
└── Organization C
    ├── Leaders
    ├── Team Members
    └── Projects
```

---

## Role-Based Access & Data Scopes

### Admin (System-Wide)
**Can Access:** Everything across all organizations

**Capabilities:**
- ✅ Create new organizations
- ✅ Delete/modify organizations  
- ✅ Create user accounts
- ✅ Assign users to organizations
- ✅ Move users between organizations
- ✅ View all projects across all organizations
- ✅ View system-wide metrics and revenue
- ✅ Manage global issues and blocked projects

**Dashboard Shows:**
- Total organizations count
- Total projects (all orgs)
- Monthly delivery value (sum across all orgs)
- Organization performance comparison table
- Global issues and blocked projects

---

### Leaders (Organization-Scoped)
**Can Access:** ONLY their assigned organization's data

**Roles:**
- Main Leader
- Co-Leader  
- Frontend Leader
- Backend Leader
- Project Lead

**Capabilities:**
- ✅ View all projects in THEIR organization
- ✅ Manage teams in THEIR organization
- ✅ Track progress within THEIR organization
- ✅ Handle issues within THEIR organization
- ❌ CANNOT see other organizations' data
- ❌ CANNOT create organizations
- ❌ CANNOT move users between organizations

**Dashboard Shows:**
- Their organization's running projects
- Their organization's monthly delivery value
- Assigned teams (within their org)
- Daily updates (within their org)
- Issues (within their org)

---

### Team Members (Project-Scoped)
**Can Access:** ONLY their assigned projects

**Capabilities:**
- ✅ View assigned projects
- ✅ Track personal tasks and progress
- ✅ Submit issues for their projects
- ❌ CANNOT see other team members' projects (unless shared)
- ❌ CANNOT see other organizations
- ❌ CANNOT see organization-wide data

**Dashboard Shows:**
- Personal assigned projects
- Monthly revenue contribution
- Task progress
- Submitted issues status

---

## Data Isolation Rules

### Backend MUST Enforce:

1. **Admin Queries:**
   - No filtering needed
   - Returns all data from all organizations

2. **Leader Queries:**
   - MUST filter by `organizationId` from JWT
   - Should NEVER receive data from other organizations
   - Backend validates: `WHERE organizationId = {user.organizationId}`

3. **Team Member Queries:**
   - MUST filter by `assignedProjects` from database
   - Should ONLY see projects they're assigned to
   - Backend validates: `WHERE projectId IN {user.assignedProjects}`

---

## JWT Token Structure

```typescript
interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: 'admin' | 'main_leader' | 'co_leader' | 'frontend_leader' | 
        'backend_leader' | 'project_lead' | 'team_member';
  organizationId?: string; // Present for Leaders & Team Members, null for Admin
  exp: number;
}
```

**Examples:**

```typescript
// Admin token
{
  userId: "1",
  email: "admin@system.com",
  name: "System Admin",
  role: "admin",
  organizationId: null, // Admin is not tied to any org
  exp: 1234567890
}

// Leader token
{
  userId: "5",
  email: "leader@orgA.com",
  name: "John Leader",
  role: "main_leader",
  organizationId: "org-a-uuid", // Scoped to Organization A
  exp: 1234567890
}

// Team Member token
{
  userId: "10",
  email: "member@orgB.com",
  name: "Jane Member",
  role: "team_member",
  organizationId: "org-b-uuid", // Scoped to Organization B
  exp: 1234567890
}
```

---

## Admin Dashboard - Organization Management Features

The Admin dashboard should include:

### Organization Management Section
- **Create Organization** button
- **Organization List** table with actions:
  - Edit organization details
  - View organization members
  - Delete organization (with confirmation)
  
### User Management Section  
- **Create User** button
- **User List** table showing:
  - Name, Email, Role, Current Organization
  - Actions: Edit, Move to different org, Delete
  
### Move User Modal
- Select user
- Select target organization
- Confirm move
- Updates `organizationId` in database

---

## Database Schema Implications

### Organizations Table
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  organization_id UUID REFERENCES organizations(id), -- NULL for admin
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  status VARCHAR(50) NOT NULL,
  progress INT DEFAULT 0,
  deadline TIMESTAMP,
  monthly_value DECIMAL(10, 2),
  team_lead_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Frontend Implementation Changes

### Admin Dashboard Additions

**New Components Needed:**
1. `OrganizationManagementPanel.tsx` - CRUD for organizations
2. `UserManagementPanel.tsx` - Create, move, delete users  
3. `CreateOrganizationModal.tsx` - Form to create new org
4. `MoveUserModal.tsx` - Select user + target org
5. `OrganizationSelector.tsx` - Filter dropdown for admin

**New API Endpoints:**
```typescript
// Organizations
POST   /api/admin/organizations          - Create org
GET    /api/admin/organizations          - List all orgs
PUT    /api/admin/organizations/:id      - Update org
DELETE /api/admin/organizations/:id      - Delete org

// User Management
POST   /api/admin/users                  - Create user
GET    /api/admin/users                  - List all users
PUT    /api/admin/users/:id              - Update user
PUT    /api/admin/users/:id/move         - Move user to different org
DELETE /api/admin/users/:id              - Delete user
```

---

## Security Checklist

- [ ] Admin can see ALL organizations ✅
- [ ] Admin cannot be assigned to an organization ✅
- [ ] Leaders ONLY see their organizationId data ✅
- [ ] Team Members ONLY see assigned projects ✅
- [ ] Backend validates organizationId on EVERY query ✅
- [ ] Moving user updates all related records ✅
- [ ] Deleting organization cascades properly ✅

---

## Summary

**This is a MULTI-ORGANIZATION system where:**
- ✅ Admin creates and manages multiple organizations
- ✅ Admin assigns/moves users between organizations
- ✅ Leaders are scoped to one organization
- ✅ Team Members are scoped to their assigned projects
- ✅ Strict data isolation between organizations

**NOT a simple single-tenant SaaS**, but rather a **multi-tenant platform** managed by a central admin.

import { 
  MoreVertical, 
  Shield, 
  Calendar,
  Lock,
  Edit2,
  AlertTriangle,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel 
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../../../../components/ui/input";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  org: string;
  status: string;
  lastLogin: string;
  avatar: string;
}

interface UserDirectoryTableProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const UserDirectoryTable = ({ users, searchTerm, onSearchChange }: UserDirectoryTableProps) => {
  return (
    <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-slate-50/30 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-slate-900">User Directory</CardTitle>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by name, email or org..." 
              className="pl-10 h-10 rounded-lg border-slate-200"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100">
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">User</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Assignment</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Access Role</TableHead>
              <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Last Activity</TableHead>
              <TableHead className="px-6 h-12 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.org.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
              <TableRow key={user.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200 shadow-sm">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xs font-semibold">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm leading-tight">{user.name}</p>
                      <p className="text-xs text-slate-400 font-normal">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Shield size={14} className="text-brand-500" />
                    <span className="text-xs font-semibold">{user.org}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge variant="outline" className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest border-none ${
                      user.role === 'Admin' ? 'bg-brand-50 text-brand-700' :
                      user.role === 'Leader' ? 'bg-violet-50 text-violet-700' :
                      'bg-slate-100 text-slate-600'
                  }`}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar size={14} />
                    <span className="text-xs font-normal">{user.lastLogin}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 border-slate-200 shadow-xl">
                      <DropdownMenuLabel className="px-3 pt-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase">Management</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-slate-700">
                        <Edit2 size={14} /> Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-slate-700">
                        <Lock size={14} /> Reset Credentials
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-100" />
                      <DropdownMenuItem className="rounded-lg gap-2 font-semibold text-rose-600 hover:bg-rose-50">
                        <AlertTriangle size={14} /> Revoke Access
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

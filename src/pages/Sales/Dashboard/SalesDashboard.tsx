import { 
  DollarSign, 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { PageHeader } from "@/common/PageHeader/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddProjectModal } from "./Components/AddProjectModal";
import { SalesRevenueChart } from "./Components/SalesRevenueChart";
import { PlatformDistributionChart } from "./Components/PlatformDistributionChart";

const salesData = {
  totalRevenue: 12450.80,
  activeOrders: 8,
  completedOrders: 142,
  canceledOrders: 3,
  avgSellingPrice: 185.00,
  orders: [
    {
      id: "ORD-9921",
      client: "Sarah Jenkins",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      service: "E-commerce Website Dev",
      status: "In Progress",
      progress: 65,
      price: 850,
      deliveryDate: "Mar 20, 2024",
      remaining: "2d 5h",
      platform: "Fiverr"
    },
    {
      id: "ORD-9918",
      client: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?u=michael",
      service: "Custom CRM Dashboard",
      status: "Review",
      progress: 95,
      price: 1200,
      deliveryDate: "Mar 18, 2024",
      remaining: "0d 8h",
      platform: "Fiverr"
    },
    {
      id: "ORD-9915",
      client: "Emma Watson",
      avatar: "https://i.pravatar.cc/150?u=emma",
      service: "UI/UX Audit",
      status: "Waiting",
      progress: 0,
      price: 350,
      deliveryDate: "Mar 25, 2024",
      remaining: "7d 2h",
      platform: "Direct"
    },
    {
      id: "ORD-9920",
      client: "Digital Nomad LLC",
      avatar: "https://i.pravatar.cc/150?u=digital",
      service: "React Native App",
      status: "Late",
      progress: 40,
      price: 2500,
      deliveryDate: "Mar 15, 2024",
      remaining: "OVERDUE",
      platform: "Fiverr"
    }
  ]
};

export default function SalesDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${salesData.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      trend: "+15.2% from last month",
      up: true,
      subtitle: "net earnings",
      color: "emerald" as const,
    },
    {
      title: "Active Orders",
      value: salesData.activeOrders,
      icon: ShoppingCart,
      trend: "4 due this week",
      up: true,
      subtitle: "currently processing",
      color: "brand" as const,
    },
    {
      title: "Avg. Sale Price",
      value: `$${salesData.avgSellingPrice}`,
      icon: TrendingUp,
      trend: "+$12.50 shift",
      up: true,
      subtitle: "per order avg",
      color: "violet" as const,
    },
    {
      title: "Completion Rate",
      value: "98.5%",
      icon: CheckCircle2,
      trend: "Standard high",
      up: true,
      subtitle: "order success score",
      color: "brand" as const,
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Review": return "bg-amber-50 text-amber-600 border-amber-100";
      case "Waiting": return "bg-slate-50 text-slate-600 border-slate-100";
      case "Late": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8 pb-10"
    >
      <PageHeader 
        title="Sales Intelligence"
        subtitle="Manage your projects, revenue and client acquisitions."
        renderActions={() => (
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-lg border-slate-200 font-semibold shadow-sm h-10 px-4">
              <ExternalLink className="mr-2 h-4 w-4" /> Fiverr Profile
            </Button>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg shadow-sm h-10 px-4"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </div>
        )}
      />

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <MetricsCard
            key={i}
            {...stat}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <SalesRevenueChart />
        <PlatformDistributionChart />
      </div>

      <div className="grid gap-6">
        <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 py-4 px-6">
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900 leading-none">Active Order Pipeline</CardTitle>
              <p className="text-sm text-slate-500 font-normal mt-1.5">Real-time status of your high-value orders.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Find orders..." 
                  className="pl-9 h-9 w-64 bg-white border-slate-200 rounded-lg focus-visible:ring-brand-500"
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-200 bg-white">
                <Filter size={16} className="text-slate-600" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/30">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Client</TableHead>
                    <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Project/Gig</TableHead>
                    <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">Status</TableHead>
                    <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">Progress</TableHead>
                    <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center">Delivery</TableHead>
                    <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-right">Value</TableHead>
                    <TableHead className="px-6 h-12 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.orders.map((order) => (
                    <TableRow key={order.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-lg border border-slate-100 shadow-sm">
                            <AvatarImage src={order.avatar} />
                            <AvatarFallback className="text-[10px] bg-slate-100 font-bold">{order.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 leading-none">{order.client}</p>
                            <p className="text-[10px] text-slate-400 mt-1.5 font-medium uppercase tracking-tighter">{order.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-sm font-semibold text-slate-800 tracking-tight">{order.service}</span>
                          <span className="text-[9px] font-bold text-brand-600 bg-brand-50 w-fit px-1.5 py-0.5 rounded-md leading-none border border-brand-100 uppercase tracking-wider">
                            {order.platform}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <Badge variant="outline" className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(order.status)}`}>
                          <div className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                             order.status === 'In Progress' ? 'bg-blue-500' : 
                             order.status === 'Review' ? 'bg-amber-500' : 
                             order.status === 'Late' ? 'bg-rose-500' : 'bg-slate-400'
                          }`} />
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col gap-2 w-36 mx-auto">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-900">{order.progress}%</span>
                            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter">PHASE 2/4</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${order.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full rounded-full ${order.status === 'Late' ? 'bg-rose-500' : 'bg-brand-500'}`} 
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} className={order.status === 'Late' ? 'text-rose-500' : 'text-slate-400'} />
                            <span className={`text-[11px] font-bold ${order.status === 'Late' ? 'text-rose-500' : 'text-slate-700'}`}>
                              {order.deliveryDate}
                            </span>
                          </div>
                          <span className={`text-[9px] font-semibold py-0.5 px-2 rounded-md ${
                            order.status === 'Late' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'
                          }`}>
                            {order.remaining}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <span className="text-sm font-bold text-emerald-600">${order.price.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                          <MoreVertical size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <div className="border-t border-slate-100 bg-slate-50/50 p-3">
            <Button variant="ghost" size="sm" className="w-full text-[11px] font-bold text-slate-500 hover:text-brand-600 uppercase tracking-widest transition-colors">
              Show All Active Orders
            </Button>
          </div>
        </Card>
      </div>

      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </motion.div>
  );
}

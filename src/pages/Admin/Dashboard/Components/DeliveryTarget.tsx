import { useState } from "react";
import {
  Search,
  MessageSquare,
  Calendar as CalendarIcon,
  Edit3,
  ChevronRight,
  Target,
  Send,
} from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

// Mock Data Type
interface DeliveryData {
  id: string;
  orgName: string;
  target: number;
  delivered: number;
  notes: string;
  reason: string;
}

// Mock Database Structure (Date -> Data)
const mockHistoricalData: Record<string, DeliveryData[]> = {
  [format(new Date(), "yyyy-MM-dd")]: [
    {
      id: "1",
      orgName: "TechFlow Solutions",
      target: 50000,
      delivered: 32000,
      notes: "Morning shift delayed by API maintenance",
      reason:
        "Infrastructure maintenance is currently ongoing in our main server rack. We expect completion within 4 hours.",
    },
    {
      id: "2",
      orgName: "Global Logistics Co",
      target: 120000,
      delivered: 115000,
      notes: "Excellent performance today",
      reason:
        "Operations are smooth. The new routing algorithm is yielding 15% better results than yesterday.",
    },
    {
      id: "3",
      orgName: "Green Energy Inc",
      target: 30000,
      delivered: 12000,
      notes: "Network issues in Austin hub",
      reason:
        "Severe weather in Austin has caused intermittent fiber cuts. Technicians are on-site.",
    },
    {
      id: "4",
      orgName: "Apex Healthcare",
      target: 80000,
      delivered: 78000,
      notes: "Near total capacity",
      reason:
        "Patient intake is at an all-time high, but we are managing the backlog effectively.",
    },
  ],
  [format(
    new Date(new Date().setDate(new Date().getDate() - 1)),
    "yyyy-MM-dd",
  )]: [
    {
      id: "5",
      orgName: "TechFlow Solutions",
      target: 45000,
      delivered: 45000,
      notes: "Target met successfully",
      reason: "Team pushed through the final milestone ahead of schedule.",
    },
    {
      id: "6",
      orgName: "Global Logistics Co",
      target: 100000,
      delivered: 80000,
      notes: "Driver shortage reported",
      reason:
        "Holiday season peak has caused a temporary shortage of Class-A drivers.",
    },
    {
      id: "7",
      orgName: "Apex Healthcare",
      target: 70000,
      delivered: 72000,
      notes: "Over-performance on critical cases",
      reason:
        "Additional staff onboarding has improved our efficiency significantly.",
    },
  ],
  [format(
    new Date(new Date().setDate(new Date().getDate() - 2)),
    "yyyy-MM-dd",
  )]: [
    {
      id: "8",
      orgName: "TechFlow Solutions",
      target: 50000,
      delivered: 10000,
      notes: "Major server crash at 2AM",
      reason: "Critical database corruption event. Restoration is in progress.",
    },
    {
      id: "9",
      orgName: "Green Energy Inc",
      target: 40000,
      delivered: 38000,
      notes: "Stable winds boosting production",
      reason: "Optimal conditions across our wind farms in West Texas.",
    },
  ],
};

export const DeliveryTarget = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [data, setData] = useState<DeliveryData[]>(
    mockHistoricalData[format(date, "yyyy-MM-dd")] || [],
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.orgName.toLowerCase().includes(localSearch.toLowerCase()),
  );

  const stats = {
    totalTarget: filteredData.reduce((acc, curr) => acc + curr.target, 0),
    totalDelivered: filteredData.reduce((acc, curr) => acc + curr.delivered, 0),
    get totalShort() {
      return Math.max(0, this.totalTarget - this.totalDelivered);
    },
    get percentage() {
      return this.totalTarget > 0
        ? (this.totalDelivered / this.totalTarget) * 100
        : 0;
    },
  };

  const [isSaving, setIsSaving] = useState(false);

  // Update data when date changes
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      const dateStr = format(newDate, "yyyy-MM-dd");
      setData(mockHistoricalData[dateStr] || []);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, you would dispatch a toast here
    }, 1500);
  };

  const handleEdit = (
    id: string,
    field: keyof DeliveryData,
    value: string | number,
  ) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const toggleEditing = (id: string) => {
    if (editingId === id) setEditingId(null);
    else setEditingId(id);
  };

  const openChat = (orgName: string) => {
    setSelectedOrg(orgName);
    setIsChatOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="">
      <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden pt-0">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Target className="text-brand-600" size={20} />
                Delivery Plan
              </CardTitle>
              <p className="text-sm text-slate-500 font-normal mt-1">
                Monitor financial delivery targets and organization performance.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="relative w-full md:w-56">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Find organization..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="pl-8 h-8 bg-slate-100/50 border-transparent focus:bg-white focus:ring-brand-500/10 rounded-lg text-xs transition-all"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 border-slate-200 rounded-lg shadow-sm font-semibold text-xs text-slate-600 bg-white px-3"
                  >
                    <CalendarIcon className="mr-2 h-3.5 w-3.5 text-brand-500" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-xl border-slate-200 shadow-xl bg-white"
                  align="end"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="rounded-xl"
                  />
                </PopoverContent>
              </Popover>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="h-8 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all active:scale-95 px-4 min-w-[100px]"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  "Save Shifts"
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Global Stats Bar - Compacted */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-100 bg-slate-50/20">
          <div className="p-2.5 border-r border-slate-100 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Total Target
            </span>
            <span className="text-sm font-bold text-slate-900">
              {formatCurrency(stats.totalTarget)}
            </span>
          </div>
          <div className="p-2.5 border-r border-slate-100 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Total Secured
            </span>
            <span className="text-sm font-bold text-emerald-600">
              {formatCurrency(stats.totalDelivered)}
            </span>
          </div>
          <div className="p-2.5 border-r border-slate-100 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Deficit Gap
            </span>
            <span
              className={`text-sm font-bold ${stats.totalShort > 0 ? "text-rose-600" : "text-emerald-600"}`}
            >
              {formatCurrency(stats.totalShort)}
            </span>
          </div>
          <div className="p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Fulfillment
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-brand-600">
                {stats.percentage.toFixed(1)}%
              </span>
              <div className="w-10 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 transition-all duration-700"
                  style={{ width: `${Math.min(stats.percentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="px-5 h-9 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                  Organization
                </TableHead>
                <TableHead className="px-5 h-9 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                  Target
                </TableHead>
                <TableHead className="px-5 h-9 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] text-center">
                  Delivered
                </TableHead>
                <TableHead className="px-5 h-9 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] text-center">
                  Gap
                </TableHead>
                <TableHead className="px-5 h-9 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                  Notes
                </TableHead>
                <TableHead className="px-5 h-9 text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                  Lead Reason
                </TableHead>
                <TableHead className="px-5 h-9 text-right text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const short = Math.max(0, item.target - item.delivered);
                  const isCritical = short > item.target * 0.3; // More than 30% gap

                  return (
                    <TableRow
                      key={item.id}
                      className="border-slate-100 hover:bg-slate-50/60 transition-all group cursor-pointer"
                      onClick={() => openChat(item.orgName)}
                    >
                      <TableCell
                        className="px-5 py-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {editingId === item.id ? (
                          <Input
                            value={item.orgName}
                            onChange={(e) =>
                              handleEdit(item.id, "orgName", e.target.value)
                            }
                            className="h-7 text-xs font-semibold rounded border-brand-200 focus:ring-brand-500/10 shadow-inner px-2"
                          />
                        ) : (
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-brand-600 text-[10px] font-bold border border-slate-200 group-hover:bg-white transition-all">
                              {item.orgName[0]}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 text-xs leading-tight">
                                {item.orgName}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                Verified
                              </span>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell
                        className="px-5 py-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {editingId === item.id ? (
                          <Input
                            type="number"
                            value={item.target}
                            onChange={(e) =>
                              handleEdit(
                                item.id,
                                "target",
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="h-7 w-28 text-xs font-bold text-brand-600 rounded border-brand-200 px-2"
                          />
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-800">
                              {formatCurrency(item.target)}
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-2.5 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`text-xs font-bold ${item.delivered >= item.target ? "text-emerald-600" : "text-amber-600"}`}
                          >
                            {formatCurrency(item.delivered)}
                          </span>
                          <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ease-out ${item.delivered >= item.target ? "bg-emerald-500" : "bg-amber-500"}`}
                              style={{
                                width: `${Math.min((item.delivered / item.target) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-2.5 text-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex items-center gap-1 font-bold ${short > 0 ? "text-rose-600" : "text-emerald-600"}`}
                          >
                            <span className="text-xs">
                              {short > 0 ? `-${formatCurrency(short)}` : "$0"}
                            </span>
                          </div>
                          {isCritical && (
                            <div className="h-1 w-1 rounded-full bg-rose-500 animate-pulse mt-0.5" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell
                        className="px-5 py-2.5 max-w-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {editingId === item.id ? (
                          <Input
                            value={item.notes}
                            onChange={(e) =>
                              handleEdit(item.id, "notes", e.target.value)
                            }
                            className="h-7 text-[10px] font-medium rounded border-slate-200 px-2"
                          />
                        ) : (
                          <span className="text-[11px] text-slate-500 font-medium line-clamp-1 italic leading-relaxed">
                            "{item.notes}"
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-2.5 max-w-sm">
                        <div className="p-1.5 bg-slate-50/50 rounded-lg group-hover:bg-white transition-all border border-transparent group-hover:border-slate-100">
                          <p className="text-[10px] text-slate-600 font-medium leading-[1.3] line-clamp-1">
                            {item.reason}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell
                        className="px-5 py-2.5 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5 text-slate-400">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-7 w-7 rounded-lg transition-all ${editingId === item.id ? "bg-brand-600 text-white" : "hover:text-brand-600 hover:bg-slate-100"}`}
                            onClick={() => toggleEditing(item.id)}
                          >
                            <Edit3 size={13} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100"
                            onClick={() => openChat(item.orgName)}
                          >
                            <MessageSquare size={13} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <Search size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          No records found
                        </p>
                        <p className="text-sm text-slate-500">
                          There is no delivery data for {format(date, "PPP")}.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-2 rounded-lg border-slate-200 font-semibold"
                        onClick={() => handleDateSelect(new Date())}
                      >
                        Back to Today
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chat System Layer */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent
          side="right"
          className="w-[400px] sm:w-[540px] p-0 border-l border-slate-200 z-100"
        >
          <div className="flex flex-col h-full bg-white">
            <SheetHeader className="p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold text-slate-900">
                    {selectedOrg}
                  </SheetTitle>
                  <SheetDescription className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    Secure Comms Channel
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            {/* Mock Chat Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              <div className="flex flex-col gap-1 items-center justify-center py-10 opacity-30">
                <div className="h-px w-full bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-white px-3 -mt-3.5">
                  Today
                </span>
              </div>

              <div className="flex flex-col gap-2 max-w-[85%] self-start">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    Hello Admin, we are currently seeing a 15% drop in
                    throughput due to the Austin hub maintenance. We expect
                    normalization by 4:00 PM EST.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  10:45 AM • Cluster Lead
                </span>
              </div>

              <div className="flex flex-col gap-2 max-w-[85%] self-end items-end ml-auto">
                <div className="bg-brand-600 p-4 rounded-2xl rounded-tr-none shadow-lg shadow-brand-500/20 text-white">
                  <p className="text-sm leading-relaxed font-semibold">
                    Acknowledged. I've updated your daily target to accommodate
                    the downtime. Monitor the logs and report back if
                    normalization takes longer.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-brand-600 uppercase mr-1 flex items-center gap-1">
                  Delivered <ChevronRight size={10} />
                </span>
              </div>
            </div>

            <SheetFooter className="p-6 border-t border-slate-100 bg-white">
              <div className="relative w-full flex gap-3">
                <Input
                  placeholder="Type mission directive..."
                  className="flex-1 h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-brand-500/10 rounded-xl font-medium"
                />
                <Button className="h-12 w-12 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20 p-0 active:scale-90 transition-all">
                  <Send size={18} />
                </Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

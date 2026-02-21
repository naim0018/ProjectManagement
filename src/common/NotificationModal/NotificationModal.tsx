import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bell,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "message" | "alert" | "success" | "update";
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Project Assigned",
    description:
      "You have been assigned to 'Solaris ERP' project as Module Lead.",
    time: "2 mins ago",
    type: "update",
    isRead: false,
  },
  {
    id: "2",
    title: "Critical Bug Reported",
    description: "A critical bug has been found in the authentication module.",
    time: "1 hour ago",
    type: "alert",
    isRead: false,
  },
  {
    id: "3",
    title: "New Mention in Chat",
    description: "Sarah Chen mentioned you in 'General' channel.",
    time: "3 hours ago",
    type: "message",
    isRead: true,
  },
  {
    id: "4",
    title: "Sprint Completed",
    description:
      "Q1 Sprint for 'Nexus API Bridge' has been marked as completed.",
    time: "5 hours ago",
    type: "success",
    isRead: true,
  },
  {
    id: "5",
    title: "Team Meeting",
    description: "Reminder: Weekly sync starts in 15 minutes.",
    time: "Yesterday",
    type: "update",
    isRead: true,
  },
];

interface NotificationPopoverProps {
  children: React.ReactNode;
}

export const NotificationPopover = ({ children }: NotificationPopoverProps) => {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[400px] p-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-[#1a1c23] z-[100] mt-2"
      >
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                <Bell size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Notifications
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {unreadCount} UNREAD MESSAGES
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg"
              >
                <Check size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto scrollbar-hide py-1">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "px-5 py-4 flex gap-4 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all border-l-2",
                notification.isRead
                  ? "border-transparent"
                  : "border-brand-500 bg-brand-50/10 dark:bg-brand-500/5",
              )}
            >
              <div
                className={cn(
                  "h-9 w-9 shrink-0 rounded-xl flex items-center justify-center",
                  notification.type === "message" &&
                    "bg-brand-100/50 text-brand-600",
                  notification.type === "alert" &&
                    "bg-rose-100/50 text-rose-600",
                  notification.type === "success" &&
                    "bg-emerald-100/50 text-emerald-600",
                  notification.type === "update" &&
                    "bg-amber-100/50 text-amber-600",
                )}
              >
                {notification.type === "message" && <MessageSquare size={16} />}
                {notification.type === "alert" && <AlertTriangle size={16} />}
                {notification.type === "success" && <CheckCircle2 size={16} />}
                {notification.type === "update" && <Clock size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-100 truncate">
                    {notification.title}
                  </h4>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                  {notification.description}
                </p>
                {!notification.isRead && (
                  <span className="inline-block mt-2 h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-300 hover:text-slate-600 rounded-lg self-center"
              >
                <MoreHorizontal size={14} />
              </Button>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
          <Button
            variant="ghost"
            className="w-full text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 font-bold text-[10px] uppercase tracking-widest h-9"
          >
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

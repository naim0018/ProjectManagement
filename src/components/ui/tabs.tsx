import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "inline-flex items-center justify-center transition-all",
  {
    variants: {
      variant: {
        default: "rounded-xl bg-slate-100/80 dark:bg-slate-800/80 p-1 gap-1 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm h-11",
        line: "bg-transparent border-none p-0 gap-8 h-auto border-b border-slate-100 dark:border-slate-800 rounded-none w-full justify-start",
        pill: "gap-2 bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn("group/tabs-list", tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}


function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        // Default Variant Styles
        "group-data-[variant=default]/tabs-list:rounded-lg group-data-[variant=default]/tabs-list:text-slate-500 group-data-[variant=default]/tabs-list:hover:text-slate-900 group-data-[variant=default]/tabs-list:data-[state=active]:bg-white group-data-[variant=default]/tabs-list:data-[state=active]:text-brand-600 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=default]/tabs-list:data-[state=active]:shadow-slate-200/50",
        // Line Variant Styles
        "group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:pb-4 group-data-[variant=line]/tabs-list:text-slate-400 group-data-[variant=line]/tabs-list:hover:text-slate-600 group-data-[variant=line]/tabs-list:data-[state=active]:text-brand-600 group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:border-none",
        "group-data-[variant=line]/tabs-list:after:absolute group-data-[variant=line]/tabs-list:after:bottom-[-1px] group-data-[variant=line]/tabs-list:after:left-0 group-data-[variant=line]/tabs-list:after:right-0 group-data-[variant=line]/tabs-list:after:h-0.5 group-data-[variant=line]/tabs-list:after:bg-brand-600 group-data-[variant=line]/tabs-list:after:rounded-full group-data-[variant=line]/tabs-list:after:scale-x-0 group-data-[variant=line]/tabs-list:after:transition-transform group-data-[variant=line]/tabs-list:after:duration-300 group-data-[variant=line]/tabs-list:data-[state=active]:after:scale-x-100",
        // Pill Variant Styles
        "group-data-[variant=pill]/tabs-list:rounded-full group-data-[variant=pill]/tabs-list:bg-slate-50 group-data-[variant=pill]/tabs-list:text-slate-500 group-data-[variant=pill]/tabs-list:data-[state=active]:bg-brand-600 group-data-[variant=pill]/tabs-list:data-[state=active]:text-white group-data-[variant=pill]/tabs-list:hover:bg-slate-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none mt-4", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }


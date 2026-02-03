"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  showValue = false,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { showValue?: boolean }) {
  return (
    <div className="w-full space-y-1">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-slate-100 dark:bg-slate-800 relative h-2.5 w-full overflow-hidden rounded-full shadow-inner",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-brand-600 h-full w-full flex-1 transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <div className="flex justify-end">
          <span className="text-[10px] font-bold text-slate-500">{value}%</span>
        </div>
      )}
    </div>
  )
}


export { Progress }

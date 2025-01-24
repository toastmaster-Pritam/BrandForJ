"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { text?: string }
>(
  (
    { className, orientation = "horizontal", decorative = true, text, ...props },
    ref
  ) => (
    <div
      className={cn(
        "flex items-center",
        orientation === "horizontal" ? "w-full" : "h-full flex-col"
      )}
    >
      {orientation === "horizontal" && text ? (
        <>
          {/* Line before the text */}
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn("shrink-0 bg-border h-[1px] w-full", "flex-1", className)}
            {...props}
          />
          {/* Text in the middle */}
          <span className="px-4 text-sm text-gray-500">
            {text}
          </span>
          {/* Line after the text */}
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn("shrink-0 bg-border h-[1px] w-full", "flex-1", className)}
            {...props}
          />
        </>
      ) : (
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(
            "shrink-0 bg-border",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className
          )}
          {...props}
        />
      )}
    </div>
  )
)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

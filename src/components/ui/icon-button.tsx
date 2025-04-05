import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const iconButtonVariants = cva(
  "h-9 w-9 flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-neutral-200",
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        destructive: "bg-red-600 hover:bg-red-700 text-white",
      },
      size: {
        default: "h-9 w-9",
        sm: "h-8 w-8",
        lg: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
}

export function IconButton({
  className,
  variant,
  size,
  rounded,
  icon,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(iconButtonVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {icon}
    </Button>
  )
}

export { iconButtonVariants } 
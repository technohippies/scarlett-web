import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { List, X, CaretLeft, Cards, Brain } from "@phosphor-icons/react"

const headerVariants = cva(
  "flex items-center justify-between w-full relative",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-neutral-100 border-b border-neutral-800",
      },
      size: {
        default: "h-16 px-6",
        sm: "h-14 px-4",
        lg: "h-20 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type LeftIconType = "hamburger" | "x" | "chevronLeft" | null
export type RightIconType = "threeCards" | "brain" | null

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof headerVariants> {
  leftIcon?: LeftIconType
  rightIcon?: RightIconType
  centerImage?: string
  centerText?: string
  progress?: number
  onLeftIconClick?: () => void
  onRightIconClick?: () => void
  showCenter?: boolean
}

export function Header({
  className,
  variant,
  size,
  leftIcon = "hamburger",
  rightIcon = null,
  centerImage = "/tutor/thumb.png",
  centerText = "Scarlett 英语导师",
  progress,
  onLeftIconClick,
  onRightIconClick,
  showCenter = true,
  ...props
}: HeaderProps) {
  // Don't show center content for back or close buttons
  const shouldShowCenter = showCenter && leftIcon !== "x" && leftIcon !== "chevronLeft";

  const renderLeftIcon = () => {
    switch (leftIcon) {
      case "hamburger": return <List size={26} weight="regular" />
      case "x": return <X size={26} weight="regular" />
      case "chevronLeft": return <CaretLeft size={26} weight="regular" />
      default: return null
    }
  }

  const renderRightIcon = () => {
    // Don't show right icon for back or close buttons
    if (leftIcon === "x" || leftIcon === "chevronLeft") return null;
    
    switch (rightIcon) {
      case "threeCards": return <Cards size={26} weight="regular" />
      case "brain": return <Brain size={26} weight="regular" />
      default: return null
    }
  }

  return (
    <div className="relative w-full">
      {progress !== undefined && (
        <div className="absolute top-0 left-0 right-0 w-full h-1 bg-neutral-800 m-0 p-0 z-10">
          <div 
            className="h-full bg-yellow-500" 
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} 
          />
        </div>
      )}
      <header 
        className={cn(
          progress !== undefined ? "mt-1" : "",
          headerVariants({ variant, size, className })
        )}
        {...props}
      >
        <div 
          className="flex items-center justify-center cursor-pointer p-3 text-neutral-300 hover:text-neutral-100"
          onClick={onLeftIconClick}
        >
          {renderLeftIcon()}
        </div>
        
        {shouldShowCenter ? (
          <div className="flex items-center gap-3">
            <img 
              src={centerImage} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover ring-1 ring-neutral-700"
            />
            <span className="font-medium text-base text-neutral-100">{centerText}</span>
          </div>
        ) : (
          <div></div> // Empty div to maintain the flex layout
        )}
        
        <div 
          className="flex items-center justify-center cursor-pointer p-3 text-neutral-300 hover:text-neutral-100"
          onClick={rightIcon && !(leftIcon === "x" || leftIcon === "chevronLeft") ? onRightIconClick : undefined}
        >
          {renderRightIcon()}
        </div>
      </header>
    </div>
  )
}

export { headerVariants } 
"use client"

import * as React from "react"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Info, Note, Play } from "@phosphor-icons/react"

interface IntroSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode
  titleEn: string
  titleZh: string
  contentItems: {
    icon: 'info' | 'note'
    text: string
  }[]
  onPlayAudio?: () => void
}

export function IntroSheet({
  trigger,
  titleEn,
  titleZh,
  contentItems = [],
  onPlayAudio,
  className,
  ...props
}: IntroSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="bg-neutral-900 text-neutral-100 border-t border-neutral-800/50 rounded-t-lg p-6"
        {...props}
      >
        <SheetHeader className="text-left">
          <h3 className="text-xl font-bold text-neutral-100">{titleEn}</h3>
          <h4 className="text-sm text-neutral-400 mt-1">{titleZh}</h4>
        </SheetHeader>
        
        <Separator className="my-4 bg-neutral-800" />
        
        <div className="space-y-3">
          {contentItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              {item.icon === 'info' ? (
                <Info size={20} className="text-neutral-400 mt-0.5" weight="fill" />
              ) : (
                <Note size={20} className="text-neutral-400 mt-0.5" weight="fill" />
              )}
              <p className="text-neutral-300">{item.text}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            onClick={onPlayAudio}
          >
            <Play size={24} weight="fill" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
} 
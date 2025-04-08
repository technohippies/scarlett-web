"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface RoleplayItem {
  id: string
  title: string
  thumb: string
  url: string
}

interface TutorInfo {
  id: string
  name: string
  displayName: string
  description: string
  thumb: string
  url: string
}

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
  trigger?: React.ReactNode
}

export function AppSidebar({ isOpen, onClose, trigger }: AppSidebarProps) {
  const [roleplays, setRoleplays] = useState<RoleplayItem[]>([])
  const [tutor, setTutor] = useState<TutorInfo | null>(null)
  
  // Load roleplays and tutor from the index.json file
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/roleplays/index.json');
        const data = await response.json();
        setRoleplays(data.roleplays || []);
        setTutor(data.tutor || null);
      } catch (error) {
        console.error('Failed to load data:', error);
        setRoleplays([]);
        setTutor(null);
      }
    };
    
    loadData();
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="bg-neutral-900 text-neutral-100 border-r border-neutral-800 w-[300px] sm:max-w-md p-0 pt-12"
      >
        <div className="flex flex-col h-full overflow-auto p-6">
          {/* Tutor Section */}
          {tutor && (
            <div className="mb-8">
              <h2 className="text-sm font-medium text-neutral-400 mb-4">TUTOR</h2>
              <a href={tutor.url} className="block">
                <div className="flex items-center gap-3 p-2 hover:bg-neutral-800 rounded-md cursor-pointer">
                  <img 
                    src={tutor.thumb} 
                    alt={tutor.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{tutor.displayName}</span>
                </div>
              </a>
            </div>
          )}
          
          {/* Roleplays Section */}
          {roleplays.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-medium text-neutral-400 mb-4">ACTIVE ROLEPLAYS</h2>
              <div className="space-y-2">
                {roleplays.map((roleplay) => (
                  <a href={roleplay.url} key={roleplay.id} className="block">
                    <div className="flex items-center gap-3 p-2 hover:bg-neutral-800 rounded-md cursor-pointer">
                      <img 
                        src={roleplay.thumb} 
                        alt={roleplay.title} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{roleplay.title}</span>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-transparent border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
                >
                  View Roleplays
                </Button>
              </div>
            </div>
          )}
          
          {/* Settings and Backup */}
          <div className="mt-auto">
            <h2 className="text-sm font-medium text-neutral-400 mb-4">SETTINGS</h2>
            
            <div className="p-2 hover:bg-neutral-800 rounded-md cursor-pointer">
              <span className="font-medium">Backup</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 
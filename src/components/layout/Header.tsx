import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus, MagnifyingGlass, Cards } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import reactLogo from "@/assets/react.svg"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface HeaderProps {
  loggedIn?: boolean
  address?: string
  onConnect?: () => void
  onDisconnect?: () => void
  // Localization props
  locales?: { value: string; label: string }[]
  currentLocale?: string
  onLocaleChange?: (locale: string) => void
  // Add navigation handlers
  onNavigateHome?: () => void;
  onNavigateDecks?: () => void;
  onNavigateAdd?: () => void;
}

function truncateAddress(address?: string) {
  if (!address) return ""
  return address.slice(0, 6) + "..." + address.slice(-4)
}

export const Header: React.FC<HeaderProps> = ({
  loggedIn = false,
  address = "",
  onConnect,
  onDisconnect,
  locales = [{value: 'en', label: 'EN'}, {value: 'es', label: 'ES'}, {value: 'fr', label: 'FR'}], 
  currentLocale = 'en',
  onLocaleChange,
  // Destructure new props
  onNavigateHome,
  onNavigateDecks,
  onNavigateAdd
}) => {
  return (
    <header
      className={cn(
        "w-full h-14 bg-background/80 backdrop-blur z-30",
      )}
    >
      <div className="container mx-auto px-4 max-w-6xl h-full flex items-center justify-between">
        <div className="flex items-center gap-6 min-w-0">
          <img 
            src={reactLogo} 
            alt="Logo" 
            className="h-8 w-8 cursor-pointer" 
            onClick={onNavigateHome} 
          />
          {loggedIn && (
            <nav className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="sm" className="font-medium" onClick={onNavigateDecks}>
                <Cards size={18} className="mr-1" />
                Decks
              </Button>
              <Button variant="ghost" size="sm" className="font-medium" onClick={onNavigateAdd}>
                <Plus size={18} className="mr-1" />
                Add
              </Button>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2">
            <Select value={currentLocale} onValueChange={onLocaleChange}>
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locales.map(locale => (
                  <SelectItem key={locale.value} value={locale.value}>
                    {locale.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {loggedIn ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="font-mono text-xs px-2 py-1 h-auto" disabled>
                {truncateAddress(address)}
              </Button>
              <Button variant="ghost" size="sm" onClick={onDisconnect} className="text-xs px-2 py-1 h-auto">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" onClick={onConnect}>
              Connect
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 
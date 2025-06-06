import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus, Cards } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { useLocale } from "@/contexts/LocaleContext"
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
  // Removed navigation handlers
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
  locales = [{value: 'en', label: 'EN'}, {value: 'vi', label: 'VI'}, {value: 'zh', label: 'ZH'}], 
  currentLocale,
  onLocaleChange,
  // Removed destructuring of old props
}) => {
  const { locale, setLocale, t } = useLocale();
  const activeLocale = currentLocale || locale;
  
  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    if (onLocaleChange) {
      onLocaleChange(newLocale);
    }
  };
  return (
    <header
      className={cn(
        "w-full h-14 bg-background/80 backdrop-blur z-30",
      )}
    >
      <div className="container mx-auto px-4 max-w-6xl h-full flex items-center justify-between mt-10">
        <div className="flex items-center gap-6 min-w-0">
          <Link to="/">
            <img 
              src="/scarlett-logo.png" 
              alt="Scarlett Logo" 
              className="h-16 w-16 cursor-pointer" 
            />
          </Link>
          <nav className="flex items-center gap-2 md:gap-4">
            {loggedIn && (
              <>
                <Link to="/decks">
                  <Button variant="ghost" size="sm" className="font-medium">
                    <Cards size={18} className="mr-1" />
                    {t.decks}
                  </Button>
                </Link>
                <Link to="/add">
                  <Button variant="ghost" size="sm" className="font-medium">
                    <Plus size={18} className="mr-1" />
                    {t.add}
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2">
            <Select value={activeLocale} onValueChange={handleLocaleChange}>
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locales.map(localeOption => (
                  <SelectItem key={localeOption.value} value={localeOption.value}>
                    {localeOption.label}
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
                {t.disconnect}
              </Button>
            </div>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={onConnect}
              disabled={!onConnect}
            >
              {onConnect ? t.connect : t.loading}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 
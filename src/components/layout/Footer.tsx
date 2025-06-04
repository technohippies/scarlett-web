import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";

export const Footer = () => {
  const { t } = useLocale();

  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-800 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Logo and description */}
          <div className="flex items-center gap-4">
            <img 
              src="/scarlett-logo.png" 
              alt="Scarlett Logo" 
              className="h-8 w-8" 
            />
            <span className="text-neutral-400 text-sm">
              Scarlett - AI-powered learning extension
            </span>
          </div>
          
          {/* Right side - Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/privacy-policy" 
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              {t.privacyPolicy}
            </Link>
            <a 
              href="https://github.com/technohippies/scarlett" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
          <p className="text-neutral-500 text-xs">
            © 2025 Scarlett. Open source software.
          </p>
        </div>
      </div>
    </footer>
  );
}; 
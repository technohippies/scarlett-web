import type { Preview, Decorator } from '@storybook/react';
import React, { useEffect } from 'react';
import '../src/index.css'; 
import { themes } from '@storybook/theming';
import { ThemeProvider } from '../src/components/theme-provider';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { useChannel } from '@storybook/preview-api';

// Create a decorator that uses ThemeProvider
const withThemeProvider: Decorator = (Story, context) => {
  // Get channel to listen to dark mode events
  const emit = useChannel({});
  const [isDark, setIsDark] = React.useState(
    context.globals.theme === 'dark' || localStorage.getItem('sb-addon-themes-3') === 'dark'
  );
  
  useEffect(() => {
    const channel = {
      on: (event: string, callback: (isDark: boolean) => void) => {
        if (event === DARK_MODE_EVENT_NAME) {
          // Set up listener
          const listener = (e: any) => {
            if (e.key === 'sb-addon-themes-3') {
              callback(e.newValue === 'dark');
              setIsDark(e.newValue === 'dark');
            }
          };
          window.addEventListener('storage', listener);
          return () => window.removeEventListener('storage', listener);
        }
        return () => {};
      },
      off: () => {}
    };
    
    // Initialize
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    
    // Listen for changes
    const unsubscribe = channel.on(DARK_MODE_EVENT_NAME, (darkMode: boolean) => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(darkMode ? 'dark' : 'light');
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <ThemeProvider defaultTheme={isDark ? 'dark' : 'light'}>
      <div className={isDark ? 'dark' : 'light'}>
        <div className="p-6 min-h-screen bg-background text-foreground">
          <Story {...context} />
        </div>
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      current: 'dark',
      dark: { ...themes.dark, appBg: '#1a1a1a' },
      light: { ...themes.light },
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'hsl(222.2 84% 4.9%)' },
        { name: 'light', value: 'hsl(0 0% 100%)' }
      ]
    }
  },
};

export default preview; 
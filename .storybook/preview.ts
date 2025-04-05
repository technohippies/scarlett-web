import type { Preview } from '@storybook/react'
import '../src/index.css'; // Import global styles
import { themes } from '@storybook/theming';
import React from 'react';
import { ThemeProvider } from '../src/components/theme-provider';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { useChannel, useEffect } from '@storybook/preview-api';

// Create a decorator that uses ThemeProvider and listens for Storybook's dark mode events
const withThemeProvider = (Story, context) => {
  // Get current storybook theme
  const { globals } = context;
  const theme = globals.theme || 'light';
  
  // Listen for dark mode changes
  const channel = typeof window !== 'undefined' ? useChannel({}) : null;
  
  useEffect(() => {
    if (channel) {
      const listener = (isDark) => {
        // Update the document class when Storybook's dark mode changes
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(isDark ? 'dark' : 'light');
      };
      
      channel.on(DARK_MODE_EVENT_NAME, listener);
      return () => channel.off(DARK_MODE_EVENT_NAME, listener);
    }
  }, [channel]);
  
  return (
    <ThemeProvider defaultTheme={theme === 'dark' ? 'dark' : 'light'}>
      <Story {...context} />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      // Set dark mode as the default
      current: 'dark',
      // Override the default dark theme
      dark: { ...themes.dark, appBg: '#1a1a1a' },
      // Light theme configuration
      light: { ...themes.light },
      // Dark class name to apply (matches our Tailwind config)
      darkClass: 'dark',
      lightClass: 'light',
      // Apply dark/light class to the html element
      classTarget: 'html',
      // Apply dark/light class to preview iframe
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
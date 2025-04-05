import type { Preview } from '@storybook/react'
import '../src/index.css'; // Import global styles
import { themes } from '@storybook/theming';

const preview: Preview = {
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
  },
};

export default preview;
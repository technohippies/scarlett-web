import type { Preview } from '@storybook/react'
import '../src/index.css'; // Import global styles
import { themes } from '@storybook/theming';

// Force dark mode on the preview iframe
const withDarkMode = (Story) => {
  document.documentElement.classList.add('dark');
  return Story();
};

const preview: Preview = {
  decorators: [withDarkMode],
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
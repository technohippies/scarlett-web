import type { Preview } from '@storybook/react'
import '../src/index.css'; // Import global styles
import { themes } from '@storybook/theming';

// Force dark mode on preview
const withDarkMode = (Story) => {
  // Add dark class to document element
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark');
  }
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
      // Set dark mode as the default and only option
      current: 'dark',
      // Dark theme with neutral background
      dark: { ...themes.dark, appBg: '#262626', appContentBg: '#262626' },
      // Apply dark class to the html element
      darkClass: 'dark',
      stylePreview: true,
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark neutral', value: '#262626' } // Neutral 800 equivalent
      ]
    }
  },
};

export default preview;
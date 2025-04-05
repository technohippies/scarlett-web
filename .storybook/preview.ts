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
      // Set dark mode as the default and only option
      current: 'dark',
      // Dark theme with neutral background
      dark: { ...themes.dark, appBg: '#1e1e2e', appContentBg: '#1e1e2e' },
      // Apply dark class to the html element
      darkClass: 'dark',
      stylePreview: true,
    },
    backgrounds: {
      default: 'dark neutral',
      values: [
        { name: 'dark neutral', value: '#1e1e2e' } // Neutral 800 equivalent
      ]
    }
  },
};

export default preview;
import type { Preview } from '@storybook/react'
import '../src/index.css'; // Import global styles

/**
 * Dark theme only configuration
 * All stories will be forced to dark mode
 */
const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#121212' }
      ]
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      // Force dark theme by adding dark class to document
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      }
      return Story();
    },
  ],
};

export default preview;
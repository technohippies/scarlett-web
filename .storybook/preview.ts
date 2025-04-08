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
  }
};

export default preview;
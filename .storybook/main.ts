import type { StorybookConfig } from '@storybook/react-vite';
import path from "path";
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  async viteFinal(config) {
    // Merge custom configuration into the default Vite config
    return mergeConfig(config, {
      // Add alias resolution
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
      css: {
        postcss: {
          // Let Vite handle PostCSS with the project's config
        }
      }
    });
  },
};
export default config;
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Header } from '@/components/ui/header';

const meta = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#171717' }, // neutral-900
        { name: 'light', value: '#f5f5f5' }, // neutral-100
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-950 min-h-[120px]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    leftIcon: {
      control: 'select',
      options: [null, 'hamburger', 'x', 'chevronLeft'],
      description: 'Left icon (using Phosphor icons: List, X, CaretLeft)',
    },
    rightIcon: {
      control: 'select',
      options: [null, 'threeCards', 'brain'],
      description: 'Right icon (using Phosphor icons: Cards, Brain)',
    },
    centerImage: {
      control: 'text',
    },
    centerText: {
      control: 'text',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    showCenter: {
      control: 'boolean',
      description: 'Show center content (automatically hidden for back and close buttons)',
    }
  },
  args: {
    onLeftIconClick: fn(),
    onRightIconClick: fn(),
    centerImage: '/tutor/thumb.png',
    centerText: 'Scarlett 英语导师',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftIcon: 'hamburger',
    rightIcon: 'threeCards',
  },
};

export const WithProgressBar: Story = {
  args: {
    leftIcon: 'hamburger',
    rightIcon: 'threeCards',
    progress: 45,
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-950">
        <div className="pb-6">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const BackButton: Story = {
  args: {
    leftIcon: 'chevronLeft',
    rightIcon: null,
    showCenter: false,
  },
};

export const CloseButton: Story = {
  args: {
    leftIcon: 'x',
    rightIcon: null,
    showCenter: false,
  },
};

export const FullFeatured: Story = {
  args: {
    leftIcon: 'hamburger',
    rightIcon: 'threeCards',
    progress: 75,
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-950">
        <div className="pb-6">
          <Story />
        </div>
      </div>
    ),
  ],
}; 
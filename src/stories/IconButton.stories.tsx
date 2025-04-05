import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton } from '@/components/ui/icon-button';
import { 
  SpeakerHigh, 
  Play, 
  Question,
  Plus,
  Trash
} from "phosphor-react"

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#171717' }, // neutral-900
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['default', 'full'],
    },
    disabled: {
      control: 'boolean',
    }
  },
  args: {
    onClick: fn(),
    icon: <SpeakerHigh size={20} />,
    disabled: false
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    icon: <Play size={20} />
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: <Play size={20} />
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    icon: <Trash size={20} />
  },
};

export const RoundedFull: Story = {
  args: {
    rounded: 'full',
    icon: <Plus size={20} />
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    icon: <Question size={16} />
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    icon: <SpeakerHigh size={24} />
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    icon: <SpeakerHigh size={20} />
  },
}; 
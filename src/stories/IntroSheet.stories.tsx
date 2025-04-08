import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IntroSheet } from '@/components/ui/intro-sheet';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'UI/IntroSheet',
  component: IntroSheet,
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
    titleEn: {
      control: 'text',
    },
    titleZh: {
      control: 'text',
    },
    contentItems: {
      control: 'object',
    },
  },
  args: {
    titleEn: "I'm Scarlett",
    titleZh: "我是斯嘉丽",
    contentItems: [
      {
        icon: 'info',
        text: '友好接受请求'
      },
      {
        icon: 'note',
        text: '轻松自然的社交开场。'
      }
    ],
    trigger: <Button variant="outline">Open Introduction</Button>,
    onPlayAudio: fn(),
  },
} satisfies Meta<typeof IntroSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AIMessage } from '@/components/ui/ai-message';

const meta = {
  title: 'UI/AIMessage',
  component: AIMessage,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#171717' }, // neutral-900
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-900 p-4 max-w-xl">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
    },
    highlights: {
      control: 'object',
    },
  },
  args: {
    text: "This is an AI message that explains how to use the past tense in English.",
    onPlayAudio: async () => {
      // Simulate loading time
      return new Promise((resolve) => setTimeout(resolve, 1500));
    },
    onSpeedChange: fn(),
    onHelp: fn(),
  },
} satisfies Meta<typeof AIMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHighlights: Story = {
  args: {
    text: "The present perfect tense is used to describe an action that happened at an unspecified time before now. For example: 'I have visited Paris three times.'",
    highlights: [
      {
        text: "present perfect tense",
        explanation: "The present perfect tense is formed using 'have/has' + past participle. It connects past actions to the present."
      },
      {
        text: "I have visited Paris three times",
        explanation: "This example shows how the present perfect tense describes experience without specifying when it happened."
      }
    ]
  }
};

export const Loading: Story = {
  args: {
    text: "This example shows the loading spinner animation that appears when generating audio.",
    onPlayAudio: async () => {
      // This promise never resolves to keep the loading state
      return new Promise(() => {});
    }
  },
  play: async ({ canvasElement }) => {
    // Find and click the audio button to trigger loading state
    const audioButton = canvasElement.querySelector('button:first-of-type') as HTMLButtonElement;
    if (audioButton) {
      audioButton.click();
    }
  }
};

export const AudioReady: Story = {
  args: {
    text: "When you click the speaker icon, the audio starts loading and then plays the message.",
  },
};

export const SpeedChanges: Story = {
  args: {
    text: "Click the 1x button to change playback speed between 1x, 0.7x, and 0.5x.",
  },
  play: async ({ canvasElement }) => {
    // Find and click the speed button to cycle through speeds
    const speedButton = canvasElement.querySelectorAll('button')[1] as HTMLButtonElement;
    if (speedButton) {
      speedButton.click();
    }
  }
}; 
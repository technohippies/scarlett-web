import type { Meta, StoryObj } from '@storybook/react';
import { SubmitDeckPage } from '@/components/pages/SubmitDeckPage';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SubmitDeckPage> = {
  title: 'Pages/SubmitDeckPage',
  component: SubmitDeckPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Flashcard deck submission with CSV import or manual entry.',
      },
    },
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    isSubmitting: {
      control: 'boolean',
      description: 'Shows uploading state during Tableland submission',
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: action('deck-submitted'),
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    onSubmit: action('deck-submitted'),
    isSubmitting: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Showing the uploading state during submission.',
      },
    },
  },
}; 
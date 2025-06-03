import type { Meta, StoryObj } from '@storybook/react';
import { SubmitDeckPage, SubmitDeckFormData } from '@/components/pages/SubmitDeckPage';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SubmitDeckPage> = {
  title: 'Pages/SubmitDeckPage',
  component: SubmitDeckPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Flashcard deck submission with CSV import or manual entry. Supports media files via Irys.',
      },
    },
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    isSubmitting: {
      control: 'boolean',
      description: 'Shows uploading state during Irys + Tableland submission',
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

const handleSubmit = (data: SubmitDeckFormData) => {
  action('onSubmit')(data);
  console.log('Deck submitted:', {
    deck: {
      name: data.name,
      description: data.description,
      languages: `${data.frontLanguage} → ${data.backLanguage}`,
    },
    mode: data.inputMode,
    cards: data.inputMode === 'manual' ? data.flashcards.length : 'CSV',
    mediaFiles: data.inputMode === 'manual' ? 
      data.flashcards.filter(c => c.frontFile || c.backFile).length : 
      'Unknown'
  });
};

export const ManualEntry: Story = {
  args: {
    onSubmit: handleSubmit,
    isSubmitting: false,
  },
};

export const CsvImport: Story = {
  args: {
    onSubmit: handleSubmit,
    isSubmitting: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle to CSV mode to test file upload interface.',
      },
    },
  },
};

export const Uploading: Story = {
  args: {
    onSubmit: handleSubmit,
    isSubmitting: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state during Irys media upload and Tableland submission.',
      },
    },
  },
}; 
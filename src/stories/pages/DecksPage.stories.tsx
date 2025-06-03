import type { Meta, StoryObj } from "@storybook/react";
// Update import path and component name
import { DecksPage, Deck } from "@/components/pages/DecksPage"; 

const meta: Meta<typeof DecksPage> = {
  // Update title and component reference
  title: "Pages/DecksPage", 
  component: DecksPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: 'Displays a table of flashcard decks with navigation links.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    decks: { control: "object" },
  },
} satisfies Meta<typeof DecksPage>; // Update component reference

export default meta;

type Story = StoryObj<typeof meta>;

const sampleDecks: Deck[] = [
  {
    id: 2,
    row_id: 2,
    owner_address: "0xB0dD2a6FAB0180C8b2fc4f144273Cc693d7896Ed",
    deck_slug: "hsk-vocabulary-en-zh-1",
    name: "HSK Vocabulary (Level 1-6)",
    description: "Comprehensive HSK 1-6 vocabulary from the standardized Chinese Proficiency Test. Ideal for learners aiming for fluency.",
    front_content_type: "text",
    back_content_type: "text",
    front_language: "en",
    back_language: "zh",
    image_cid: null,
    attributes: {},
    created_at: "2025-05-09T10:19:03.991Z",
    updated_at: "2025-05-09T10:19:03.991Z",
  },
  {
    id: 3,
    row_id: 3,
    owner_address: "0x1234567890abcdef1234567890abcdef12345678",
    deck_slug: "spanish-greetings",
    name: "Spanish Greetings & Common Phrases",
    description: "Essential Spanish phrases for everyday conversations.",
    front_content_type: "text",
    back_content_type: "text",
    front_language: "en",
    back_language: "es",
    image_cid: null,
    attributes: {},
    created_at: "2025-05-09T10:29:59.964Z",
    updated_at: "2025-05-09T10:29:59.964Z",
  },
  {
    id: 4,
    row_id: 4,
    owner_address: "0xabcdef1234567890abcdef1234567890abcdef12",
    deck_slug: "japanese-hiragana",
    name: "Japanese Hiragana",
    description: "Learn all 46 basic hiragana characters.",
    front_content_type: "text",
    back_content_type: "text",
    front_language: "en",
    back_language: "ja",
    image_cid: null,
    attributes: {},
    created_at: "2025-05-09T17:41:17.921Z",
    updated_at: "2025-05-09T17:41:17.921Z",
  },
  {
    id: 5,
    row_id: 5,
    owner_address: "0x9876543210fedcba9876543210fedcba98765432",
    deck_slug: "vietnamese-numbers",
    name: "Vietnamese Numbers",
    description: "Learn to count in Vietnamese from 1 to 100.",
    front_content_type: "text",
    back_content_type: "text",
    front_language: "en",
    back_language: "vi",
    image_cid: null,
    attributes: {},
    created_at: "2025-05-09T17:44:11.051Z",
    updated_at: "2025-05-09T17:44:11.051Z",
  },
];

export const Default: Story = {
  args: {
    decks: sampleDecks,
  },
};

export const EmptyState: Story = {
  args: {
    decks: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the empty state when no decks are available.',
      },
    },
  },
}; 
import type { Meta, StoryObj } from "@storybook/react";
// Update import path and component name
import { DecksPage, Deck } from "@/components/pages/DecksPage"; 

const meta = {
  // Update title and component reference
  title: "Pages/DecksPage", 
  component: DecksPage,
  parameters: {
    layout: "padded", 
    backgrounds: {
      default: "dark",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#171717" },
      ],
    },
  },
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
    owner_address: "0xB0dD2a6FAB0180C8b2fc4f144273Cc693d7896Ed",
    deck_slug: "hsk-vocabulary-en-zh-1",
    name: "HSK Vocabulary",
    description: "HSK 1-6 vocabulary from the standardized Chinese Proficiency Test of China.",
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
    owner_address: "0xB0dD2a6FAB0180C8b2fc4f144273Cc693d7896Ed",
    deck_slug: "kaishi-1-5k-en-ja-1",
    name: "Kaishi 1.5k",
    description: "A popular modern Anki deck made to introduce beginners to basic Japanese vocabulary",
    front_content_type: "text",
    back_content_type: "text",
    front_language: "en",
    back_language: "ja",
    image_cid: null,
    attributes: {},
    created_at: "2025-05-09T10:29:59.964Z",
    updated_at: "2025-05-09T10:29:59.964Z",
  },
  {
    id: 4,
    owner_address: "0xB0dD2a6FAB0180C8b2fc4f144273Cc693d7896Ed",
    deck_slug: "programmer-en-vi-1",
    name: "Programmer English",
    description: "Một bộ thẻ dành cho người Việt học các thuật ngữ lập trình tiếng Anh.",
    front_content_type: "text",
    back_content_type: "text",
    front_language: "vi",
    back_language: "en",
    image_cid: null,
    attributes: {},
    created_at: "2025-05-09T17:41:17.921Z",
    updated_at: "2025-05-09T17:41:17.921Z",
  },
  {
    id: 5,
    owner_address: "0xB0dD2a6FAB0180C8b2fc4f144273Cc693d7896Ed",
    deck_slug: "travel-vietnamese-english-vi-en-1",
    name: "Travel Vietnamese English",
    description: "Một bộ thẻ dành cho người Việt học các cụm từ du lịch tiếng Anh.",
    front_content_type: "text",
    back_content_type: "text",
    front_language: "vi",
    back_language: "en",
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

export const Empty: Story = {
  args: {
    decks: [],
  },
}; 
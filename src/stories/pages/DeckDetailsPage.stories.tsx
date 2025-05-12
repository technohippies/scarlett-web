import type { Meta, StoryObj } from "@storybook/react";
// Update component import path
import { DeckDetailPage, Flashcard } from "@/components/pages/DeckDetailsPage"; 
// Update Deck import path
import { Deck } from "@/components/pages/DecksPage"; 

const meta = {
  // Update title
  title: "Pages/DeckDetailPage", 
  component: DeckDetailPage,
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
    deck: { control: "object" },
    flashcards: { control: "object" },
  },
} satisfies Meta<typeof DeckDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

// Sample Deck data (can be one from DecksPanel.stories or a new one)
const sampleDeck: Deck = {
  id: 2,
  owner_address: "0xB0dD2a6FAB0180C8b2fc4f144273Cc693d7896Ed",
  deck_slug: "hsk-vocabulary-en-zh-1",
  name: "HSK Vocabulary (Level 1-6)",
  description: "Comprehensive HSK 1-6 vocabulary from the standardized Chinese Proficiency Test. Ideal for learners aiming for fluency.",
  front_content_type: "text",
  back_content_type: "text",
  front_language: "en",
  back_language: "zh",
  image_cid: null,
  attributes: { level: "1-6", source: "official" },
  created_at: "2025-05-09T10:19:03.991Z",
  updated_at: "2025-05-09T10:19:03.991Z",
};

// Sample Flashcard data based on your provided schema and linked to sampleDeck (id: 2)
const sampleFlashcards: Flashcard[] = [
  {
    id: 340,
    deck_row_id: 2,
    front_text: "to love",
    front_image_cid: null,
    front_audio_cid: null,
    front_phonetic_guide: null,
    back_text: "爱",
    back_image_cid: null,
    back_audio_cid: null,
    back_phonetic_guide: "ài",
    notes: "Commonly used verb.",
    attributes: { part_of_speech: "verb" },
    created_at: "2025-05-09T13:41:39.082Z",
    updated_at: "2025-05-09T13:41:39.082Z",
  },
  {
    id: 341,
    deck_row_id: 2,
    front_text: "eight",
    front_image_cid: null,
    front_audio_cid: null,
    front_phonetic_guide: null,
    back_text: "八",
    back_image_cid: null,
    back_audio_cid: null,
    back_phonetic_guide: "bā",
    notes: null,
    attributes: { category: "number" },
    created_at: "2025-05-09T13:41:39.082Z",
    updated_at: "2025-05-09T13:41:39.082Z",
  },
  {
    id: 342,
    deck_row_id: 2,
    front_text: "(informal) father",
    front_image_cid: null,
    front_audio_cid: null,
    front_phonetic_guide: null,
    back_text: "爸爸",
    back_image_cid: null,
    back_audio_cid: null,
    back_phonetic_guide: "bà ba",
    notes: "Casual term for father.",
    attributes: { formality: "informal" },
    created_at: "2025-05-09T13:41:39.082Z",
    updated_at: "2025-05-09T13:41:39.082Z",
  },
  {
    id: 343,
    deck_row_id: 2,
    front_text: "cup",
    front_image_cid: null,
    front_audio_cid: null,
    front_phonetic_guide: null,
    back_text: "杯子",
    back_image_cid: null,
    back_audio_cid: null,
    back_phonetic_guide: "bēi zi",
    notes: null,
    attributes: { measure_word: "个" },
    created_at: "2025-05-09T13:41:39.082Z",
    updated_at: "2025-05-09T13:41:39.082Z",
  },
  {
    id: 344,
    deck_row_id: 2,
    front_text: "Beijing",
    front_image_cid: null,
    front_audio_cid: null,
    front_phonetic_guide: null,
    back_text: "北京",
    back_image_cid: null,
    back_audio_cid: null,
    back_phonetic_guide: "Běi jīng",
    notes: "Capital of China.",
    attributes: { type: "location", country: "China" },
    created_at: "2025-05-09T13:41:39.082Z",
    updated_at: "2025-05-09T13:41:39.082Z",
  },
];

export const Default: Story = {
  args: {
    deck: sampleDeck,
    flashcards: sampleFlashcards,
  },
};

export const EmptyDeck: Story = {
  args: {
    deck: {
      ...sampleDeck,
      name: "Empty Deck Example",
      description: "This deck has no flashcards to display."
    },
    flashcards: [],
  },
};

export const MinimalDeckInfo: Story = {
    args: {
        deck: {
            id: 3,
            owner_address: "0x1234567890abcdef1234567890abcdef12345678",
            deck_slug: "minimal-deck",
            name: "Minimal Info Deck",
            description: "",
            front_content_type: "text",
            back_content_type: "text",
            front_language: "en",
            back_language: "es",
            image_cid: null,
            attributes: {},
            created_at: "2025-01-01T00:00:00.000Z",
            updated_at: "2025-01-01T00:00:00.000Z",
        },
        flashcards: [
            {
                id: 1,
                deck_row_id: 3,
                front_text: "Hello",
                front_image_cid: null,
                front_audio_cid: null,
                front_phonetic_guide: null,
                back_text: "Hola",
                back_image_cid: null,
                back_audio_cid: null,
                back_phonetic_guide: null,
                notes: null,
                attributes: null,
                created_at: "2025-01-01T00:00:00.000Z",
                updated_at: "2025-01-01T00:00:00.000Z",
            }
        ],
    }
}; 
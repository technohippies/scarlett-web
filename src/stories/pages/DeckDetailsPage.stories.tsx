import type { Meta, StoryObj } from "@storybook/react";
// Update component import path
import { DeckDetailPage, Flashcard } from "@/components/pages/DeckDetailsPage"; 
// Update Deck import path
import { Deck } from "@/components/pages/DecksPage"; 

const meta: Meta<typeof DeckDetailPage> = {
  // Update title
  title: "Pages/DeckDetailPage", 
  component: DeckDetailPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: 'Displays detailed view of a flashcard deck with all its cards in a table format.',
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
    deck: { control: "object" },
    flashcards: { control: "object" },
  },
} satisfies Meta<typeof DeckDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

// Mock deck data
const mockDeck: Deck = {
  id: 1,
  row_id: 1,
  deck_slug: 'spanish-basics',
  name: 'Spanish Basics',
  description: 'Essential Spanish vocabulary for beginners',
  front_language: 'en',
  back_language: 'es',
  owner_address: '0x123...abc',
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
  front_content_type: 'text',
  back_content_type: 'text',
  image_cid: null,
  attributes: { level: 'beginner' },
};

// Mock flashcard data
const mockFlashcards: Flashcard[] = [
  {
    id: 1,
    deck_row_id: 1,
    front_text: 'Hello',
    front_phonetic_guide: '/həˈloʊ/',
    back_text: 'Hola',
    back_phonetic_guide: '/ˈo.la/',
    notes: 'Common greeting',
    attributes: { difficulty: 'easy' },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    deck_row_id: 1,
    front_text: 'Goodbye',
    front_phonetic_guide: '/ɡʊdˈbaɪ/',
    back_text: 'Adiós',
    back_phonetic_guide: '/aˈð̞jos/',
    notes: 'Formal farewell',
    attributes: { difficulty: 'easy' },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 3,
    deck_row_id: 1,
    front_text: 'Thank you',
    front_phonetic_guide: '/θæŋk juː/',
    back_text: 'Gracias',
    back_phonetic_guide: '/ˈɡɾa.θjas/',
    notes: 'Expression of gratitude',
    attributes: { difficulty: 'easy' },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 4,
    deck_row_id: 1,
    front_text: 'Please',
    front_phonetic_guide: '/pliːz/',
    back_text: 'Por favor',
    back_phonetic_guide: '/poɾ faˈβ̞oɾ/',
    notes: 'Polite request',
    attributes: { difficulty: 'easy' },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 5,
    deck_row_id: 1,
    front_text: 'Excuse me',
    front_phonetic_guide: '/ɪkˈskjuːz miː/',
    back_text: 'Disculpe',
    back_phonetic_guide: '/d̪isˈkul.pe/',
    notes: 'Getting attention politely',
    attributes: { difficulty: 'medium' },
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
];

export const WithCards: Story = {
  args: {
    deck: mockDeck,
    flashcards: mockFlashcards,
  },
  parameters: {
    docs: {
      description: {
        story: 'Deck detail page showing a deck with multiple flashcards.',
      },
    },
  },
};

// Empty deck story
const emptyDeck: Deck = {
  ...mockDeck,
  name: 'Empty Deck',
  description: 'A deck with no flashcards yet',
};

export const EmptyDeck: Story = {
  args: {
    deck: emptyDeck,
    flashcards: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Deck detail page showing an empty deck with no flashcards.',
      },
    },
  },
};

export const MinimalDeckInfo: Story = {
    args: {
        deck: {
            id: 3,
            row_id: 3,
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
                front_phonetic_guide: null,
                back_text: "Hola",
                back_phonetic_guide: null,
                notes: null,
                attributes: null,
                created_at: "2025-01-01T00:00:00.000Z",
                updated_at: "2025-01-01T00:00:00.000Z",
            }
        ],
    }
}; 
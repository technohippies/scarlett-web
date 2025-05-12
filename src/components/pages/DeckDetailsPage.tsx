import * as React from 'react';
// Update import path for Deck type
import { Deck } from './DecksPage'; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// Import hooks and service functions
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { fetchDeckBySlug, fetchCardsForDeck } from '@/services/TablelandService'; 

// Define the structure for a single flashcard based on the provided schema
export interface Flashcard {
  id: number;
  deck_row_id: number;
  front_text: string | null;
  front_image_cid: string | null;
  front_audio_cid: string | null;
  front_phonetic_guide: string | null;
  back_text: string | null;
  back_image_cid: string | null;
  back_audio_cid: string | null;
  back_phonetic_guide: string | null;
  notes: string | null;
  attributes: Record<string, any> | null; // JSON or similar structure
  created_at: string;
  updated_at: string;
}

// Restore props interface
export interface DeckDetailPageProps { 
  deck: Deck;
  flashcards: Flashcard[];
}

// Restore component signature to accept props
export const DeckDetailPage: React.FC<DeckDetailPageProps> = ({ deck, flashcards }) => {
  // Remove state and effects
  // const { deckSlug } = useParams<{ deckSlug: string }>();
  // const [deck, setDeck] = useState<Deck | null>(null);
  // const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => { ... }, [deckSlug]);

  // Remove loading/error checks, assume data is passed in ready
  // if (isLoading) { ... }
  // if (error) { ... }
  // if (!deck) { ... }

  // Original render logic using props
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-1">{deck.name}</h2>
        {deck.description && (
          <p className="text-muted-foreground">{deck.description}</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold tracking-tight mb-3">Flashcards ({flashcards.length})</h3>
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Front</TableHead>
                        <TableHead>Back</TableHead>
                        <TableHead>Notes</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {flashcards.length > 0 ? (
                    flashcards.map((card) => (
                        <TableRow key={card.id}>
                            <TableCell>{card.front_text || ''}</TableCell>
                            <TableCell>{card.back_text || ''}</TableCell>
                            <TableCell>{card.notes || ''}</TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                            No flashcards found for this deck.
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
};

export default DeckDetailPage; 
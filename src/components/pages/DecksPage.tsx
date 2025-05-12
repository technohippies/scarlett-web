import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

// Define the structure of a single deck based on the tableland data
export interface Deck {
  id: number;
  owner_address: string;
  deck_slug: string;
  name: string;
  description: string;
  front_content_type: string;
  back_content_type: string;
  front_language: string;
  back_language: string;
  image_cid?: string | null; // Optional
  attributes?: any; // Can be more specific if needed
  created_at: string;
  updated_at: string;
}

export interface DecksPageProps { // Renamed from DecksPanelProps
  decks: Deck[];
}

function truncateAddress(address?: string) {
  if (!address) return "";
  // Show first 6 and last 4 characters
  return address.length > 10 ? address.slice(0, 6) + "..." + address.slice(-4) : address;
}

// Helper to get full language name from code
function getLanguageName(code: string): string {
  const languageMap: { [key: string]: string } = {
    en: "English",
    zh: "Chinese",
    ja: "Japanese",
    vi: "Vietnamese",
    // Add more languages as needed
  };
  return languageMap[code.toLowerCase()] || code; // Return code if not found
}

export const DecksPage: React.FC<DecksPageProps> = ({ decks = [] }) => { // Renamed from DecksPanel
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Shared Decks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="w-[120px]">Language</TableHead>
            <TableHead className="w-[150px]">Target Language</TableHead>
            <TableHead className="w-[150px] text-right">Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {decks.length > 0 ? (
            decks.map((deck) => (
              <TableRow key={deck.id}>
                <TableCell className="font-medium">
                  <a href="#" className="text-blue-500 hover:underline">
                    {deck.name}
                  </a>
                </TableCell>
                <TableCell>{getLanguageName(deck.front_language)}</TableCell>
                <TableCell>{getLanguageName(deck.back_language)}</TableCell>
                <TableCell className="font-mono text-xs text-right">
                   <a href="#" className="text-blue-500 hover:underline">
                      {truncateAddress(deck.owner_address)}
                   </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No decks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DecksPage; // Renamed from DecksPanel 
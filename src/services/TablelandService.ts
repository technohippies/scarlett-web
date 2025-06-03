import type { Deck } from "@/components/pages/DecksPage"; // Update import path for Deck type

const TABLELAND_BASE_URL = 'https://testnets.tableland.network/api/v1/query?statement=';
// Use the exact name from your example
const SUPERCOACH_DECKS_METADATA_TABLE_NAME = 'supercoach_deck_84532_110';

// Interface matching the raw structure returned by your Tableland deck metadata query
interface RawTablelandDeckMetadata {
    tableland_deck_pk: number; // This is the 'id' column from the table
    deck_slug: string;
    name: string;
    description: string | null;
    front_language: string;
    back_language: string;
    owner_address: string;  // Added
    created_at: string;     // Added
    updated_at: string;     // Added
    // Add other columns if you query them (e.g., image_cid)
}

// --- Tableland Query Helper --- (Copied from your example)
async function queryTableland(sql: string): Promise<any[]> {
    const encodedSql = encodeURIComponent(sql);
    const fetchUrl = `${TABLELAND_BASE_URL}${encodedSql}`;
    console.log(`[queryTableland] Fetching from: ${fetchUrl}`);
    try {
        const response = await fetch(fetchUrl, {
            headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[queryTableland] Tableland query failed (status: ${response.status}) for SQL: ${sql.substring(0, 100)}... Error: ${errorText}`);
            throw new Error(`Tableland query failed: ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        console.log(`[queryTableland] Received ${data?.length ?? 0} items from Tableland.`);
        return data;
    } catch (error) {
        console.error(`[queryTableland] Network or parsing error for SQL: ${sql}. Error:`, error);
        throw error; // Re-throw to be caught by caller
    }
}
// --- End Tableland Query Helper ---

// Function to fetch all deck metadata
export async function fetchAllDecks(): Promise<Deck[]> {
    console.log(`[TablelandService] Fetching all decks metadata from ${SUPERCOACH_DECKS_METADATA_TABLE_NAME}...`);
    const sql = `
        SELECT
            id as tableland_deck_pk,
            deck_slug,
            name,
            description,
            front_language,
            back_language,
            owner_address,
            created_at,
            updated_at
        FROM
            ${SUPERCOACH_DECKS_METADATA_TABLE_NAME}
        ORDER BY name; 
    `;

    try {
        // Assuming queryTableland returns results matching RawTablelandDeckMetadata
        const rawDecks = await queryTableland(sql) as RawTablelandDeckMetadata[];

        // Process raw data into the Deck format required by DecksPanel
        const processedDecks: Deck[] = rawDecks.map(rawDeck => ({
            id: rawDeck.tableland_deck_pk,
            row_id: rawDeck.tableland_deck_pk,
            deck_slug: rawDeck.deck_slug,
            name: rawDeck.name,
            description: rawDeck.description || '',
            front_language: rawDeck.front_language,
            back_language: rawDeck.back_language,
            owner_address: rawDeck.owner_address || '',
            created_at: rawDeck.created_at || '',
            updated_at: rawDeck.updated_at || '',
            front_content_type: 'text', // Assuming default, adjust if fetched
            back_content_type: 'text',  // Assuming default, adjust if fetched
            image_cid: null, // Default value
            attributes: {},  // Default value
        }));

        console.log(`[TablelandService] Successfully fetched and processed ${processedDecks.length} decks.`);
        return processedDecks;
    } catch (error) {
        console.error('[TablelandService] Error in fetchAllDecks:', error);
        return []; // Return empty array on error
    }
}

// Function to fetch details for a single deck by slug
export async function fetchDeckBySlug(slug: string): Promise<Deck | null> {
    console.log(`[TablelandService] Fetching deck by slug: ${slug}...`);
    const sql = `
        SELECT
            id as tableland_deck_pk,
            deck_slug,
            name,
            description,
            front_language,
            back_language,
            owner_address,
            created_at,
            updated_at,
            front_content_type, 
            back_content_type, 
            image_cid, 
            attributes
        FROM
            ${SUPERCOACH_DECKS_METADATA_TABLE_NAME}
        WHERE
            deck_slug = '${slug}' 
        LIMIT 1;
    `;

    try {
        const results = await queryTableland(sql);
        if (results && results.length > 0) {
            const rawDeck = results[0] as any; // Use 'any' for simplicity or define a detailed raw type
            // Process raw data into the Deck format
            const processedDeck: Deck = {
                id: rawDeck.tableland_deck_pk,
                row_id: rawDeck.tableland_deck_pk,
                deck_slug: rawDeck.deck_slug,
                name: rawDeck.name,
                description: rawDeck.description || '',
                front_language: rawDeck.front_language || '',
                back_language: rawDeck.back_language || '',
                owner_address: rawDeck.owner_address || '',
                created_at: rawDeck.created_at || '',
                updated_at: rawDeck.updated_at || '',
                front_content_type: rawDeck.front_content_type || 'text', 
                back_content_type: rawDeck.back_content_type || 'text', 
                image_cid: rawDeck.image_cid ?? null,
                attributes: typeof rawDeck.attributes === 'string' ? JSON.parse(rawDeck.attributes) : (rawDeck.attributes ?? null),
            };
            console.log(`[TablelandService] Successfully fetched deck for slug ${slug}.`);
            return processedDeck;
        } else {
            console.log(`[TablelandService] No deck found for slug: ${slug}.`);
            return null;
        }
    } catch (error) {
        console.error(`[TablelandService] Error in fetchDeckBySlug for slug ${slug}:`, error);
        return null; // Return null on error
    }
}

// --- Assume Flashcard table name ---
// Corrected table name to be plural 'flashcards'
const TABLELAND_FLASHCARDS_TABLE_NAME = 'supercoach_flashcards_84532_111';

// Function to fetch cards for a specific deck 
// Re-import Flashcard type if it was removed, ensure correct path
import { Flashcard } from "@/components/pages/DeckDetailsPage"; 

export async function fetchCardsForDeck(deckId: number): Promise<Flashcard[]> {
    console.log(`[TablelandService] Fetching cards for deck ID: ${deckId}...`);
    // Construct the SQL query
    // Select all columns from the Flashcard interface
    const sql = `
        SELECT 
            id, 
            deck_row_id, 
            front_text, 
            front_phonetic_guide, 
            back_text, 
            back_phonetic_guide, 
            notes, 
            attributes, 
            created_at, 
            updated_at 
        FROM 
            ${TABLELAND_FLASHCARDS_TABLE_NAME} 
        WHERE 
            deck_row_id = ${deckId} 
        ORDER BY 
            id;
    `;

    try {
        // Use the query helper. It might return objects that need type assertion.
        const rawCards = await queryTableland(sql);

        // Basic validation and mapping (add more robust checks if needed)
        const processedCards: Flashcard[] = rawCards.map(card => ({
            id: card.id,
            deck_row_id: card.deck_row_id,
            front_text: card.front_text ?? null,
            front_phonetic_guide: card.front_phonetic_guide ?? null,
            back_text: card.back_text ?? null,
            back_phonetic_guide: card.back_phonetic_guide ?? null,
            notes: card.notes ?? null,
            // Ensure attributes is an object or null
            attributes: typeof card.attributes === 'string' ? JSON.parse(card.attributes) : (card.attributes ?? null),
            created_at: card.created_at || '', 
            updated_at: card.updated_at || '', 
        }));

        console.log(`[TablelandService] Successfully fetched ${processedCards.length} cards for deck ${deckId}.`);
        return processedCards;
    } catch (error) {
        console.error(`[TablelandService] Error fetching cards for deck ${deckId}:`, error);
        return []; // Return empty array on error
    }
} 
import type { Deck } from "@/components/layout/DecksPanel"; // Import Deck type if needed

const TABLELAND_BASE_URL = 'https://testnets.tableland.network/api/v1/query?statement=';
// Use the exact name from your example
const SUPERCOACH_DECKS_METADATA_TABLE_NAME = 'supercoach_deck_84532_110';

// Interface matching the raw structure returned by your Tableland deck metadata query
interface RawTablelandDeckMetadata {
    tableland_deck_pk: number; // Assuming this is the primary key 'id' from the table
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
            deck_slug: rawDeck.deck_slug,
            name: rawDeck.name,
            description: rawDeck.description || '', // Handle null description
            front_language: rawDeck.front_language,
            back_language: rawDeck.back_language,
            owner_address: rawDeck.owner_address || '', // Ensure owner_address is always a string
            created_at: rawDeck.created_at || '', // Ensure created_at is always a string
            updated_at: rawDeck.updated_at || '', // Ensure updated_at is always a string
            // --- Add default values for other non-optional Deck fields if any --- 
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

// Function to fetch details for a single deck by slug (placeholder for later)
export async function fetchDeckBySlug(slug: string): Promise<Deck | null> {
    console.log(`[TablelandService] Fetching deck by slug: ${slug}...`);
    // TODO: Implement SQL query to fetch a single deck's metadata by deck_slug
    // const sql = `SELECT ... FROM ${SUPERCOACH_DECKS_METADATA_TABLE_NAME} WHERE deck_slug = '${slug}' LIMIT 1;`;
    // const results = await queryTableland(sql);
    // if (results && results.length > 0) { process result }
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async
    console.warn('[TablelandService] fetchDeckBySlug not fully implemented.');
    return null; // Placeholder
}

// Function to fetch cards for a specific deck (placeholder for later)
export async function fetchCardsForDeck(deckTablelandId: number): Promise<any[]> {
    console.log(`[TablelandService] Fetching cards for deck ID: ${deckTablelandId}...`);
    // TODO: Implement SQL query using TABLELAND_FLASHCARDS_TABLE_NAME and deckTablelandId (deck_row_id)
    // const sql = `SELECT ... FROM ${TABLELAND_FLASHCARDS_TABLE_NAME} WHERE deck_row_id = ${deckTablelandId};`;
    // return queryTableland(sql);
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async
     console.warn('[TablelandService] fetchCardsForDeck not fully implemented.');
    return []; // Placeholder
} 
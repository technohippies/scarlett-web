import { Database } from "@tableland/sdk";
import { Uploader } from "@irys/upload";
import { BaseEth } from "@irys/upload-ethereum";
import { authService } from "./AuthService";
import { SubmitDeckFormData, Flashcard } from "@/components/pages/SubmitDeckPage";

const STAGING_DECK_TABLE = "staging_deck_1_84532_112";
const STAGING_FLASHCARD_TABLE = "staging_spaced_repetition_1_84532_113";

interface IrysUploadResult {
  id: string;
  timestamp: number;
}

export class SubmissionService {
  private async getIrysUploader() {
    // For now, let's use a mock uploader until we can fix the API usage
    return {
      uploadFile: async (file: File) => {
        console.log(`Mock uploading file: ${file.name}`);
        // Return a mock CID for testing
        return { 
          id: `mock_cid_${Date.now()}_${file.name}`,
          timestamp: Date.now()
        };
      }
    };
  }

  private async getTablelandDatabase() {
    const signer = authService.getSigner();
    if (!signer) {
      throw new Error("Wallet not connected");
    }
    
    return new Database({ signer: signer as any });
  }

  async uploadFileToIrys(file: File): Promise<string> {
    const irysUploader = await this.getIrysUploader();
    
    try {
      const result: IrysUploadResult = await irysUploader.uploadFile(file);
      
      console.log(`File uploaded to Irys: ${result.id}`);
      return result.id;
    } catch (error) {
      console.error("Error uploading to Irys:", error);
      throw new Error(`Failed to upload ${file.name} to Irys`);
    }
  }

  async uploadMediaFiles(flashcards: Flashcard[]): Promise<Flashcard[]> {
    const updatedCards: Flashcard[] = [];
    
    for (const card of flashcards) {
      const updatedCard = { ...card };
      
      // Upload front media files
      if (card.frontImageFile) {
        updatedCard.front_image_cid = await this.uploadFileToIrys(card.frontImageFile);
      }
      if (card.frontAudioFile) {
        updatedCard.front_audio_cid = await this.uploadFileToIrys(card.frontAudioFile);
      }
      
      // Upload back media files
      if (card.backImageFile) {
        updatedCard.back_image_cid = await this.uploadFileToIrys(card.backImageFile);
      }
      if (card.backAudioFile) {
        updatedCard.back_audio_cid = await this.uploadFileToIrys(card.backAudioFile);
      }
      
      updatedCards.push(updatedCard);
    }
    
    return updatedCards;
  }

  async submitDeckToTableland(formData: SubmitDeckFormData, flashcardsWithCids: Flashcard[]): Promise<void> {
    const db = await this.getTablelandDatabase();
    const userAddress = authService.getUserAddress();
    
    if (!userAddress) {
      throw new Error("User address not available");
    }

    try {
      // Generate deck slug from name
      const deckSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 50);

      const timestamp = new Date().toISOString();

      // Insert deck
      const deckInsertSql = `
        INSERT INTO ${STAGING_DECK_TABLE} 
        (owner_address, deck_slug, name, description, front_content_type, back_content_type, front_language, back_language, image_cid, attributes, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const deckValues = [
        userAddress,
        deckSlug,
        formData.name,
        formData.description,
        'text', // Default content type
        'text', // Default content type
        formData.frontLanguage,
        formData.backLanguage,
        null, // No deck-level image for now
        JSON.stringify({ inputMode: formData.inputMode }), // Store metadata
        timestamp,
        timestamp
      ];

      console.log("Inserting deck...");
      const deckResult = await db.prepare(deckInsertSql).bind(...deckValues).run();
      await deckResult.meta.txn?.wait();
      
      // Get the deck row ID from the transaction
      const deckRowId = deckResult.meta.txn?.names?.[0]; // This might need adjustment based on actual Tableland response

      // Insert flashcards
      console.log("Inserting flashcards...");
      for (const card of flashcardsWithCids) {
        if (!card.front_text.trim() || !card.back_text.trim()) {
          continue; // Skip empty cards
        }

        const flashcardInsertSql = `
          INSERT INTO ${STAGING_FLASHCARD_TABLE}
          (deck_row_id, front_text, front_image_cid, front_audio_cid, front_phonetic_guide, back_text, back_image_cid, back_audio_cid, back_phonetic_guide, notes, attributes, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const flashcardValues = [
          deckRowId || 1, // Use actual deck ID once we figure out how to get it
          card.front_text,
          card.front_image_cid || null,
          card.front_audio_cid || null,
          card.front_phonetic_guide || null,
          card.back_text,
          card.back_image_cid || null,
          card.back_audio_cid || null,
          card.back_phonetic_guide || null,
          card.notes || null,
          JSON.stringify({ originalId: card.id }),
          timestamp,
          timestamp
        ];

        const flashcardResult = await db.prepare(flashcardInsertSql).bind(...flashcardValues).run();
        await flashcardResult.meta.txn?.wait();
      }

      console.log("✅ Deck and flashcards submitted successfully!");
      
    } catch (error) {
      console.error("Error submitting to Tableland:", error);
      throw new Error("Failed to submit deck to Tableland");
    }
  }

  async submitDeck(formData: SubmitDeckFormData): Promise<void> {
    console.log("🚀 Starting deck submission...");
    
    // Validate wallet connection
    if (!authService.isConnected()) {
      throw new Error("Please connect your wallet first");
    }

    let flashcardsToSubmit: Flashcard[] = [];

    if (formData.inputMode === 'csv') {
      // TODO: Parse CSV file and convert to flashcards
      throw new Error("CSV import not yet implemented");
    } else {
      // Use manual flashcards
      flashcardsToSubmit = formData.flashcards.filter(card => 
        card.front_text.trim() && card.back_text.trim()
      );
    }

    if (flashcardsToSubmit.length < 5) {
      throw new Error("Minimum 5 complete flashcards required");
    }

    // Step 1: Upload media files to Irys
    console.log("📤 Uploading media files to Irys...");
    const flashcardsWithCids = await this.uploadMediaFiles(flashcardsToSubmit);

    // Step 2: Submit to Tableland
    console.log("💾 Submitting deck to Tableland...");
    await this.submitDeckToTableland(formData, flashcardsWithCids);

    console.log("✅ Submission complete!");
  }
}

export const submissionService = new SubmissionService(); 
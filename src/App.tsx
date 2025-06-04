import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/layout/Hero";
import { DecksPage, Deck } from "@/components/pages/DecksPage";
import { SubmitDeckPage, SubmitDeckFormData } from "@/components/pages/SubmitDeckPage";
import { PrivacyPolicyPage } from "@/components/pages/PrivacyPolicyPage";
import { useState, useEffect, useCallback } from "react";
import { authService, AuthResult } from "@/services/AuthService";
import { fetchAllDecks, fetchDeckBySlug, fetchCardsForDeck } from "@/services/TablelandService";
import { DeckDetailPage, Flashcard } from "@/components/pages/DeckDetailsPage";
import { Routes, Route, useParams } from 'react-router-dom';
import { Spinner } from '@/components/ui/Spinner';
import { submissionService } from "@/services/SubmissionService";
import { LocaleProvider, useLocale } from "@/contexts/LocaleContext";

// Component to handle deck submission
const AddDeckPageWrapper = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: SubmitDeckFormData) => {
    setIsSubmitting(true);
    try {
      console.log('🚀 Starting deck submission...');
      await submissionService.submitDeck(data);
      alert(`✅ Deck "${data.name}" submitted to testnet for review!`);
    } catch (error) {
      console.error('Error submitting deck:', error);
      alert(`❌ Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <SubmitDeckPage onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
};

const DeckDetailsDataLoader = () => {
  const { deckSlug } = useParams<{ deckSlug: string }>();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDeckData = async () => {
      if (!deckSlug) {
        setError("Deck slug is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      console.log(`[DeckDetailsDataLoader] Fetching data for slug: ${deckSlug}`);
      try {
        // TODO: Implement fetchDeckBySlug in TablelandService
        const fetchedDeck = await fetchDeckBySlug(deckSlug); 
        if (!fetchedDeck) {
            throw new Error(`Deck with slug '${deckSlug}' not found.`);
        }
        console.log(`[DeckDetailsDataLoader] Fetched deck:`, fetchedDeck);
        setDeck(fetchedDeck);

        // Use the deck's row_id to fetch flashcards
        const fetchedCards = await fetchCardsForDeck(fetchedDeck.row_id); 
        console.log(`[DeckDetailsDataLoader] Fetched cards:`, fetchedCards);
        setFlashcards(fetchedCards);

      } catch (err: any) {
        console.error("[DeckDetailsDataLoader] Error fetching deck data:", err);
        setError(err.message || "Could not load deck details.");
        setDeck(null);
        setFlashcards([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDeckData();
  }, [deckSlug]);

  if (isLoading) {
    return <div className="flex justify-center items-center py-10"><Spinner /></div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!deck) {
    // This case might be redundant if error handles 'not found', but good for safety
    return <div>Deck not found.</div>; 
  }

  // Render the actual page component with fetched data
  return <DeckDetailPage deck={deck} flashcards={flashcards} />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoadingDecks, setIsLoadingDecks] = useState<boolean>(false);
  const [deckError, setDeckError] = useState<string | null>(null);

  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    console.log("[App] Initializing AuthService...");
    authService.initialize().then(() => {
        console.log("[App] AuthService initialized.");
        setIsAuthenticated(authService.isConnected());
        setAddress(authService.getUserAddress());
        setIsInitializing(false);
        setIsLoadingAuth(false);
      }).catch(err => {
        console.error("[App] AuthService initialization failed:", err);
        setAuthError("Failed to initialize authentication.");
        setIsInitializing(false);
        setIsLoadingAuth(false);
      });
  }, []);

  useEffect(() => {
    const loadDecks = async () => {
        console.log("[App] Fetching decks...");
        setIsLoadingDecks(true);
        setDeckError(null);
        try {
            const fetchedDecks = await fetchAllDecks();
            setDecks(fetchedDecks);
        } catch (error: any) {
            console.error("[App] Failed to fetch decks:", error);
            setDeckError(error.message || "Could not load decks.");
            setDecks([]);
        } finally {
            setIsLoadingDecks(false);
        }
    };

    loadDecks();
  }, []);

  const handleConnect = useCallback(async () => {
    // Double-check initialization status
    if (!authService.isInitialized()) {
        console.warn("[App] Connect called before AuthService initialized.");
        setAuthError("Auth service not ready, please wait.");
        
        // Wait for initialization to complete, then retry
        try {
          console.log("[App] Waiting for AuthService to initialize...");
          await authService.initialize();
          console.log("[App] AuthService now ready, retrying connection...");
        } catch (initError) {
          console.error("[App] Failed to initialize AuthService:", initError);
          setAuthError("Failed to initialize authentication service.");
          return;
        }
    }
    
    setIsLoadingAuth(true);
    setAuthError(null);
    console.log("[App] Calling authService.connectWithSelector...");
    
    try {
      const result: AuthResult = await authService.connectWithSelector();
      console.log(`[App] connectWithSelector result:`, result);
      
      if (result.success) {
          setIsAuthenticated(true);
          setAddress(result.address || null);
          setAuthError(null);
      } else {
          setIsAuthenticated(false);
          setAddress(null);
          setAuthError(result.error || "Connection failed.");
      }
    } catch (error) {
      console.error("[App] Unexpected error during connection:", error);
      setAuthError(error instanceof Error ? error.message : "Unexpected connection error");
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    console.log("[App] Calling authService.disconnect...");
    authService.disconnect();
    setIsAuthenticated(false);
    setAddress(null);
    setAuthError(null);
  }, []);

  const handleLocaleChange = (locale: string) => {
    console.log("Locale changed:", locale);
    setCurrentLocale(locale);
  };

  if (isInitializing) {
     return <div className="flex justify-center items-center min-h-screen"><Spinner /></div>;
  }

  const HomePage = () => {
    const { t } = useLocale();

    return (
      <>
        <Hero />
        <section className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.scarlettSupercoach}</h2>
          <p className="text-xl md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.spacedRepetitionDescription}
          </p>
        </section>

        <section className="flex flex-col gap-12 md:gap-16 mb-12 md:mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{t.addFlashcardsToStudy}</h3>
                    <p className="text-muted-foreground mb-4 text-xl">
                        {t.addFlashcardsDescription}
                    </p>
                    <Button variant="outline">{t.viewDecks}</Button>
                </div>
                <div className="flex-1 w-full md:w-auto">
                    <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <div className="flex-1 w-full md:w-auto md:order-first">
                    <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{t.learnPassivelyAcrossWeb}</h3>
                    <p className="text-muted-foreground text-xl">
                      {t.learnPassivelyDescription}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{t.translateFasterLocally}</h3>
                    <p className="text-muted-foreground text-xl">
                      {t.translateFasterDescription}
                    </p>
                  </div>
                  <div className="flex-1 w-full md:w-auto">
                    <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                   <div className="flex-1 w-full md:w-auto md:order-first">
                    <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{t.quizYourselfDaily}</h3>
                    <p className="text-muted-foreground text-xl">
                      {t.quizYourselfDescription}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{t.embedEveryWebpage}</h3>
                    <p className="text-muted-foreground text-xl">
                      {t.embedEveryWebpageDescription}
                    </p>
                  </div>
                  <div className="flex-1 w-full md:w-auto">
                    <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                   <div className="flex-1 w-full md:w-auto md:order-first">
                    <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{t.blockSitesInFocusMode}</h3>
                    <p className="text-muted-foreground text-xl">
                      {t.blockSitesDescription}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{t.getVoiceAudioWithTimestamps}</h3>
                    <p className="text-muted-foreground text-xl">
                      {t.getVoiceAudioDescription}
                    </p>
                    <p className="text-muted-foreground text-xl mt-5">
                      {t.getVoiceAudioSupport}
                    </p>
                  </div>
                  <div className="flex-1 w-full md:w-auto">
                    <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                   <div className="flex-1 w-full md:w-auto md:order-first">
                    <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{t.evadeCensorship}</h3>
                    <p className="text-muted-foreground text-xl">
                      {t.evadeCensorshipDescription}
                    </p>
                  </div>
                </div>
            </section>

            <section className="text-center py-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.downloadForFree}</h2>
                <p className="text-xl text-muted-foreground mb-8">
                    {t.installScarlettExtension}
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="h-11 px-8 text-xl">{t.chromeBrowser}</Button>
                    <Button size="lg" className="h-11 px-8 text-xl">{t.firefoxBrowser}</Button>
                </div>
            </section>
        </>
    );
  };

  return (
    <LocaleProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {authError && (
          <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
            Auth Error: {authError}
          </div>
        )}
        {isLoadingAuth && !isInitializing && (
           <div className="fixed top-4 right-4 bg-secondary text-secondary-foreground p-2 rounded shadow-lg z-50">
             <Spinner /> 
           </div>
        )}
        <Header 
          loggedIn={isAuthenticated}
          address={address || ""}
          onConnect={isInitializing ? undefined : handleConnect}
          onDisconnect={handleDisconnect}
          currentLocale={currentLocale}
          onLocaleChange={handleLocaleChange}
        />
        <div className="container mx-auto px-4 max-w-6xl">
          <main className="flex-grow py-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              <Route 
                path="/decks"
                element={
                  <div>
                      {deckError && (
                          <div style={{ color: 'orange', marginBottom: '10px' }}>Deck Error: {deckError}</div>
                      )}
                      {isLoadingDecks ? (
                          <div className="flex justify-center items-center py-10"><Spinner /></div>
                      ) : (
                          <DecksPage decks={decks} /> 
                      )}
                  </div>
                }
              />

              <Route 
                  path="/decks/:deckSlug"
                  element={<DeckDetailsDataLoader />}
              />

              <Route path="/add" element={<AddDeckPageWrapper />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </LocaleProvider>
  );
}

export default App;

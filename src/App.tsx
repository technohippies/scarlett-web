import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/layout/Hero";
import { DecksPanel } from "@/components/layout/DecksPanel";
import React, { useState, useEffect, useCallback } from "react";
import { authService, AuthResult } from "@/services/AuthService";

const sampleDecks = [
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
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const [currentLocale, setCurrentLocale] = useState('en');
  
  useEffect(() => {
    console.log("[App] Initializing AuthService...");
    authService.initialize().then(() => {
        console.log("[App] AuthService initialized.");
        setIsAuthenticated(authService.isConnected());
        setAddress(authService.getUserAddress());
        setIsInitializing(false);
        setIsLoading(false);
      }).catch(err => {
        console.error("[App] AuthService initialization failed:", err);
        setAuthError("Failed to initialize authentication.");
        setIsInitializing(false);
        setIsLoading(false);
      });
  }, []);

  const handleConnect = useCallback(async () => {
    if (!authService.isInitialized()) {
        console.warn("[App] Connect called before AuthService initialized.");
        setAuthError("Auth service not ready, please wait.");
        return;
    }
    setIsLoading(true);
    setAuthError(null);
    console.log("[App] Calling authService.connectWithSelector...");
    const result: AuthResult = await authService.connectWithSelector();
    console.log(`[App] connectWithSelector result:`, result);
    if (result.success) {
        setIsAuthenticated(true);
        setAddress(result.address || null);
    } else {
        setIsAuthenticated(false);
        setAddress(null);
        setAuthError(result.error || "Connection failed.");
    }
    setIsLoading(false);
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
     return <div style={{ padding: '20px', textAlign: 'center' }}>Initializing Authentication...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {authError && (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
          Auth Error: {authError}
        </div>
      )}
      {isLoading && !isInitializing && (
         <div style={{ backgroundColor: 'blue', color: 'white', padding: '5px', textAlign: 'center', fontSize: '0.8em' }}>
           Connecting...
         </div>
      )}
      <Header 
        loggedIn={isAuthenticated}
        address={address || ""}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleChange}
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <main className="flex-grow py-12">
          <Hero /> 
          <DecksPanel decks={sampleDecks} />

          <section className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Scarlett is your supercoach</h2>
            <p className="text-xl md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Spaced repetition, roleplaying, productivity, and more.
            </p>
          </section>

          <section className="flex flex-col gap-12 md:gap-16 mb-12 md:mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Add flashcards to study</h3>
                <p className="text-muted-foreground mb-4 text-xl">
                  Add decks of flashcards from other users, or make your own.
                </p>
                <Button variant="outline">View Decks</Button>
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
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Learn passively across the web</h3>
                <p className="text-muted-foreground text-xl">
                  Scarlett replaces the words you're learning on the webpages you visit.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Translate with ease, locally</h3>
                <p className="text-muted-foreground text-xl">
                  Right click to translate any text, which then adds it to your flashcard deck automatically.
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
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Quiz yourself daily</h3>
                <p className="text-muted-foreground text-xl">
                  To study your flashcards, Scarlett generates quiz questions like multiple choice to test your knowledge.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Evade censorship</h3>
                <p className="text-muted-foreground text-xl">
                  Can't access YouTube, Reddit, or Twitch? Scarlett automatically redirects you to privacy preserving frontends that you can access even without a VPN.
                </p>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                </div>
              </div>
            </div>
          </section>

          <section className="text-center py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download for Free</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Install the Scarlett browser extension
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="h-11 px-8 text-xl">Chrome</Button>
              <Button size="lg" className="h-11 px-8 text-xl">Firefox</Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

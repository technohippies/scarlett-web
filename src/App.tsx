import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/layout/Hero";

function App() {
  // Basic state/handlers for Header props (optional, can be expanded)
  const handleConnect = () => console.log("Connect clicked");
  const handleLocaleChange = (locale: string) => console.log("Locale changed:", locale);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header is no longer wrapped in container */}
      <Header 
        loggedIn={false} // Example: Set based on actual auth state
        onConnect={handleConnect}
        currentLocale="en" // Example: Set based on actual locale state
        onLocaleChange={handleLocaleChange}
      />
      {/* Main content wrapper with container/max-width */}
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Removed container classes from main itself */}
        <main className="flex-grow py-12">
          <Hero /> 

          {/* Supercoach Section (Reduced margin) */}
          <section className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Scarlett is your supercoach</h2>
            <p className="text-xl md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Spaced repetition, roleplaying, productivity, and more.
            </p>
          </section>

          {/* Features Stack (Reduced gap and margin) */}
          <section className="flex flex-col gap-12 md:gap-16 mb-12 md:mb-16">
            {/* Feature 1: Text Left, Image Right */}
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
                  {/* <img src="/placeholder.png" alt="Feature placeholder 1" className="w-full h-full object-cover rounded-lg"/> */}
                </div>
              </div>
            </div>

            {/* Feature 2: Image Left, Text Right */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <div className="flex-1 w-full md:w-auto md:order-first"> {/* Use order-first */} 
                <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                  {/* <img src="/placeholder.png" alt="Feature placeholder 2" className="w-full h-full object-cover rounded-lg"/> */}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Learn passively across the web</h3>
                <p className="text-muted-foreground text-xl">
                  Scarlett replaces the words you're learning on the webpages you visit.
                </p>
              </div>
            </div>

            {/* Feature 3: Text Left, Image Right */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Translate with ease, locally</h3>
                <p className="text-muted-foreground text-xl">
                  Right click to translate any text, which then adds it to your flashcard deck automatically.
                </p>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                  {/* <img src="/placeholder.png" alt="Feature placeholder 3" className="w-full h-full object-cover rounded-lg"/> */}
                </div>
              </div>
            </div>

            {/* Feature 4: Image Left, Text Right */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
               <div className="flex-1 w-full md:w-auto md:order-first"> {/* Use order-first */} 
                <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                  {/* <img src="/placeholder.png" alt="Feature placeholder 4" className="w-full h-full object-cover rounded-lg"/> */}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Quiz yourself daily</h3>
                <p className="text-muted-foreground text-xl">
                  To study your flashcards, Scarlett generates quiz questions like multiple choice to test your knowledge.
                </p>
              </div>
            </div>
            
            {/* Feature 5: Text Left, Image Right */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">Evade censorship</h3>
                <p className="text-muted-foreground text-xl">
                  Can't access YouTube, Reddit, or Twitch? Scarlett automatically redirects you to privacy preserving frontends that you can access even without a VPN.
                </p>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="bg-neutral-700 aspect-square rounded-lg w-full max-w-md mx-auto md:mx-0">
                  {/* <img src="/placeholder.png" alt="Feature placeholder 5" className="w-full h-full object-cover rounded-lg"/> */}
                </div>
              </div>
            </div>
          </section>

          {/* Download Section (Removed border-t, adjusted padding) */}
          <section className="text-center py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download for Free</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Install the Scarlett browser extension
            </p>
            <div className="flex justify-center gap-4">
              {/* Apply Hero button styling */}
              <Button size="lg" className="h-11 px-8 text-xl">Chrome</Button>
              <Button size="lg" className="h-11 px-8 text-xl">Firefox</Button>
            </div>
          </section>
        </main>
      </div> {/* End of main content wrapper */}

      {/* Optional Footer */}
      {/* <footer className="text-center py-4 border-t border-border text-sm text-muted-foreground">
        © 2024 Scarlett AI. All rights reserved.
      </footer> */}
    </div>
  );
}

export default App;

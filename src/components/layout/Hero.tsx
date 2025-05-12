import * as React from "react"
import { Button } from "@/components/ui/button"

export const Hero: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-start gap-8 py-16">
      <div className="max-w-3xl flex flex-col items-start gap-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Cobrowse with Scarlett AI extension
        </h1>
        <p className="text-xl md:text-xl text-muted-foreground">
          Language tutor, pirate, lifecoach. Free and open source.
        </p>
        <div className="flex gap-4 mt-4">
          <Button size="lg" className="h-11 px-8 text-xl">
            Chrome
          </Button>
          <Button size="lg" className="h-11 px-8 text-xl">
            Firefox
          </Button>
        </div>
      </div>
      <div className="w-full mt-6">
        <div className="bg-neutral-700 aspect-video rounded-lg">
          {/* <img src="/placeholder.png" alt="Scarlett AI demo placeholder" className="w-full h-full object-cover rounded-lg"/> */}
        </div>
      </div>
    </section>
  )
}

export default Hero
import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { InteractiveQuotes } from "@/components/InteractiveQuotes";
import { MiniGames } from "@/components/MiniGames";
import { ThoughtPlayground } from "@/components/ThoughtPlayground";
import { MoodCard } from "@/components/MoodCard";
import { ThoughtsWall } from "@/components/ThoughtsWall";
import { RitualsSection } from "@/components/RitualsSection";
import { FooterCta } from "@/components/FooterCta";
import { ScreenLoader } from "@/components/ScreenLoader";
import cardWaves from "@/assets/card-waves.svg";
import cardDrift from "@/assets/card-drift.svg";
import cardVibe from "@/assets/card-vibe.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A mental playground" },
      {
        name: "description",
        content:
          "An interactive digital playground: 500+ quotes, word games, and a thought sandbox for corporate minds on a break.",
      },
      { property: "og:title", content: "A mental playground" },
      {
        property: "og:description",
        content: "Read, play, drift. Cinematic interactive escape for the in-between hours.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <ScreenLoader />
      <CustomCursor />

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="animate-orb absolute -left-[10%] -top-[10%] h-[55vw] w-[55vw] rounded-full"
          style={{ background: "var(--gradient-orb-accent)", filter: "blur(100px)" }}
        />
        <div
          className="animate-orb-alt absolute -bottom-[10%] -right-[10%] h-[45vw] w-[45vw] rounded-full"
          style={{ background: "var(--gradient-orb-cool)", filter: "blur(100px)" }}
        />
      </div>

      <div className="relative z-10">
        <Navigation />
        <section id="observatory"><Hero /></section>

        <InteractiveQuotes />

        <MiniGames />

        <ThoughtPlayground />

        <section id="states" className="px-6 pb-32">
          <div className="mx-auto mb-16 max-w-7xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              States / 07
            </span>
            <h2 className="mt-4 max-w-[20ch] text-4xl font-medium tracking-tight md:text-6xl">
              Choose a frequency. Drift into it.
            </h2>
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
            <MoodCard index="01" total="03" title="Deep Submergence" description="A heavy-frequency drift for grounding the restless mind." image={cardWaves} delay={0} />
            <MoodCard index="02" total="03" title="Weightless Drift" description="Floating through the liminal space between tasks." image={cardDrift} delay={0.15} />
            <MoodCard index="03" total="03" title="Orbital Echo" description="Rhythmic pulses designed for deep focus states." image={cardVibe} delay={0.3} />
          </div>
        </section>

        <div id="thoughts"><ThoughtsWall /></div>
        <div id="rituals"><RitualsSection /></div>

        <FooterCta />
      </div>
    </main>
  );
}

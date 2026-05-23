import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import cardDrift from "@/assets/card-drift.svg";
import cardOcean from "@/assets/card-ocean.jpg";
import cardOrbs from "@/assets/card-orbs.jpg";
import cardSmoke from "@/assets/card-smoke.jpg";
import cardVibe from "@/assets/card-vibe.svg";
import cardWaves from "@/assets/card-waves.svg";

const BACKGROUNDS = [cardDrift, cardOcean, cardOrbs, cardSmoke, cardVibe, cardWaves];
const UPCOMING_GAMES = [
  "Word Catch",
  "Quote Puzzle",
  "Typing Flow",
  "Color Match",
  "Breath Pacer",
  "Memory Tiles",
  "Pattern Builder",
  "Quote Match",
  "Calm Maze",
  "Zen Garden",
  "Star Sequence",
  "Sound Spheres",
  "Drift Tiles",
  "Mirror Flow",
  "Cloud Weave",
  "Quiet Bloom",
  "Moonlight Loop",
  "Aura Align",
  "Soft Orbit",
  "Still Wave",
];

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Space Games — Coming Soon" },
      {
        name: "description",
        content: "This peaceful games room is coming soon. Refresh to reveal a new preview mood.",
      },
    ],
  }),
  component: Games,
});

function Games() {
  const [heroImage, previewImage, accentImage] = useMemo(() => {
    const shuffled = [...BACKGROUNDS].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1], shuffled[2]];
  }, []);

  const previewCards = useMemo(() => {
    return UPCOMING_GAMES.slice(0, 15).sort(() => Math.random() - 0.5);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0c0b13] text-white">
      <section className="relative min-h-[85vh] overflow-hidden px-6 py-10 sm:px-12 lg:px-20">
        <div className="pointer-events-none absolute inset-0 opacity-30 grayscale filter">
          <img src={heroImage} alt="Preview background" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[#07070f]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/80 backdrop-blur-sm">
            Space Games / Coming soon
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
                A quieter games world is almost ready.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                We’re shaping a gentle space of peaceful micro-games — playful, restorative, and designed for calm focus.
                Every refresh reveals a new preview mood as this page prepares to open.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm uppercase tracking-[0.28em] text-white transition hover:border-accent hover:text-accent"
                >
                  Back to lobby
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-accent/30 bg-accent/10 px-6 py-3 text-sm uppercase tracking-[0.28em] text-accent transition hover:bg-accent/20"
                >
                  Stay tuned
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_35px_120px_-40px_rgba(255,255,255,0.35)] backdrop-blur-xl">
              <div className="absolute inset-0 opacity-30">
                <img src={previewImage} alt="Preview panel" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/70">Preview mood</span>
                <h2 className="text-3xl font-semibold tracking-tight text-white">Soft horizons, warm focus.</h2>
                <p className="text-sm leading-6 text-white/70">
                  A rotating image mood board gives a fresh view each visit while the Space Games room is getting ready.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/40 p-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/60">Featured concept</span>
                    <p className="mt-3 text-lg font-medium text-white">Drift Tiles</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/40 p-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/60">Next up</span>
                    <p className="mt-3 text-lg font-medium text-white">Zen Garden</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-12 lg:px-20">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <span className="text-[10px] uppercase tracking-[0.35em] text-accent">More to come</span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">20 calm game ideas in progress</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Each experience is being crafted with soft motion, slow interactions, and a thoughtful atmosphere.
              When this space opens, you’ll find a quiet place to play without pressure.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {previewCards.slice(0, 8).map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                  <p className="font-medium text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-black/30 p-5 text-white/80">
                <span className="text-[10px] uppercase tracking-[0.35em] text-accent">What to expect</span>
                <p className="mt-4 text-lg font-semibold text-white">Low-pressure loops</p>
                <p className="mt-3 text-sm leading-7 text-white/70">Soft tasks and slow rewards built for presence, not points.</p>
              </div>
              <div className="rounded-3xl bg-black/30 p-5 text-white/80">
                <span className="text-[10px] uppercase tracking-[0.35em] text-accent">Mood-driven visuals</span>
                <p className="mt-4 text-lg font-semibold text-white">Ever-changing imagery</p>
                <p className="mt-3 text-sm leading-7 text-white/70">A new visual preview each visit keeps the space feeling dynamic.</p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10">
              <img src={accentImage} alt="Preview accent" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useState, useMemo } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

const allPoems = [
  {
    title: "Stopping by Woods",
    author: "Robert Frost",
    lines: [
      "Whose woods these are I think I know.",
      "His house is in the village though;",
      "He will not see me stopping here",
      "To watch his woods fill up with snow.",
    ],
  },
  {
    title: "Shall I Compare Thee",
    author: "William Shakespeare",
    lines: [
      "Shall I compare thee to a summer's day?",
      "Thou art more lovely and more temperate:",
      "Rough winds do shake the darling buds of May,",
      "And summer's lease hath all too short a date.",
    ],
  },
  {
    title: "Hope",
    author: "Emily Dickinson",
    lines: [
      "Hope is the thing with feathers",
      "That perches in the soul,",
      "And sings the tune without the words,",
      "And never stops at all.",
    ],
  },
  {
    title: "Ozymandias",
    author: "Percy Bysshe Shelley",
    lines: [
      "I met a traveller from an antique land,",
      "Who said—“Two vast and trunkless legs of stone",
      "Stand in the desert. . . . Near them, on the sand,",
      "Half sunk a shattered visage lies, whose frown",
    ],
  },
  {
    title: "The Road Not Taken",
    author: "Robert Frost",
    lines: [
      "Two roads diverged in a yellow wood,",
      "And sorry I could not travel both",
      "And be one traveler, long I stood",
      "And looked down one as far as I could",
    ],
  },
  {
    title: "Kubla Khan",
    author: "Samuel Taylor Coleridge",
    lines: [
      "In Xanadu did Kubla Khan",
      "A stately pleasure-dome decree:",
      "Where Alph, the sacred river, ran",
      "Through caverns measureless to man",
    ],
  },
  {
    title: "When You Are Old",
    author: "William Butler Yeats",
    lines: [
      "When you are old and grey and full of sleep,",
      "And nodding by the fire, take down this book,",
      "And slowly read, and dream of the soft look",
      "Your eyes had once, and of their shadows deep;",
    ],
  },
  {
    title: "The Charge of the Light Brigade",
    author: "Alfred Lord Tennyson",
    lines: [
      "Half a league, half a league,",
      "Half a league onward,",
      "All in the valley of Death",
      "Rode the six hundred.",
    ],
  },
  {
    title: "Dover Beach",
    author: "Matthew Arnold",
    lines: [
      "The sea is calm tonight.",
      "The tide is full, the moon lies fair",
      "Upon the straits; on the French coast the light",
      "Gleams and is gone; the cliffs of England stand,",
    ],
  },
  {
    title: "Invictus",
    author: "William Ernest Henley",
    lines: [
      "Out of the night that covers me,",
      "Black as the pit from pole to pole,",
      "I thank whatever gods may be",
      "For my unconquerable soul.",
    ],
  },
  {
    title: "Sonnet 130",
    author: "William Shakespeare",
    lines: [
      "My mistress' eyes are nothing like the sun;",
      "Coral is far more red, than her lips red:",
      "If snow be white, why then her breasts are dun;",
      "If hairs be wires, black wires grow on her head.",
    ],
  },
  {
    title: "A Red, Red Rose",
    author: "Robert Burns",
    lines: [
      "O my Luve's like a red, red rose",
      "That’s newly sprung in June;",
      "O my Luve's like the melodie",
      "That’s sweetly played in tune.",
    ],
  },
];

function getRandomPoem(exclude?: string) {
  let poem = allPoems[Math.floor(Math.random() * allPoems.length)];
  while (exclude && poem.title === exclude) {
    poem = allPoems[Math.floor(Math.random() * allPoems.length)];
  }
  return poem;
}

function RitualsPage() {
  const [candleLit, setCandleLit] = useState(false);
  const [currentPoem, setCurrentPoem] = useState<(typeof allPoems)[0] | null>(null);

  const displayPoem = useMemo(() => {
    if (candleLit && !currentPoem) {
      return getRandomPoem();
    }
    return currentPoem;
  }, [candleLit, currentPoem]);

  const handleRevealMore = () => {
    setCurrentPoem(getRandomPoem(displayPoem?.title));
  };

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,210,120,0.2),_transparent_30%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-12 flex w-full items-center justify-between">
          <Link
            to="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
          >
            Back
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Candlelight Ritual
          </span>
        </div>

        <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_0_120px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <div className="mx-auto mb-10 flex h-72 w-72 flex-col items-center justify-end rounded-[2rem] bg-[#08090d] p-6 shadow-[0_0_80px_rgba(255,140,40,0.12)]">
              <div className="relative flex h-full w-full items-end justify-center">
                <div className="absolute inset-x-1/2 -top-12 h-24 w-24 -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl" />
                <div className="flex h-full flex-col items-center justify-end">
                  <div className="mb-6 flex h-36 w-16 items-end justify-center rounded-3xl bg-[#f4e4c8] shadow-inner">
                    <div
                      className={`h-14 w-14 rounded-full bg-orange-300 transition-all duration-500 ${
                        candleLit ? "opacity-100 shadow-[0_0_24px_rgba(255,184,94,0.75)]" : "opacity-0"
                      }`}
                    />
                  </div>
                  <div className="h-20 w-8 rounded-full bg-white/80 shadow-lg" />
                </div>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <p className="text-sm text-muted-foreground">
                Light the candle and let the room glow with quiet reflection. Once the flame is alive, the poetry will reveal itself.
              </p>
              <button
                type="button"
                onClick={() => setCandleLit(true)}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-[0.3em] text-black transition hover:bg-accent-foreground"
              >
                {candleLit ? "Candle Lit" : "Light the Candle"}
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_0_120px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            {candleLit ? (
              <div className="space-y-8">
                <h1 className="text-4xl font-semibold tracking-tight">Candlelight Poetry</h1>
                <p className="text-sm text-muted-foreground">
                  Classic verses to breathe slowly with the flame — a quiet ritual for the mind.
                </p>
                {displayPoem && (
                  <div className="space-y-6">
                    <article className="rounded-3xl border border-white/10 bg-black/40 p-6">
                      <h2 className="text-xl font-medium">{displayPoem.title}</h2>
                      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-accent opacity-80">
                        {displayPoem.author}
                      </p>
                      <div className="mt-4 space-y-2 text-left text-sm leading-7 text-white/90">
                        {displayPoem.lines.map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                    </article>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleRevealMore}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-[0.3em] text-black transition hover:bg-accent-foreground"
                >
                  Reveal more poetry
                </button>
              </div>
            ) : (
              <div className="space-y-6 py-24">
                <h1 className="text-4xl font-semibold tracking-tight">A quiet room, a waiting flame.</h1>
                <p className="text-sm text-muted-foreground">
                  Press the candle button and the poetry will appear in soft candlelight. This is your blank page ritual.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/rituals")({
  head: () => ({
    meta: [
      { title: "Ritual Candle — Poetry by candlelight" },
      { name: "description", content: "Light the candle and read classic historical poetry in a calm candlelit page." },
    ],
  }),
  component: RitualsPage,
});

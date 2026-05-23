import { useState } from "react";
import { motion } from "framer-motion";

const SEED_WORDS = [
  "calm",
  "breathe",
  "flow",
  "drift",
  "still",
  "soft",
  "warm",
  "quiet",
  "open",
  "slow",
  "light",
  "ease",
  "space",
  "echo",
  "bloom",
  "rest",
  "float",
  "release",
  "now",
  "here",
];

interface FloatingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

let _id = 0;

export function ThoughtPlayground() {
  const [words, setWords] = useState<FloatingWord[]>(() =>
    SEED_WORDS.map((w, i) => ({
      id: _id++,
      text: w,
      x: (i % 5) * 18 - 36,
      y: Math.floor(i / 5) * 14 - 28,
      scale: 0.8 + Math.random() * 0.6,
      rotate: (Math.random() - 0.5) * 14,
    })),
  );
  const [input, setInput] = useState("");

  const addWord = (text: string) => {
    if (!text.trim()) return;
    setWords((w) => [
      ...w,
      {
        id: _id++,
        text: text.trim(),
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 40,
        scale: 1 + Math.random() * 0.5,
        rotate: (Math.random() - 0.5) * 14,
      },
    ]);
    setInput("");
  };

  const explode = (id: number) => {
    setWords((w) => w.filter((x) => x.id !== id));
  };

  return (
    <section id="playground" className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Playground / 05
            </span>
            <h2 className="mt-4 max-w-[20ch] text-4xl font-medium tracking-tight md:text-6xl">
              Throw words. Drag thoughts. Let them float.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Drag any word with gentle inertia. Click to dissolve. Type to add.
          </p>
        </div>

        <div className="relative h-[520px] overflow-hidden rounded-[2.5rem] border border-border bg-glass backdrop-blur-3xl">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-accent/15 blur-[80px]" />
            <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-blue-400/10 blur-[90px]" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-full w-full">
              {words.map((w) => (
                <motion.button
                  key={w.id}
                  data-cursor-hover
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: w.scale,
                    x: w.x * 4,
                    y: w.y * 4,
                    rotate: w.rotate,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 18,
                  }}
                  drag
                  dragElastic={0.7}
                  dragTransition={{ bounceStiffness: 120, bounceDamping: 14 }}
                  whileHover={{ scale: w.scale * 1.15, color: "var(--accent)" }}
                  whileTap={{ scale: w.scale * 0.85 }}
                  onClick={() => explode(w.id)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none rounded-full border border-border bg-background/40 px-5 py-2 text-lg font-medium backdrop-blur-md active:cursor-grabbing"
                  style={{ textShadow: "0 0 30px rgba(250,200,80,0.15)" }}
                >
                  {w.text}
                </motion.button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addWord(input);
            }}
            className="absolute bottom-6 left-1/2 z-10 flex w-[90%] max-w-md -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/60 p-2 backdrop-blur-xl"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type a word, then enter…"
              className="flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
            />
            <button
              data-cursor-hover
              type="submit"
              className="rounded-full bg-accent px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-foreground transition-transform hover:scale-105"
            >
              Release
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

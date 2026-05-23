import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WordCatch } from "./games/WordCatch";
import { QuotePuzzle } from "./games/QuotePuzzle";
import { TypingFlow } from "./games/TypingFlow";
import { ColorMatch } from "./games/ColorMatch";
import { BreathPacer } from "./games/BreathPacer";
import { MemoryTiles } from "./games/MemoryTiles";
import { PatternBuilder } from "./games/PatternBuilder";
import { QuoteMatch } from "./games/QuoteMatch";

const GAMES = [
  { id: "catch", label: "Word Catch", hint: "Hover positive words. Avoid the stress." },
  { id: "puzzle", label: "Quote Puzzle", hint: "Rearrange fragments into a whole." },
  { id: "type", label: "Typing Flow", hint: "Breathe between keystrokes." },
  { id: "color", label: "Color Match", hint: "Find pairs of matching colors." },
  { id: "breath", label: "Breath Pacer", hint: "Sync breathing with the animation." },
  { id: "memory", label: "Memory Tiles", hint: "Find pairs of calming words." },
  { id: "pattern", label: "Pattern Builder", hint: "Repeat the visual sequence." },
  { id: "quote", label: "Quote Match", hint: "Pair quotes with their authors." },
] as const;

type GameId = (typeof GAMES)[number]["id"];

interface MiniGamesProps {
  initialGame?: GameId;
}

export function MiniGames({ initialGame }: MiniGamesProps) {
  const [game, setGame] = useState<GameId>(initialGame ?? "catch");

  useEffect(() => {
    if (initialGame && initialGame !== game) {
      setGame(initialGame);
    }
  }, [initialGame, game]);

  return (
    <section id="games" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Playroom / 06
            </span>
            <h2 className="mt-4 max-w-[18ch] text-4xl font-medium tracking-tight md:text-6xl">
              Tiny games for restless minds.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            No score to chase. No timer to beat. Just small loops to soften the day.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {GAMES.map((g) => {
            const active = g.id === game;
            return (
              <button
                key={g.id}
                data-cursor-hover
                onClick={() => setGame(g.id)}
                className={`rounded-full border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] transition-all ${
                  active
                    ? "border-accent/60 bg-accent/10 text-accent shadow-[var(--shadow-glow)]"
                    : "border-border bg-glass text-muted-foreground hover:border-accent/30 hover:text-foreground"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={game}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-sm text-muted-foreground">
              {GAMES.find((g) => g.id === game)?.hint}
            </p>
            {game === "catch" && <WordCatch active />}
            {game === "puzzle" && <QuotePuzzle />}
            {game === "type" && <TypingFlow />}
            {game === "color" && <ColorMatch />}
            {game === "breath" && <BreathPacer />}
            {game === "memory" && <MemoryTiles />}
            {game === "pattern" && <PatternBuilder />}
            {game === "quote" && <QuoteMatch />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

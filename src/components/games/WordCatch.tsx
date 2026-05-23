import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POSITIVE = [
  "calm",
  "flow",
  "ease",
  "joy",
  "rest",
  "light",
  "open",
  "bloom",
  "breathe",
  "peace",
];
const NEGATIVE = ["stress", "rush", "noise", "burnout", "deadline", "panic", "tense", "rage"];

interface Bubble {
  id: number;
  text: string;
  good: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

let _id = 0;

export function WordCatch({ active }: { active: boolean }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const spawn = setInterval(() => {
      const good = Math.random() > 0.35;
      const list = good ? POSITIVE : NEGATIVE;
      setBubbles((b) => [
        ...b.slice(-14),
        {
          id: _id++,
          text: list[Math.floor(Math.random() * list.length)],
          good,
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 10,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        },
      ]);
    }, 900);
    return () => clearInterval(spawn);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const tick = () => {
      setBubbles((b) =>
        b.map((x) => {
          const nx = x.x + x.vx;
          const ny = x.y + x.vy;
          let vx = x.vx;
          let vy = x.vy;
          if (nx < 4 || nx > 96) vx = -vx;
          if (ny < 4 || ny > 90) vy = -vy;
          return { ...x, x: nx, y: ny, vx, vy };
        }),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const hit = (b: Bubble) => {
    setBubbles((arr) => arr.filter((x) => x.id !== b.id));
    setScore((s) => s + (b.good ? 1 : -1));
  };

  return (
    <div
      ref={wrapRef}
      className="relative h-[420px] overflow-hidden rounded-3xl border border-border bg-background/40 backdrop-blur-md"
    >
      <div className="absolute left-4 top-4 z-10 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Score · <span className="text-accent">{score}</span>
      </div>
      <div className="absolute right-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Catch positive · avoid negative
      </div>

      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.button
            key={b.id}
            data-cursor-hover
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => hit(b)}
            onClick={() => hit(b)}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-1.5 text-sm backdrop-blur-md ${
              b.good
                ? "border-accent/50 bg-accent/10 text-accent shadow-[0_0_30px_rgba(250,200,80,0.25)]"
                : "border-red-400/30 bg-red-500/10 text-red-300"
            }`}
          >
            {b.text}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

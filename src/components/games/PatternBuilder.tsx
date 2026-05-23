import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const PATTERNS = [
  ["◯", "◉", "◯", "◉", "◯"],
  ["▢", "▪", "▢", "▪", "▢"],
  ["◇", "◆", "◇", "◆", "◇"],
];

export function PatternBuilder() {
  const [seed, setSeed] = useState(0);
  const [userPattern, setUserPattern] = useState<number[]>([]);

  const targetPattern = useMemo(
    () => PATTERNS[seed % PATTERNS.length],
    [seed]
  );
  const symbols = useMemo(
    () =>
      targetPattern.slice(0, Math.min(3, Math.ceil(targetPattern.length / 2))),
    [targetPattern]
  );

  const solved =
    userPattern.length === targetPattern.length &&
    userPattern.every((idx, i) => targetPattern[i] === symbols[idx]);

  const handleSymbolClick = (idx: number) => {
    if (userPattern.length >= targetPattern.length) return;

    const newPattern = [...userPattern, idx];
    setUserPattern(newPattern);

    if (
      newPattern.length === targetPattern.length &&
      newPattern.every((i, pos) => targetPattern[pos] === symbols[i])
    ) {
      setTimeout(
        () => {
          setSeed((s) => s + 1);
          setUserPattern([]);
        },
        1000
      );
    } else if (
      newPattern.some((i, pos) => targetPattern[pos] !== symbols[i])
    ) {
      setTimeout(() => setUserPattern([]), 500);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-background/40 p-8 backdrop-blur-md">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Pattern · {solved ? <span className="text-accent">complete</span> : "repeat the sequence"}
        </span>
        <button
          data-cursor-hover
          onClick={() => {
            setSeed((s) => s + 1);
            setUserPattern([]);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] hover:border-accent/60"
        >
          <RotateCcw className="h-3 w-3" />
          New pattern
        </button>
      </div>

      <div className="mb-12 space-y-6">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Target
          </p>
          <div className="flex justify-center gap-3">
            {targetPattern.map((symbol, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: userPattern.length > i ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
                className="flex h-16 w-16 items-center justify-center rounded-lg border border-accent/20 bg-black/40 text-3xl font-light text-accent"
              >
                {symbol}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Select symbols
          </p>
          <div className="flex justify-center gap-4">
            {symbols.map((symbol, i) => (
              <motion.button
                key={i}
                onClick={() => handleSymbolClick(i)}
                data-cursor-hover
                className="flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-glass text-4xl transition-all hover:border-accent/60"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {symbol}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {userPattern.length > 0 && !solved && (
        <div className="flex justify-center gap-2">
          {userPattern.map((idx, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-2xl text-accent"
            >
              {symbols[idx]}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const WORD_PAIRS = [
  ["peace", "calm"],
  ["breathe", "flow"],
  ["stillness", "quiet"],
  ["kindness", "grace"],
  ["let", "go"],
  ["be", "present"],
];

type Tile = {
  id: string;
  word: string;
  pairId: number;
};

export function MemoryTiles() {
  const [seed, setSeed] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [matched, setMatched] = useState<Set<string>>(new Set());

  useMemo(() => {
    const newTiles = WORD_PAIRS.flatMap((pair, idx) =>
      pair.map((word, i) => ({
        id: `${idx}-${i}`,
        word,
        pairId: idx,
      })),
    ).sort(() => Math.random() - 0.5);
    setTiles(newTiles);
    setFlipped(new Set());
    setMatched(new Set());
  }, [seed]);

  const handleFlip = (id: string) => {
    if (flipped.has(id) || matched.has(id)) return;

    const newFlipped = new Set(flipped);
    newFlipped.add(id);
    setFlipped(newFlipped);

    if (newFlipped.size === 2) {
      const [first, second] = Array.from(newFlipped);
      const firstPair = tiles.find((t) => t.id === first)?.pairId;
      const secondPair = tiles.find((t) => t.id === second)?.pairId;

      if (firstPair === secondPair && firstPair !== undefined) {
        setMatched((prev) => new Set([...prev, first, second]));
        setFlipped(new Set());
      } else {
        setTimeout(() => setFlipped(new Set()), 1000);
      }
    }
  };

  const solved = matched.size === tiles.length;

  return (
    <div className="rounded-3xl border border-border bg-background/40 p-8 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Memory · {solved ? <span className="text-accent">all pairs found</span> : "find matches"}
        </span>
        <button
          data-cursor-hover
          onClick={() => setSeed((s) => s + 1)}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] hover:border-accent/60"
        >
          <RotateCcw className="h-3 w-3" />
          New game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {tiles.map((tile) => {
          const isFlipped = flipped.has(tile.id) || matched.has(tile.id);
          return (
            <motion.button
              key={tile.id}
              onClick={() => handleFlip(tile.id)}
              data-cursor-hover
              className="relative h-20 rounded-lg border border-border transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotateY: isFlipped ? 0 : 180,
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
                className="h-full w-full"
              >
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-lg bg-glass backdrop-blur-md"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-sm font-mono">?</span>
                </div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center rounded-lg border border-accent/20 bg-black/40 text-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <span className="px-2 font-mono text-xs uppercase tracking-tight text-accent">
                    {tile.word}
                  </span>
                </motion.div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const COLOR_SETS = [
  { colors: ["#f6b663", "#8b5cf6", "#06b6d4", "#ec4899"] },
  { colors: ["#06b6d4", "#10b981", "#f6b663", "#6366f1"] },
  { colors: ["#8b5cf6", "#ec4899", "#06b6d4", "#f6b663"] },
];

type ColorCard = {
  id: string;
  color: string;
  matched: boolean;
};

export function ColorMatch() {
  const [seed, setSeed] = useState(0);
  const [cards, setCards] = useState<ColorCard[]>([]);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const colorSet = useMemo(() => COLOR_SETS[seed % COLOR_SETS.length], [seed]);

  useMemo(() => {
    const newCards = colorSet.colors
      .flatMap((color) => [
        { id: `${color}-1`, color, matched: false },
        { id: `${color}-2`, color, matched: false },
      ])
      .sort(() => Math.random() - 0.5);
    setCards(newCards);
    setFlipped(new Set());
  }, [seed, colorSet]);

  const handleFlip = (id: string) => {
    if (flipped.has(id) || cards.find((c) => c.id === id)?.matched) return;

    const newFlipped = new Set(flipped);
    newFlipped.add(id);
    setFlipped(newFlipped);

    if (newFlipped.size === 2) {
      const [first, second] = Array.from(newFlipped);
      const firstColor = cards.find((c) => c.id === first)?.color;
      const secondColor = cards.find((c) => c.id === second)?.color;

      if (firstColor === secondColor) {
        setCards((prev) =>
          prev.map((c) =>
            newFlipped.has(c.id) ? { ...c, matched: true } : c
          )
        );
        setFlipped(new Set());
      } else {
        setTimeout(() => setFlipped(new Set()), 1000);
      }
    }
  };

  const solved = cards.every((c) => c.matched);

  return (
    <div className="rounded-3xl border border-border bg-background/40 p-8 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Match · {solved ? <span className="text-accent">complete</span> : "find the pairs"}
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

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            data-cursor-hover
            className="relative h-20 rounded-xl border border-border backdrop-blur-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                rotateY: flipped.has(card.id) || card.matched ? 0 : 180,
              }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
              className="h-full w-full"
            >
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl"
                style={{
                  backfaceVisibility: "hidden",
                  background: "var(--accent)",
                }}
              >
                ?
              </div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-xl border-2"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundColor: card.color,
                  borderColor: card.color,
                }}
              />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

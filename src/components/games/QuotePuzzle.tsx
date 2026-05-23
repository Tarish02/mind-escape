import { useMemo, useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";

const PUZZLES = [
  "the mind is everything what you think you become",
  "almost everything will work again if you unplug it",
  "stillness is where creativity and solutions are found",
  "discipline is the bridge between goals and accomplishment",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuotePuzzle() {
  const [seed, setSeed] = useState(0);
  const target = useMemo(() => PUZZLES[seed % PUZZLES.length].split(" "), [seed]);
  const [order, setOrder] = useState<string[]>(() => shuffle(target));

  const solved = order.join(" ") === target.join(" ");

  return (
    <div className="rounded-3xl border border-border bg-background/40 p-8 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Rearrange · {solved ? <span className="text-accent">solved</span> : "drag the words"}
        </span>
        <button
          data-cursor-hover
          onClick={() => {
            setSeed((s) => s + 1);
            setOrder(shuffle(PUZZLES[(seed + 1) % PUZZLES.length].split(" ")));
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] hover:border-accent/60"
        >
          <RotateCcw className="h-3 w-3" />
          New puzzle
        </button>
      </div>

      <Reorder.Group axis="x" values={order} onReorder={setOrder} className="flex flex-wrap gap-3">
        {order.map((word, i) => (
          <Reorder.Item
            key={`${word}-${i}-${seed}`}
            value={word}
            data-cursor-hover
            className="cursor-grab select-none rounded-full border border-border bg-glass px-5 py-2 text-sm backdrop-blur-md active:cursor-grabbing"
            whileDrag={{ scale: 1.1, zIndex: 50 }}
          >
            {word}
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {solved && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-2 text-sm text-accent"
        >
          <Check className="h-4 w-4" />
          Beautifully arranged.
        </motion.div>
      )}
    </div>
  );
}

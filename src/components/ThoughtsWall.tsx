import { motion } from "framer-motion";

const thoughts = [
  "Stillness is a skill.",
  "You don't have to respond to every signal.",
  "Slow is a velocity.",
  "Attention is the rarest form of generosity.",
  "Breathe before you reply.",
  "The inbox can wait.",
  "Small windows of silence rebuild you.",
  "Walk away from the screen at least once.",
  "Quiet rooms produce loud ideas.",
];

export function ThoughtsWall() {
  return (
    <section className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Collective / 04
            </span>
            <h2 className="mt-4 max-w-[18ch] text-4xl font-medium tracking-tight md:text-6xl">
              Thoughts left for the next mind.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Hover to listen. Each fragment was left by someone, somewhere, on a break like yours.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {thoughts.map((t, i) => (
            <motion.button
              key={t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, color: "var(--accent)" }}
              data-cursor-hover
              className="rounded-full border border-border bg-glass px-6 py-3 text-sm text-foreground/80 backdrop-blur-md transition-colors hover:border-accent/40 hover:text-accent"
            >
              {t}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

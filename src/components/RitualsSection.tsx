import { motion } from "framer-motion";

const rituals = [
  { n: "01", t: "Box Breath", d: "Inhale 4, hold 4, release 4, hold 4. Four cycles." },
  { n: "02", t: "Window Stare", d: "Look at the furthest visible point for ninety seconds." },
  { n: "03", t: "Single Sip", d: "One drink. No phone. Notice temperature and weight." },
  { n: "04", t: "Walk the Floor", d: "Stand. Walk the length of the room. Return slowly." },
];

export function RitualsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 md:py-48">
      <div className="mb-20 max-w-2xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Rituals / 05
        </span>
        <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
          Four small ways to leave the desk without leaving the room.
        </h2>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x md:divide-y-0">
        {rituals.map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative px-2 py-10 transition-colors hover:bg-foreground/[0.02] md:px-10 md:py-16 ${
              i >= 2 ? "md:border-t md:border-border" : ""
            }`}
            data-cursor-hover
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                {r.n}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                Begin →
              </span>
            </div>
            <h3 className="mt-6 text-3xl font-medium tracking-tight md:text-5xl">{r.t}</h3>
            <p className="mt-4 max-w-[36ch] text-sm text-muted-foreground md:text-base">{r.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

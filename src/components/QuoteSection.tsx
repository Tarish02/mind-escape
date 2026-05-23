import { motion } from "framer-motion";

export function QuoteSection() {
  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-32 md:py-48">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="group relative w-full overflow-hidden rounded-[2rem] border border-border bg-glass p-10 backdrop-blur-3xl md:p-20"
      >
        <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[40%] -translate-x-1/2 rounded-full bg-accent/20 blur-[80px]" />
        <span className="relative z-10 mb-8 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Quote of the day
        </span>
        <p className="relative z-10 max-w-4xl text-pretty text-3xl font-medium leading-tight tracking-tight md:text-6xl">
          “The universe is not outside of you. Look inside yourself; everything that you want, you
          already are.”
        </p>
        <div className="relative z-10 mt-12 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">/ Rumi</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            01 — Daily Resonance
          </span>
        </div>
      </motion.div>
    </section>
  );
}

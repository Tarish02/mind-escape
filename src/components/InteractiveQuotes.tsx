import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, type QuoteCategory, randomQuote, type Quote } from "@/data/quotes";
import { Heart, Shuffle, Sparkles } from "lucide-react";

function TypedQuote({ quote }: { quote: Quote }) {
  const words = quote.text.split(" ");
  return (
    <p className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-pretty text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
      {words.map((w, i) => (
        <motion.span
          key={`${quote.text}-${i}`}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, color: "var(--accent)", scale: 1.04 }}
          drag
          dragSnapToOrigin
          dragElastic={0.6}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 18 }}
          data-cursor-hover
          className="inline-block cursor-grab select-none active:cursor-grabbing"
        >
          {w}
        </motion.span>
      ))}
    </p>
  );
}

export function InteractiveQuotes() {
  const [category, setCategory] = useState<QuoteCategory | "All">("All");
  const [quote, setQuote] = useState<Quote>(() => randomQuote());
  const [saved, setSaved] = useState<Quote[]>([]);
  const [auto, setAuto] = useState(false);

  const isSaved = useMemo(() => saved.some((s) => s.text === quote.text), [saved, quote]);

  const next = () => {
    setQuote((prev) => randomQuote(category === "All" ? undefined : category, prev.text));
  };

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [auto, category]);

  return (
    <section id="quotes" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      <div className="mb-12 flex items-end justify-between gap-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Library / 500+
          </span>
          <h2 className="mt-4 max-w-[18ch] text-4xl font-medium tracking-tight md:text-6xl">
            A living library of thoughts.
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
          Drag any word. Save what resonates. Shuffle for a new mood.
        </p>
      </div>

      {/* Category chips */}
      <div className="mb-10 flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              data-cursor-hover
              onClick={() => {
                setCategory(c);
                setQuote(randomQuote(c === "All" ? undefined : c));
              }}
              className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                active
                  ? "border-accent/60 bg-accent/10 text-accent shadow-[var(--shadow-glow)]"
                  : "border-border bg-glass text-muted-foreground hover:border-accent/30 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-glass p-10 backdrop-blur-3xl md:p-20">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-accent/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-64 w-[40%] rounded-full bg-blue-400/10 blur-[100px]" />

        <div className="relative z-10 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={quote.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <TypedQuote quote={quote} />
              <div className="mt-10 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>/ {quote.author}</span>
                <span className="h-px w-8 bg-border" />
                <span className="text-accent">{quote.category}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-3">
          <button
            data-cursor-hover
            onClick={next}
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-all hover:border-accent/60 hover:shadow-[var(--shadow-glow)]"
          >
            <Shuffle className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            New quote
          </button>
          <button
            data-cursor-hover
            onClick={() =>
              setSaved((s) => (isSaved ? s.filter((q) => q.text !== quote.text) : [...s, quote]))
            }
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-all ${
              isSaved
                ? "border-accent bg-accent text-accent-foreground"
                : "border-foreground/15 hover:border-accent/60"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            data-cursor-hover
            onClick={() => setAuto((a) => !a)}
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] transition-all ${
              auto ? "border-accent/60 text-accent" : "border-foreground/15 hover:border-accent/60"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {auto ? "Auto-flow on" : "Auto-flow"}
          </button>
        </div>
      </div>

      {/* Saved */}
      {saved.length > 0 && (
        <div className="mt-12">
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Your collection / {saved.length.toString().padStart(2, "0")}
          </span>
          <div className="flex flex-wrap gap-3">
            {saved.map((q) => (
              <motion.div
                key={q.text}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-sm rounded-2xl border border-border bg-glass p-4 backdrop-blur-md"
              >
                <p className="text-sm text-foreground/80">{q.text}</p>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  / {q.author}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

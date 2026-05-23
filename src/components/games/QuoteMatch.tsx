import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const QUOTES_DATA = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    quote: "The future belongs to those who believe in their dreams.",
    author: "Eleanor Roosevelt",
  },
];

type QuoteMatch = {
  quote: string;
  author: string;
  matched: boolean;
};

export function QuoteMatch() {
  const [seed, setSeed] = useState(0);
  const [matches, setMatches] = useState<QuoteMatch[]>([]);
  const [selected, setSelected] = useState<{
    quote: number | null;
    author: number | null;
  }>({ quote: null, author: null });

  useMemo(() => {
    const shuffled = [...QUOTES_DATA].sort(() => Math.random() - 0.5);
    setMatches(
      shuffled.map((q) => ({
        ...q,
        matched: false,
      }))
    );
    setSelected({ quote: null, author: null });
  }, [seed]);

  const quotes = matches.map((m) => m.quote);
  const authors = [...matches].sort(() => Math.random() - 0.5).map((m) => m.author);

  const handleQuoteClick = (idx: number) => {
    if (matches[idx].matched) return;
    setSelected((prev) => ({
      ...prev,
      quote: prev.quote === idx ? null : idx,
    }));
  };

  const handleAuthorClick = (authorIdx: number) => {
    if (selected.quote === null) return;

    const selectedAuthor = authors[authorIdx];
    const correctAuthor = matches[selected.quote].author;

    if (selectedAuthor === correctAuthor) {
      setMatches((prev) =>
        prev.map((m, i) => (i === selected.quote ? { ...m, matched: true } : m))
      );
      setSelected({ quote: null, author: null });
    } else {
      setSelected({ quote: null, author: null });
    }
  };

  const solved = matches.every((m) => m.matched);

  return (
    <div className="rounded-3xl border border-border bg-background/40 p-8 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Match · {solved ? <span className="text-accent">all matched</span> : "pair quotes with authors"}
        </span>
        <button
          data-cursor-hover
          onClick={() => setSeed((s) => s + 1)}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] hover:border-accent/60"
        >
          <RotateCcw className="h-3 w-3" />
          New set
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Quotes
          </p>
          <div className="space-y-2">
            {quotes.map((quote, i) => (
              <motion.button
                key={i}
                onClick={() => handleQuoteClick(i)}
                data-cursor-hover
                className={`block w-full rounded-lg border p-4 text-left text-sm transition-all ${
                  matches[i].matched
                    ? "border-accent/40 bg-accent/10 text-accent/60"
                    : selected.quote === i
                      ? "border-accent bg-accent/20 text-foreground"
                      : "border-border bg-glass text-muted-foreground hover:border-accent/30"
                }`}
                whileHover={{ x: 4 }}
              >
                "{quote}"
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Authors
          </p>
          <div className="space-y-2">
            {authors.map((author, i) => (
              <motion.button
                key={i}
                onClick={() => handleAuthorClick(i)}
                data-cursor-hover
                disabled={selected.quote === null}
                className={`block w-full rounded-lg border p-4 text-left text-sm transition-all ${
                  selected.quote !== null
                    ? "cursor-pointer hover:border-accent/60"
                    : "cursor-default opacity-50"
                } ${
                  matches.find((m) => m.author === author)?.matched
                    ? "border-accent/40 bg-accent/10 text-accent/60"
                    : "border-border bg-glass text-muted-foreground"
                }`}
                whileHover={selected.quote !== null ? { x: -4 } : {}}
              >
                — {author}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

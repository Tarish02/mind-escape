import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const PROMPTS = [
  "the present moment is the only moment available to us",
  "slow is smooth and smooth is fast",
  "do less but better",
  "breathe you are the sky not the weather",
];

export function TypingFlow() {
  const [seed, setSeed] = useState(0);
  const target = useMemo(() => PROMPTS[seed % PROMPTS.length], [seed]);
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const progress = Math.min(typed.length / target.length, 1);
  const done = typed === target;

  useEffect(() => {
    if (done) {
      const id = setTimeout(() => {
        setSeed((s) => s + 1);
        setTyped("");
      }, 1500);
      return () => clearTimeout(id);
    }
  }, [done]);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="cursor-text rounded-3xl border border-border bg-background/40 p-8 backdrop-blur-md"
    >
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span>Typing flow · click to focus</span>
        <span className="text-accent">{Math.round(progress * 100)}%</span>
      </div>
      <p className="text-pretty text-xl leading-relaxed md:text-2xl">
        {target.split("").map((ch, i) => {
          const t = typed[i];
          const state = t == null ? "pending" : t === ch ? "ok" : "err";
          return (
            <span
              key={i}
              className={
                state === "ok"
                  ? "text-foreground"
                  : state === "err"
                    ? "text-red-400 underline"
                    : "text-muted-foreground/40"
              }
            >
              {ch}
            </span>
          );
        })}
      </p>
      <div className="mt-6 h-px w-full overflow-hidden bg-border">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${progress * 100}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>
      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => {
          const v = e.target.value;
          if (v.length <= target.length) setTyped(v);
        }}
        autoFocus
        className="sr-only"
      />
    </div>
  );
}

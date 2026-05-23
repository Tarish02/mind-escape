import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BREATH_CYCLES = [
  { name: "Calm", inhale: 4, hold: 4, exhale: 4 },
  { name: "Deep", inhale: 4, hold: 7, exhale: 8 },
  { name: "Flow", inhale: 3, hold: 3, exhale: 3 },
];

type BreathPhase = "inhale" | "hold" | "exhale";

export function BreathPacer() {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [timer, setTimer] = useState(0);

  const cycle = BREATH_CYCLES[cycleIndex];
  const phaseTimings = {
    inhale: cycle.inhale,
    hold: cycle.hold,
    exhale: cycle.exhale,
  };
  const phaseDuration = phaseTimings[phase];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t + 1 >= phaseDuration) {
          setPhase((p) => {
            if (p === "inhale") return "hold";
            if (p === "hold") return "exhale";
            return "inhale";
          });
          return 0;
        }
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phaseDuration]);

  const progress = timer / phaseDuration;
  const phaseText = {
    inhale: "Breathe in",
    hold: "Hold",
    exhale: "Breathe out",
  };

  return (
    <div className="rounded-3xl border border-border bg-background/40 p-8 backdrop-blur-md">
      <div className="mb-12 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Breath · Sync with the circle
        </span>
        <div className="flex gap-2">
          {BREATH_CYCLES.map((c, i) => (
            <button
              key={i}
              data-cursor-hover
              onClick={() => {
                setCycleIndex(i);
                setPhase("inhale");
                setTimer(0);
              }}
              className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] transition-all ${
                cycleIndex === i
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border border-border text-muted-foreground hover:border-accent/30"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 py-16">
        <div className="relative h-48 w-48">
          <svg className="absolute inset-0 h-full w-full">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
            />
          </svg>

          <motion.div
            animate={{
              scale:
                phase === "inhale" ? 1.4 : phase === "hold" ? 1.4 : 1,
            }}
            transition={{ duration: phaseDuration, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="h-24 w-24 rounded-full bg-gradient-to-br from-accent to-accent/60 shadow-lg shadow-accent/30"
              animate={{
                opacity: phase === "hold" ? 0.6 : 1,
              }}
            />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {phaseText[phase]}
              </p>
              <p className="text-2xl font-semibold text-accent">
                {phaseDuration - timer}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs">
          <div className="h-1 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
              className="h-full w-full bg-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

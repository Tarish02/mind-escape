import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ScreenLoader() {
  const [visible, setVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setAnimateOut(true), 2800);
    const doneTimer = setTimeout(() => setVisible(false), 4200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  const words = ["Welcome", "to", "VOID"];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-2 z-[200] flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#0a0a12]"
          initial={{ opacity: 1 }}
          animate={{ opacity: animateOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: easeOutExpo }}
        >
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, oklch(0.82 0.16 82 / 0.2), transparent 70%)",
                filter: "blur(80px)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Words */}
            <div className="flex items-baseline gap-3 md:gap-5">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.35,
                    duration: 1.0,
                    ease: easeOutExpo,
                  }}
                  className={`font-display leading-none tracking-tight ${
                    i === 2
                      ? "text-[clamp(2.5rem,8vw,7rem)] font-light text-foreground"
                      : "text-[clamp(1.2rem,3.5vw,2.5rem)] font-light text-muted-foreground"
                  }`}
                  style={{
                    textShadow:
                      i === 2
                        ? "0 0 60px oklch(0.82 0.16 82 / 0.25), 0 0 120px oklch(0.82 0.16 82 / 0.1)"
                        : undefined,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Progress line */}
            <div className="relative h-[1px] w-[200px] overflow-hidden rounded-full bg-foreground/8 md:w-[280px]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-foreground"
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 1, 1] }}
                transition={{
                  duration: 2.8,
                  times: [0, 0.65, 0.85, 1],
                  ease: easeOutExpo,
                  delay: 1.1,
                }}
              />
            </div>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 1.4, duration: 1.0, ease: easeOutExpo }}
            >
              Preparing your space
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

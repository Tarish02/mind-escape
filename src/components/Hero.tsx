import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Particles } from "./Particles";
import heroSky from "@/assets/hero-sky.jpg";

const HEADLINES = [
  ["Escape", "the", "Noise."],
  ["Play", "With", "Thoughts."],
  ["Relax", "Your", "Mind."],
];

function InteractiveLetters({ words }: { words: string[] }) {
  return (
    <h1 className="text-[clamp(3rem,10vw,11rem)] font-medium leading-[0.9] tracking-tighter">
      {words.map((word, wi) => (
        <span key={wi} className="mr-4 inline-block md:mr-8">
          {word.split("").map((ch, i) => (
            <motion.span
              key={`${wi}-${i}`}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, delay: wi * 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -16, color: "var(--accent)", scale: 1.15, rotate: -4 }}
              className="inline-block cursor-pointer transition-colors"
              data-cursor-hover
              style={{ transformOrigin: "center bottom" }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HEADLINES.length), 5200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex h-screen min-h-[760px] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-0 z-0 opacity-50">
        <img
          src={heroSky}
          alt=""
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="absolute inset-0 z-0">
        <Particles count={90} />
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-0 h-[600px] w-[600px] rounded-full"
        style={{ background: "var(--gradient-orb-accent)", filter: "blur(40px)" }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="relative z-10 mb-10 block font-mono text-[10px] uppercase tracking-[0.45em]"
      >
        A mental playground for working minds
      </motion.span>

      <div className="relative z-10 min-h-[200px] md:min-h-[260px]">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <InteractiveLetters words={HEADLINES[idx]} />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-10 mt-10 max-w-md text-balance text-base text-muted-foreground md:text-lg"
      >
        Read, play, drift. A weightless room for the in-between hours of your working day.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          data-cursor-hover
          onClick={() => scrollTo("quotes")}
          className="group relative overflow-hidden rounded-full bg-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-background transition-transform hover:scale-[1.03]"
        >
          <span className="relative z-10">Start exploring</span>
          <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 group-hover:translate-x-0" />
        </button>
        <button
          data-cursor-hover
          onClick={() => scrollTo("games")}
          className="rounded-full border border-foreground/20 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] transition-all hover:border-accent/60 hover:shadow-[var(--shadow-glow)]"
        >
          Play word games
        </button>
        <button
          data-cursor-hover
          onClick={() => scrollTo("quotes")}
          className="rounded-full border border-foreground/10 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-accent"
        >
          Daily thought
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-3"
      >
        <div className="h-14 w-px bg-gradient-to-b from-transparent to-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll to descend</span>
      </motion.div>
    </section>
  );
}

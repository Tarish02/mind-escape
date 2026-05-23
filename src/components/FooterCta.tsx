import { useNavigate } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";

export function FooterCta() {
  const navigate = useNavigate();

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border bg-black/40 py-24">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 md:flex-row md:items-center">
        <div className="max-w-md">
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Ready to exit?</h2>
          <p className="mt-4 text-muted-foreground">
            Close your eyes for sixty seconds. The noise of the world is temporary.
          </p>
        </div>
        <MagneticButton onClick={() => navigate({ to: "/rituals" })}>
          Begin the Ritual
        </MagneticButton>
      </div>
      <div className="relative mx-auto mt-20 flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">
          EST. 2026 — Sensory Systems
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Created by / Designed by — TARISH
        </p>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">
          {/* <a href="#" className="transition-opacity hover:opacity-100">Privacy</a>
          <a href="#" className="transition-opacity hover:opacity-100">Legal</a> */}
        </div>
      </div>
    </footer>
  );
}

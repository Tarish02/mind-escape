import { Link } from "@tanstack/react-router";

export function Navigation() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 mix-blend-difference md:px-10">
      <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-80">
        Zenith Flow / 003
      </div>
      <div className="hidden gap-10 font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 md:flex">
        <a href="#quotes" className="transition-opacity hover:opacity-100">Quotes</a>
        <a href="#games" className="transition-opacity hover:opacity-100">Games</a>
        <a href="#playground" className="transition-opacity hover:opacity-100">Playground</a>
        <Link to="/rituals" className="transition-opacity hover:opacity-100">Rituals</Link>
      </div>
      <button
        data-cursor-hover
        className="rounded-full bg-foreground px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent"
      >
        Enter Space
      </button>
    </nav>
  );
}

import { useRef, type ReactNode, type MouseEvent } from "react";

export function MagneticButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-foreground/15 px-10 py-5 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:border-accent/60 hover:shadow-[var(--shadow-glow)] ${className}`}
    >
      <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
      <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-500 group-hover:text-background">
        {children}
      </span>
    </button>
  );
}

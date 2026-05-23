import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";

export function MoodCard({
  index,
  total,
  title,
  description,
  image,
  delay = 0,
}: {
  index: string;
  total: string;
  title: string;
  description: string;
  image: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-glass backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:border-accent/40 hover:shadow-[var(--shadow-card)] will-change-transform"
      >
        <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-60">
          <img
            src={image}
            alt={title}
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-[1.8s] ease-[var(--ease-out-expo)] group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <span className="mb-3 font-mono text-[10px] tracking-[0.25em] text-accent">
            {index} / {total}
          </span>
          <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
          <p className="mt-2 max-w-[24ch] text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

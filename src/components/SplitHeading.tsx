import { motion } from "framer-motion";

export function SplitHeading({ lines }: { lines: string[] }) {
  return (
    <h1 className="text-[clamp(3.5rem,12vw,14rem)] font-medium leading-[0.85] tracking-tighter">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split("").map((ch, i) => (
            <motion.span
              key={`${li}-${i}`}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.1,
                delay: li * 0.15 + i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block transition-colors duration-500 hover:text-accent"
              data-cursor-hover
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

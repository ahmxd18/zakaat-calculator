/**
 * SectionHeader.tsx
 * Reusable animated section heading + subheading block.
 * Reveals on scroll with a gentle fade-up.
 */
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface SectionHeaderProps {
  eyebrow?:   string;
  heading:    string;
  subheading?: string;
  align?:     "left" | "center" | "right";
  className?: string;
  light?:     boolean; // white text variant (for dark backgrounds)
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align     = "center",
  className,
  light     = false,
}: SectionHeaderProps) {
  const alignClass = {
    left:   "text-left items-start",
    center: "text-center items-center",
    right:  "text-right items-end",
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn("flex flex-col gap-3", alignClass, className)}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.15em]",
            light ? "text-sage-300" : "text-sage-500"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl lg:text-5xl font-light leading-tight",
          light ? "text-cream-50" : "text-charcoal-800"
        )}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed max-w-2xl",
            light ? "text-cream-200" : "text-charcoal-500"
          )}
        >
          {subheading}
        </p>
      )}
    </motion.div>
  );
}

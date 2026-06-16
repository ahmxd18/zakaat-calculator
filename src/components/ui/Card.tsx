/**
 * Card.tsx
 * Reusable card component with optional hover lift animation.
 * Supports whileInView reveal for scroll-triggered animations.
 */
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?:   boolean;
  padding?: "sm" | "md" | "lg" | "none";
  glass?:   boolean;
}

const paddingStyles = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export function Card({
  children,
  hover   = false,
  padding = "md",
  glass   = false,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-2xl border",
        glass
          ? "bg-white/60 backdrop-blur-sm border-white/40 shadow-sm"
          : "bg-white border-cream-200 shadow-sm",
        hover && "cursor-pointer transition-shadow hover:shadow-md",
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Scroll-reveal card wrapper
export function RevealCard({
  children,
  delay = 0,
  className,
  ...rest
}: {
  children: React.ReactNode;
  delay?:   number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

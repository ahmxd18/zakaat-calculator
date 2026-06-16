/**
 * PageTransition.tsx
 * Wraps each page in a Framer Motion animation for smooth route changes.
 * Uses a fade + slight upward slide pattern.
 */
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

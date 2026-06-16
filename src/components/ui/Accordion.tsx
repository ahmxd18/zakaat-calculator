/**
 * Accordion.tsx
 * Animated accordion component using Framer Motion.
 * Single-open mode by default (clicking one closes others).
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export interface AccordionItem {
  question: string;
  answer:   string;
}

interface AccordionProps {
  items:      readonly AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={cn(
              "rounded-2xl border bg-white overflow-hidden",
              "transition-shadow duration-200",
              isOpen
                ? "border-sage-300 shadow-md shadow-sage-100"
                : "border-cream-200 shadow-sm hover:border-sage-200"
            )}
          >
            {/* Header button */}
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className={cn(
                "w-full flex items-center justify-between gap-4",
                "px-6 py-5 text-left",
                "text-charcoal-800 font-medium text-base leading-snug",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-inset",
                "transition-colors duration-150",
                isOpen ? "text-sage-700" : "hover:text-sage-600"
              )}
            >
              <span className="flex-1">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={cn(
                  "shrink-0 h-5 w-5 transition-colors duration-150",
                  isOpen ? "text-sage-500" : "text-charcoal-400"
                )}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </button>

            {/* Animated answer panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-6 pb-5 pt-0">
                    <div className="h-px bg-cream-200 mb-4" />
                    <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

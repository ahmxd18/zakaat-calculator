/**
 * Badge.tsx
 * Small label/tag component for categories, statuses, etc.
 */
import { cn } from "../../utils/cn";

type BadgeVariant = "sage" | "blush" | "cream" | "charcoal";

interface BadgeProps {
  children:  React.ReactNode;
  variant?:  BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  sage:     "bg-sage-100 text-sage-700 border-sage-200",
  blush:    "bg-blush-100 text-blush-500 border-blush-200",
  cream:    "bg-cream-100 text-charcoal-600 border-cream-300",
  charcoal: "bg-charcoal-100 text-charcoal-700 border-charcoal-200",
};

export function Badge({ children, variant = "sage", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5",
        "text-xs font-medium rounded-full border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

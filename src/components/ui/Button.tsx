/**
 * Button.tsx
 * Reusable animated button component with multiple variants.
 * Uses Framer Motion for press/hover states.
 */
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?:  Variant;
  size?:     Size;
  children:  React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-sage-600 text-cream-50 shadow-md shadow-sage-200 hover:bg-sage-500 active:bg-sage-700",
  secondary:
    "bg-blush-100 text-blush-500 hover:bg-blush-200 active:bg-blush-300",
  outline:
    "border-2 border-sage-600 text-sage-600 hover:bg-sage-50 active:bg-sage-100",
  ghost:
    "text-charcoal-600 hover:bg-charcoal-100 active:bg-charcoal-200",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-2xl gap-2.5",
};

export function Button({
  variant   = "primary",
  size      = "md",
  children,
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "transition-colors duration-200 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}

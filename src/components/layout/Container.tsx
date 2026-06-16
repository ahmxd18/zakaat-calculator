/**
 * Container.tsx
 * Page-level content wrapper with consistent max-width and responsive padding.
 * Used inside every page to constrain content width.
 */
import { cn } from "../../utils/cn";

interface ContainerProps {
  children:    React.ReactNode;
  className?:  string;
  narrow?:     boolean; // tighter max-width for text-heavy pages
  as?:         React.ElementType;
}

export function Container({
  children,
  className,
  narrow = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}

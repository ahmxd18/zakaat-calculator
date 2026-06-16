/**
 * PageLayout.tsx
 * Wrapper component to eliminate repeated page-top-padding across all pages.
 */
import { LAYOUT } from "../../constants/layout";
import { cn } from "../../utils/cn";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={cn("min-h-screen bg-cream-50", LAYOUT.PAGE_TOP_PADDING, "pb-20", className)}>
      {children}
    </main>
  );
}

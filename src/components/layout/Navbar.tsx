/**
 * Navbar.tsx
 * Shared navigation header.
 * - Desktop: horizontal nav with hover underline effect
 * - Mobile: hamburger icon → animated full-screen overlay menu
 * - Scrolled state: adds backdrop blur + border
 */
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon } from "lucide-react";
import { NAV } from "../../constants/content";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

export function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location                  = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Detect scroll for header background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300",
          scrolled
            ? "bg-cream-50/95 backdrop-blur-md border-b border-cream-200 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-18 items-center justify-between gap-4">

            {/* ── Brand ── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="Zakaat Calculator — Home"
            >
              {/* Logo mark */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 shadow-sm shadow-sage-200"
              >
                <Moon className="h-4.5 w-4.5 text-cream-50 fill-cream-50" strokeWidth={1.5} />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-lg font-semibold text-charcoal-800 tracking-tight"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}
                >
                  {NAV.brand}
                </span>
                <span className="text-[10px] text-charcoal-400 uppercase tracking-widest font-medium">
                  {NAV.brandTagline}
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV.links.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "relative px-3.5 py-2 text-sm font-medium rounded-lg",
                      "transition-colors duration-150",
                      isActive
                        ? "text-sage-600"
                        : "text-charcoal-600 hover:text-sage-600 hover:bg-sage-50"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-sage-500 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:block shrink-0">
              <Link to="/calculate">
                <Button variant="primary" size="sm">
                  {NAV.ctaLabel}
                </Button>
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(prev => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className={cn(
                "lg:hidden flex items-center justify-center",
                "h-10 w-10 rounded-xl",
                "text-charcoal-700 hover:bg-sage-50",
                "transition-colors duration-150"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: 90,   opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-charcoal-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)]",
                "bg-cream-50 shadow-xl lg:hidden",
                "flex flex-col"
              )}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
                <span
                  className="text-lg font-semibold text-charcoal-800"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {NAV.brand}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center h-9 w-9 rounded-xl text-charcoal-500 hover:bg-cream-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {NAV.links.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-4 py-3.5 rounded-xl",
                          "text-base font-medium transition-colors duration-150",
                          isActive
                            ? "bg-sage-100 text-sage-700"
                            : "text-charcoal-700 hover:bg-cream-200 hover:text-sage-600"
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* CTA at bottom */}
              <div className="px-5 pb-8 pt-4 border-t border-cream-200">
                <Link to="/calculate" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" size="md" fullWidth>
                    {NAV.ctaLabel}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * AppRoutes.tsx
 * Centralised route definitions for the Zakaat Calculator app.
 * Uses AnimatePresence from Framer Motion for page transition animations.
 * Each route renders its page inside a PageTransition wrapper.
 */
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { PageTransition } from "../components/layout/PageTransition";
import { Home }       from "../pages/Home";
import { Calculate }  from "../pages/Calculate";
import { FAQs }       from "../pages/FAQs";
import { About }      from "../pages/About";
import { Contact }    from "../pages/Contact";
import { Donate }     from "../pages/Donate";
import { References } from "../pages/References";
import { NotFound }   from "../pages/NotFound";

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/calculate"
          element={
            <PageTransition>
              <Calculate />
            </PageTransition>
          }
        />
        <Route
          path="/faqs"
          element={
            <PageTransition>
              <FAQs />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/donate"
          element={
            <PageTransition>
              <Donate />
            </PageTransition>
          }
        />
        <Route
          path="/references"
          element={
            <PageTransition>
              <References />
            </PageTransition>
          }
        />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

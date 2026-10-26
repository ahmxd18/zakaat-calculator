/**
 * AppRoutes.tsx
 * Centralised route definitions for the Zakaat Calculator app.
 * Uses AnimatePresence from Framer Motion for page transition animations.
 * Each route renders its page inside a PageTransition wrapper.
 */
import { lazy, Suspense } from "react"
import { useT } from "../contexts/i18n"
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { RouteErrorBoundary } from "../components/layout/RouteErrorBoundary"
import { PageTransition } from "../components/layout/PageTransition";
const Home = lazy(() => import("../pages/Home").then(module => ({ default: module.Home })))
const Calculate = lazy(() => import("../pages/Calculate").then(module => ({ default: module.Calculate })))
const FAQs = lazy(() => import("../pages/FAQs").then(module => ({ default: module.FAQs })))
const About = lazy(() => import("../pages/About").then(module => ({ default: module.About })))
const Contact = lazy(() => import("../pages/Contact").then(module => ({ default: module.Contact })))
const Donate = lazy(() => import("../pages/Donate").then(module => ({ default: module.Donate })))
const References = lazy(() => import("../pages/References").then(module => ({ default: module.References })))
const NotFound = lazy(() => import("../pages/NotFound").then(module => ({ default: module.NotFound })))

export function AppRoutes() {
  const location = useLocation();
  const t = useT();

  return (
    <RouteErrorBoundary key={location.pathname} fallback={<div role="alert" className="p-8 text-center"><p>{t.common.error}</p><button type="button" onClick={() => window.location.reload()}>{t.common.tryAgain}</button></div>}>
    <Suspense fallback={<p role="status" className="p-8 text-center">{t.common.loading}</p>}>
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
    </Suspense>
    </RouteErrorBoundary>
  );
}

/**
 * App.tsx
 * Root application component.
 * Sets up BrowserRouter, i18n, Navbar, main content area with routes, and Footer.
 */
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "./contexts/i18n";
import { Navbar }      from "./components/layout/Navbar";
import { Footer }      from "./components/layout/Footer";
import { AppRoutes }   from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <div className="flex min-h-screen flex-col bg-cream-50">
          {/* Global navigation header */}
          <Navbar />

          {/* Page content — grows to fill available space */}
          <div className="flex-1">
            <AppRoutes />
          </div>

          {/* Global footer */}
          <Footer />
        </div>
      </I18nProvider>
    </BrowserRouter>
  );
}

/**
 * NotFound.tsx
 * 404 fallback page with i18n support.
 */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Container } from "../components/layout/Container";
import { PageLayout } from "../components/layout/PageLayout";
import { useT, useTranslation } from "../contexts/i18n";
import { cn } from "../utils/cn";

export function NotFound() {
  const navigate = useNavigate();
  const t = useT();
  const { direction } = useTranslation();
  
  return (
    <PageLayout className="flex items-center justify-center">
      <Container narrow className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Large 404 */}
          <div
            className="text-9xl font-light text-sage-200 select-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            404
          </div>
          <div className="space-y-2">
            <h1
              className="text-3xl font-light text-charcoal-800"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.notFound.title}
            </h1>
            <p className="text-charcoal-500 text-base">
              {t.notFound.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/">
              <Button variant="primary" size="md" leftIcon={<Home className="h-4 w-4" />}>
                {t.notFound.homeBtn}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="md" 
              leftIcon={<ArrowLeft className={cn("h-4 w-4", direction === 'rtl' && 'rotate-180')} />}
              onClick={() => navigate(-1)}
            >
              {t.notFound.backBtn}
            </Button>
          </div>
        </motion.div>
      </Container>
    </PageLayout>
  );
}

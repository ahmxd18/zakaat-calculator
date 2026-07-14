/**
 * FAQs.tsx
 * Frequently Asked Questions page with animated accordion.
 */
import { motion } from "framer-motion";
import { HelpCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "../contexts/i18n";
import { Accordion }     from "../components/ui/Accordion";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button }        from "../components/ui/Button";
import { Container }     from "../components/layout/Container";
import { PageLayout }    from "../components/layout/PageLayout";

export function FAQs() {
  const t = useT();
  
  return (
    <PageLayout className="!pt-0">

      {/* ── Hero banner ── */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #f2f7f2 0%, #fdfaf5 100%)" }}
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 rounded-full bg-sage-100/60 -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blush-100/50 translate-y-1/2 -translate-x-1/3 blur-2xl" />

        <Container narrow className="relative z-10 text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-600 shadow-lg shadow-sage-200 mb-8 mx-auto"
          >
            <HelpCircle className="h-8 w-8 text-cream-50" />
          </motion.div>

          <SectionHeader
            eyebrow={t.faqs.knowledgeBase}
            heading={t.faqs.heading}
            subheading={t.faqs.subheading}
          />
        </Container>
      </section>

      {/* ── Accordion ── */}
      <section className="py-10 sm:py-16">
        <Container narrow>
          <Accordion items={t.faqs.items} />
        </Container>
      </section>

      {/* ── Still have questions CTA ── */}
      <section className="py-10 sm:py-16">
        <Container narrow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white border border-cream-200 p-8 sm:p-12 text-center shadow-sm space-y-5"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blush-100 text-blush-400 mx-auto">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3
                className="text-2xl font-light text-charcoal-800"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.faqs.stillHaveQuestion}
              </h3>
              <p className="text-sm text-charcoal-500">
                {t.faqs.stillHaveQuestionText}
              </p>
            </div>
            <Link to="/contact">
              <Button variant="primary" size="md">
                {t.faqs.contactUs}
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

    </PageLayout>
  );
}

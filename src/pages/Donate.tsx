/**
 * Donate.tsx
 * Donation page — charity cards UI only. No payment integration.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle, Globe } from "lucide-react";
import { DONATE } from "../constants/content";
import { Badge }         from "../components/ui/Badge";
import { Button }        from "../components/ui/Button";
import { RevealCard }    from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Container }     from "../components/layout/Container";
import { PageLayout }    from "../components/layout/PageLayout";
import { LAYOUT }        from "../constants/layout";

type Charity = (typeof DONATE.charities)[number];

function CharityCard({ charity, index }: { charity: Charity; index: number }) {
  return (
    <RevealCard delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group h-full flex flex-col rounded-2xl bg-white border border-cream-200 shadow-sm hover:shadow-lg hover:border-sage-200 transition-shadow overflow-hidden"
      >
        {/* Top accent stripe */}
        <div
          className={`h-1.5 w-full ${
            charity.accent === "sage"
              ? "bg-gradient-to-r from-sage-400 to-sage-600"
              : "bg-gradient-to-r from-blush-300 to-blush-500"
          }`}
        />

        <div className="flex flex-col flex-1 p-6 gap-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            {/* Logo placeholder */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold shadow-sm ${
                charity.accent === "sage"
                  ? "bg-sage-100 text-sage-700"
                  : "bg-blush-100 text-blush-500"
              }`}
            >
              {charity.name.charAt(0)}
            </div>
            <Badge variant={charity.accent === "sage" ? "sage" : "blush"}>
              {charity.badge}
            </Badge>
          </div>

          {/* Name & category */}
          <div>
            <h3 className="font-semibold text-charcoal-800 text-lg leading-snug group-hover:text-sage-700 transition-colors">
              {charity.name}
            </h3>
            <p className="text-xs text-charcoal-400 mt-0.5 flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {charity.country} · Est. {charity.established}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-charcoal-500 leading-relaxed flex-1">
            {charity.description}
          </p>

          {/* Category tag + CTA */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-cream-100">
            <span className="text-xs text-charcoal-400 bg-cream-100 rounded-full px-3 py-1">
              {charity.category}
            </span>
            <a
              href={charity.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Donate to ${charity.name}`}
            >
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
              >
                Donate
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </RevealCard>
  );
}

export function Donate() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? DONATE.charities
      : DONATE.charities.filter(c => c.category === activeCategory);

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <section
        className="relative py-16 sm:py-24 overflow-hidden"
        style={{ background: "linear-gradient(150deg, #fdf2f4 0%, #fdfaf5 60%, #f2f7f2 100%)" }}
      >
        <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full bg-sage-100/50 -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <Container className="text-center relative z-10">
          <SectionHeader
            eyebrow="Zakaat Eligible Charities"
            heading={DONATE.heading}
            subheading={DONATE.subheading}
          />

          {/* Disclaimer note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white border border-cream-200 px-4 py-2 text-xs text-charcoal-500 shadow-sm"
          >
            <CheckCircle className="h-3.5 w-3.5 text-sage-500 shrink-0" />
            {DONATE.note}
          </motion.div>
        </Container>
      </section>

      {/* ── Category filter ── */}
      <section className={`py-8 bg-white border-b border-cream-200 sticky ${LAYOUT.STICKY_TOP} z-30 shadow-sm`}>
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs font-semibold text-charcoal-500 shrink-0 mr-1">Filter:</span>
            {DONATE.categories.map(cat => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-sage-600 text-cream-50 shadow-md shadow-sage-200"
                    : "bg-cream-100 text-charcoal-600 hover:bg-cream-200"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Charity cards ── */}
      <section className="py-12 sm:py-16">
        <Container>
          {/* Disclaimer */}
          <div className="mb-8 rounded-xl bg-blush-50 border border-blush-200 p-4">
            <p className="text-xs text-blush-700 leading-relaxed">
              ⚠️ <strong>Note:</strong> Listed charities are placeholder examples pending verification and partnership agreements. We do not endorse any organization until formal vetting is complete. Always verify charity credentials independently.
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((charity, i) => (
                <CharityCard key={charity.id} charity={charity} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-charcoal-400"
            >
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">No charities in this category yet.</p>
              <p className="text-sm mt-1">Check back soon — we're adding more.</p>
            </motion.div>
          )}
        </Container>
      </section>

      {/* ── "Add a charity" CTA ── */}
      <section className="py-10">
        <Container narrow>
          <RevealCard>
            <div className="rounded-3xl bg-white border border-cream-200 p-8 sm:p-12 text-center space-y-4 shadow-sm">
              <h3
                className="text-2xl font-light text-charcoal-800"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Know a trusted Zakaat-eligible charity?
              </h3>
              <p className="text-sm text-charcoal-500">
                We're always looking to expand our verified charity list. Suggest a charity for review.
              </p>
              <Button variant="outline" size="md">
                Suggest a Charity
              </Button>
            </div>
          </RevealCard>
        </Container>
      </section>

    </PageLayout>
  );
}

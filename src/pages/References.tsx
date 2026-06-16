/**
 * References.tsx
 * Qur'an, Hadith, and Fiqh citations with category tabs.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Scroll, Library, GraduationCap, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { REFERENCES } from "../constants/content";
import { RevealCard }    from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Container }     from "../components/layout/Container";
import { PageLayout }    from "../components/layout/PageLayout";
import { LAYOUT }        from "../constants/layout";

type Category = (typeof REFERENCES.categories)[number];

const CategoryIcon: Record<string, React.FC<{ className?: string }>> = {
  book:             ({ className }) => <BookOpen      className={className} />,
  scroll:           ({ className }) => <Scroll        className={className} />,
  library:          ({ className }) => <Library       className={className} />,
  "graduation-cap": ({ className }) => <GraduationCap className={className} />,
};

function ReferenceCard({
  ref: refData,
  index,
}: {
  ref: Category["refs"][number];
  index: number;
}) {
  return (
    <RevealCard delay={index * 0.07}>
      <div className="rounded-2xl bg-white border border-cream-200 p-6 sm:p-8 space-y-4 shadow-sm hover:border-sage-200 hover:shadow-md transition-all duration-200">
        {/* Reference ID */}
        <div className="flex items-start justify-between gap-3">
          <span className="inline-block rounded-xl bg-sage-100 border border-sage-200 px-3 py-1 text-xs font-semibold text-sage-700">
            {refData.ref}
          </span>
          <Quote className="h-5 w-5 text-cream-300 shrink-0 mt-0.5" />
        </div>

        {/* Arabic text if present */}
        {refData.arabic && (
          <div
            dir="rtl"
            lang="ar"
            className="text-right text-xl sm:text-2xl text-charcoal-700 leading-loose font-light py-2 border-y border-cream-100"
            style={{ fontFamily: "serif" }}
          >
            {refData.arabic}
          </div>
        )}

        {/* Translation / text */}
        <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed italic">
          {refData.text}
        </p>

        {/* Scholar note */}
        {refData.note && (
          <p className="text-xs text-charcoal-400 leading-relaxed border-t border-cream-100 pt-3">
            📝 {refData.note}
          </p>
        )}
      </div>
    </RevealCard>
  );
}

export function References() {
  const [activeId, setActiveId] = useState<string>(REFERENCES.categories[0].id);

  const activeCategory = REFERENCES.categories.find(c => c.id === activeId)!;

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-cream-200">
        <Container className="text-center">
          <SectionHeader
            eyebrow="Scholarly Sources"
            heading={REFERENCES.heading}
            subheading={REFERENCES.subheading}
          />
        </Container>
      </section>

      {/* ── Category tabs ── */}
      <section className={`py-6 bg-cream-50 border-b border-cream-200 sticky ${LAYOUT.STICKY_TOP} z-30`}>
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {REFERENCES.categories.map(cat => {
              const Icon = CategoryIcon[cat.icon];
              const isActive = activeId === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveId(cat.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sage-600 text-cream-50 shadow-md shadow-sage-200"
                      : "bg-white border border-cream-200 text-charcoal-600 hover:border-sage-200 hover:text-sage-700"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {cat.label}
                </motion.button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── References grid ── */}
      <section className="py-12 sm:py-16">
        <Container>
          {/* Verification disclaimer */}
          <div className="mb-8 rounded-xl bg-blush-50 border border-blush-200 p-4">
            <p className="text-xs text-blush-700 leading-relaxed">
              ⚠️ <strong>Verification Notice:</strong> All Hadith citations (book and number) are pending scholarly verification against verified sources (e.g., sunnah.com). Do not rely on exact citation numbers until independently confirmed.
            </p>
          </div>
          
          {/* Category heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h2
              className="text-3xl font-light text-charcoal-800"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {activeCategory.label}
            </h2>
            <div className="h-1 w-16 bg-sage-400 rounded-full mt-2" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {activeCategory.refs.map((ref, i) => (
                <ReferenceCard key={ref.ref} ref={ref} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* ── Methodology note ── */}
      <section className="py-10">
        <Container narrow>
          <RevealCard>
            <div className="rounded-3xl bg-charcoal-800 p-8 sm:p-12 text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage-600 mx-auto">
                <BookOpen className="h-6 w-6 text-cream-50" />
              </div>
              <h3
                className="text-2xl font-light text-cream-50"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Methodology
              </h3>
              <p className="text-sm text-charcoal-300 leading-relaxed max-w-lg mx-auto">
                Our calculations follow the Hanafi school's use of the silver Nisaab as default, while providing optional switching to the gold standard. All rulings are cross-referenced across the four major schools of jurisprudence (Hanafi, Maliki, Shafi'i, Hanbali) and contemporary scholarly bodies.
              </p>
              <p className="text-xs text-charcoal-500">
                Spot an error or have a scholarly correction? <Link to="/contact" className="text-sage-400 underline hover:text-sage-300">Contact our Fiqh committee →</Link>
              </p>
            </div>
          </RevealCard>
        </Container>
      </section>

    </PageLayout>
  );
}

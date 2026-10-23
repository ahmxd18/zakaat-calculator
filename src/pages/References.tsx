/**
 * References.tsx
 * Qur'an, Hadith, and Fiqh citations with category tabs.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Scroll, Library, GraduationCap, Quote, StickyNote, ExternalLink, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../contexts/i18n";
import type { Translations } from "../locales/en";
import {
  REFERENCE_CATEGORIES,
  type HadithClassification,
  type Madhhab,
  type ReferenceCategory,
  type ReferenceItem,
} from "../data/references";
import { RevealCard }    from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Container }     from "../components/layout/Container";
import { PageLayout }    from "../components/layout/PageLayout";
import { LAYOUT }        from "../constants/layout";

const CategoryIcon: Record<ReferenceCategory["icon"], LucideIcon> = {
  book: BookOpen,
  scroll: Scroll,
  library: Library,
  "graduation-cap": GraduationCap,
};

function ReferenceCard({
  ref: refData,
  index,
  language,
  labels,
}: {
  ref: ReferenceItem;
  index: number;
  language: string;
  labels: Pick<
    Translations["references"],
    | "translationLabel"
    | "quranTranslations"
    | "quranNotes"
    | "readVerse"
    | "hadithTranslations"
    | "hadithMeaningLabel"
    | "authenticityGrades"
    | "readHadith"
    | "madhhabs"
  >;
}) {
  return (
    <RevealCard
      delay={index * 0.07}
      className="mb-6 inline-block w-full break-inside-avoid align-top"
    >
      <article className="space-y-4 rounded-2xl border border-cream-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sage-200 hover:shadow-lg sm:p-8">
        {/* Reference ID */}
        <div className="flex items-start justify-between gap-3">
          <span className="inline-block rounded-xl bg-sage-100 border border-sage-200 px-3 py-1 text-xs font-semibold text-sage-700">
            {refData.ref}
          </span>
          <Quote className="h-5 w-5 text-cream-300 shrink-0 mt-0.5" />
        </div>

        {refData.type === "quran" ? (
          <>
            <div
              dir="rtl"
              lang="ar"
              className="border-y border-cream-100 py-3 text-right text-xl font-light leading-loose text-charcoal-700 sm:text-2xl"
              style={{ fontFamily: "serif" }}
            >
              {refData.arabic}
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-sage-700">
                {labels.translationLabel}
              </p>
              <p
                dir={language === "ar" || language === "ur" ? "rtl" : "ltr"}
                lang={language}
                className="text-sm leading-relaxed text-charcoal-600 sm:text-base"
              >
                {labels.quranTranslations[refData.id]}
              </p>
            </div>
            {refData.noteKey && (
              <p className="flex items-start gap-1.5 border-t border-cream-100 pt-3 text-xs leading-relaxed text-charcoal-400">
                <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-charcoal-300" />
                {labels.quranNotes[refData.noteKey]}
              </p>
            )}
            <a
              href={refData.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-700 underline decoration-sage-300 underline-offset-2 hover:text-sage-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
            >
              {labels.readVerse}
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </>
        ) : refData.type === "hadith" ? (
          <>
            <div className="flex flex-wrap gap-2">
              {refData.classifications.map((classification) => (
                <span
                  key={classification}
                  className="inline-flex rounded-full border border-sage-200 bg-sage-50 px-2.5 py-1 text-xs font-semibold text-sage-700"
                >
                  {labels.authenticityGrades[classification]}
                </span>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-sage-700">
                {labels.hadithMeaningLabel}
              </p>
              <p
                dir={language === "ar" || language === "ur" ? "rtl" : "ltr"}
                lang={language}
                className="text-sm leading-relaxed text-charcoal-600 sm:text-base"
              >
                {labels.hadithTranslations[refData.id]}
              </p>
            </div>
            <a
              href={refData.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sage-700 underline decoration-sage-300 underline-offset-2 hover:text-sage-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
            >
              {labels.readHadith}
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </>
        ) : (
          <>
            {refData.type === "fiqh" && (
              <span className="inline-flex rounded-full border border-sage-200 bg-sage-50 px-2.5 py-1 text-xs font-semibold text-sage-700">
                {labels.madhhabs[refData.madhhab]}
              </span>
            )}
            <p className="text-sm italic leading-relaxed text-charcoal-600 sm:text-base">
              {refData.text}
            </p>
            {refData.type === "text" && refData.note && (
              <p className="flex items-start gap-1.5 border-t border-cream-100 pt-3 text-xs leading-relaxed text-charcoal-400">
                <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-charcoal-300" />
                {refData.note}
              </p>
            )}
          </>
        )}
      </article>
    </RevealCard>
  );
}

export function References() {
  const { translations: t, language } = useTranslation();
  const categories = REFERENCE_CATEGORIES.map((category) => ({
    ...category,
    label: t.references.categories[category.id],
  }));
  const [activeId, setActiveId] = useState<ReferenceCategory["id"]>("quran");
  const [hadithFilter, setHadithFilter] = useState<HadithClassification | "all">("all");
  const [fiqhFilter, setFiqhFilter] = useState<Madhhab | "all">("all");
  const activeCategory = categories.find((category) => category.id === activeId);
  if (!activeCategory) throw new Error(`Reference category "${activeId}" is missing.`);
  const referenceItems: readonly ReferenceItem[] = activeCategory.refs;
  const visibleReferences = referenceItems.filter((ref) => {
    if (activeId === "hadith" && hadithFilter !== "all") {
      return ref.type === "hadith" && ref.classifications.includes(hadithFilter);
    }
    if (activeId === "fiqh" && fiqhFilter !== "all") {
      return ref.type === "fiqh" && ref.madhhab === fiqhFilter;
    }
    return true;
  });
  const hadithFilters: readonly (HadithClassification | "all")[] = [
    "all",
    "sahih",
    "hasan",
    "gharib",
    "mashhur",
  ];
  const fiqhFilters: readonly (Madhhab | "all")[] = [
    "all",
    "hanafi",
    "maliki",
    "shafii",
    "hanbali",
  ];

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-cream-200">
        <Container className="text-center">
          <SectionHeader
            eyebrow={t.references.eyebrow}
            heading={t.references.heading}
            subheading={t.references.subheading}
          />
        </Container>
      </section>

      {/* ── Category tabs ── */}
      <section className={`py-6 bg-cream-50 border-b border-cream-200 sticky ${LAYOUT.STICKY_TOP} z-30`}>
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
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
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </motion.button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── References masonry ── */}
      <section className="py-12 sm:py-16">
        <Container>
          {/* Scholarly review note */}
          <div className="mb-8 rounded-xl bg-blush-50 border border-blush-200 p-4">
            <p className="text-xs text-blush-700 leading-relaxed">
              {t.references.verificationWarning}
            </p>
          </div>

          {activeId === "quran" && (
            <p className="mb-6 text-xs leading-relaxed text-charcoal-500">
              {t.references.quranSource} {t.references.translationNote}
            </p>
          )}
          
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

          {activeId === "hadith" && (
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-charcoal-600">
                {t.references.hadithFilterLabel}
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t.references.hadithFilterLabel}>
                {hadithFilters.map((filter) => {
                  const isActive = hadithFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setHadithFilter(filter)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-sage-600 bg-sage-600 text-cream-50"
                          : "border-cream-300 bg-white text-charcoal-600 hover:border-sage-300 hover:text-sage-700"
                      }`}
                    >
                      {filter === "all" ? t.references.filterAll : t.references.authenticityGrades[filter]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeId === "fiqh" && (
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-charcoal-600">
                {t.references.fiqhFilterLabel}
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t.references.fiqhFilterLabel}>
                {fiqhFilters.map((filter) => {
                  const isActive = fiqhFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setFiqhFilter(filter)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-sage-600 bg-sage-600 text-cream-50"
                          : "border-cream-300 bg-white text-charcoal-600 hover:border-sage-300 hover:text-sage-700"
                      }`}
                    >
                      {filter === "all" ? t.references.filterAll : t.references.madhhabs[filter]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="columns-1 gap-6 md:columns-2 2xl:columns-3"
            >
              {visibleReferences.length > 0 ? visibleReferences.map((ref, i) => (
                <ReferenceCard
                  key={ref.id}
                  ref={ref}
                  index={i}
                  language={language}
                  labels={t.references}
                />
              )) : (
                <p className="mb-6 rounded-xl border border-cream-200 bg-white p-6 text-sm text-charcoal-500">
                  {t.references.noFilterResults}
                </p>
              )}
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
                {t.references.methodologyHeading}
              </h3>
              <p className="text-sm text-charcoal-300 leading-relaxed max-w-lg mx-auto">
                {t.references.methodologyText}
              </p>
              <p className="text-xs text-charcoal-500">
                {t.references.methodologyLink} <Link to="/contact" className="text-sage-400 underline hover:text-sage-300">{t.references.methodologyLinkText}</Link>
              </p>
            </div>
          </RevealCard>
        </Container>
      </section>

    </PageLayout>
  );
}

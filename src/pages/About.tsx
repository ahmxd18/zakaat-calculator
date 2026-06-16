/**
 * About.tsx
 * Mission, vision, values, and team placeholder.
 */
import { motion } from "framer-motion";
import { BookOpen, Globe2, Shield, Accessibility } from "lucide-react";
import { ABOUT } from "../constants/content";
import { Card, RevealCard } from "../components/ui/Card";
import { SectionHeader }   from "../components/ui/SectionHeader";
import { Container }       from "../components/layout/Container";
import { PageLayout }      from "../components/layout/PageLayout";

const ValueIcon: Record<string, React.FC<{ className?: string }>> = {
  "book-open":     ({ className }) => <BookOpen     className={className} />,
  "accessibility": ({ className }) => <Accessibility className={className} />,
  "shield":        ({ className }) => <Shield       className={className} />,
  "globe-2":       ({ className }) => <Globe2       className={className} />,
};

export function About() {
  return (
    <PageLayout className="!pt-0">

      {/* ── Hero / Mission ── */}
      <section
        className="relative py-20 sm:py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3a6337 0%, #4a7d47 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "url(/images/hero-pattern.png)",
            backgroundSize: "240px 240px",
            backgroundRepeat: "repeat",
          }}
        />
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/3" />

        <Container narrow className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-sage-300 mb-2">
              Our Purpose
            </span>
            <h1
              className="text-4xl sm:text-6xl font-light text-cream-50 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {ABOUT.heading}
            </h1>
            <p className="text-lg text-sage-200 leading-relaxed max-w-2xl mx-auto">
              {ABOUT.subheading}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <RevealCard>
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100">
                  <span className="text-lg">🌙</span>
                </div>
                <h2
                  className="text-2xl font-light text-charcoal-800"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our Mission
                </h2>
                <p className="text-charcoal-500 leading-relaxed">{ABOUT.mission}</p>
              </div>
            </RevealCard>

            {/* Vision */}
            <RevealCard delay={0.1}>
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blush-100">
                  <span className="text-lg">✨</span>
                </div>
                <h2
                  className="text-2xl font-light text-charcoal-800"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our Vision
                </h2>
                <p className="text-charcoal-500 leading-relaxed">{ABOUT.vision}</p>
              </div>
            </RevealCard>
          </div>
        </Container>
      </section>

      {/* ── Values ── */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <Container>
          <SectionHeader
            eyebrow="What guides us"
            heading="Our Core Values"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ABOUT.values.map((val, i) => {
              const Icon = ValueIcon[val.icon];
              return (
                <RevealCard key={val.title} delay={i * 0.1}>
                  <Card hover padding="lg" className="group flex gap-5 h-full">
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-600 group-hover:bg-sage-600 group-hover:text-cream-50 transition-colors duration-300">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-charcoal-800">{val.title}</h3>
                      <p className="text-sm text-charcoal-500 leading-relaxed">{val.description}</p>
                    </div>
                  </Card>
                </RevealCard>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Team ── */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          {/* Placeholder warning */}
          <div className="mb-8 rounded-xl bg-blush-50 border border-blush-200 p-4">
            <p className="text-xs text-blush-700 leading-relaxed">
              ⚠️ <strong>Placeholder Content:</strong> Team member information below is placeholder content pending real team details. Do not treat these as real individuals.
            </p>
          </div>
          
          <SectionHeader
            eyebrow="The people behind it"
            heading="Meet the Team"
            subheading="A cross-disciplinary group of scholars, developers, and designers united by a shared purpose."
            className="mb-12"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {ABOUT.team.map((member, i) => (
              <RevealCard key={member.name} delay={i * 0.08}>
                <Card hover padding="md" className="text-center space-y-3">
                  {/* Avatar initials */}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600 shadow-md shadow-sage-200">
                    <span className="text-lg font-semibold text-cream-50">{member.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-800 text-sm">{member.name}</p>
                    <p className="text-xs text-charcoal-500 mt-0.5">{member.role}</p>
                  </div>
                </Card>
              </RevealCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Disclaimer strip ── */}
      <section className="py-10 bg-cream-100 border-t border-cream-200">
        <Container narrow>
          <p className="text-xs text-charcoal-400 text-center leading-relaxed">
            ⚠️ This calculator is provided for educational purposes only. All rulings are based on mainstream scholarly positions. For personal Zakaat queries, please consult a qualified Islamic scholar.
          </p>
        </Container>
      </section>

    </PageLayout>
  );
}

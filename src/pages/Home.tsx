/**
 * Home.tsx
 * Landing page — Hero section, intro, feature highlights, statistics, and CTA.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calculator, ShieldCheck, HeartHandshake,
  ArrowRight, Star, ChevronDown
} from "lucide-react";
import { HOME, NAV } from "../constants/content";
import { Button }         from "../components/ui/Button";
import { Card, RevealCard }        from "../components/ui/Card";
import { SectionHeader }  from "../components/ui/SectionHeader";
import { Container }      from "../components/layout/Container";

const FeatureIcon: Record<string, React.FC<{ className?: string }>> = {
  calculator:          ({ className }) => <Calculator       className={className} />,
  "shield-check":      ({ className }) => <ShieldCheck      className={className} />,
  "heart-handshake":   ({ className }) => <HeartHandshake   className={className} />,
};

/** Simple staggered entrance helper */
function HeroItem({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export function Home() {
  return (
    <main className="overflow-hidden">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #f2f7f2 0%, #fdfaf5 40%, #fdf2f4 100%)",
        }}
      >
        {/* Background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "url(/images/hero-pattern.png)",
            backgroundSize: "320px 320px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Decorative ambient blobs */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-sage-200/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, -6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-blush-200/25 blur-3xl"
        />

        <Container className="relative z-10 text-center">
          <div className="mx-auto max-w-4xl flex flex-col items-center gap-6">

            {/* Eyebrow badge */}
            <HeroItem delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 border border-sage-200 px-4 py-1.5 text-xs font-semibold text-sage-600 tracking-wider uppercase">
                <Star className="h-3 w-3 fill-sage-400 text-sage-400" />
                {HOME.hero.eyebrow}
              </span>
            </HeroItem>

            {/* Main heading */}
            <HeroItem delay={0.22}>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] text-charcoal-800"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {HOME.hero.heading.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {i === 1
                      ? <span className="italic text-sage-600">{line}</span>
                      : line
                    }
                  </span>
                ))}
              </h1>
            </HeroItem>

            {/* Subheading */}
            <HeroItem delay={0.36}>
              <p className="max-w-2xl text-base sm:text-lg text-charcoal-500 leading-relaxed">
                {HOME.hero.subheading}
              </p>
            </HeroItem>

            {/* CTAs */}
            <HeroItem delay={0.48}>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link to="/calculate">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    {HOME.hero.cta}
                  </Button>
                </Link>
                <Link to="/faqs">
                  <Button variant="outline" size="lg">
                    {HOME.hero.secondaryCta}
                  </Button>
                </Link>
              </div>
            </HeroItem>

            {/* Qur'anic verse card */}
            <HeroItem delay={0.62}>
              <div className="mt-2 max-w-xl rounded-2xl bg-white/70 backdrop-blur-sm border border-cream-200 px-6 py-5 shadow-sm">
                <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed italic">
                  {HOME.hero.verse}
                </p>
                <p className="mt-2 text-xs font-semibold text-sage-500 uppercase tracking-widest">
                  {HOME.hero.verseRef}
                </p>
              </div>
            </HeroItem>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-4 flex flex-col items-center gap-1 text-charcoal-400"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section className="bg-sage-600 py-10">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {HOME.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="text-3xl sm:text-4xl font-light text-cream-50 mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-sage-200 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          WHAT IS ZAKAAT SECTION
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-cream-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="space-y-6">
              <SectionHeader
                eyebrow="The Third Pillar"
                heading={HOME.intro.heading}
                subheading={HOME.intro.body}
                align="left"
              />
              <RevealCard delay={0.2}>
                <Link to="/calculate">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Start Calculating
                  </Button>
                </Link>
              </RevealCard>
            </div>

            {/* Decorative card */}
            <RevealCard delay={0.1} className="lg:pl-8">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-sage-200 opacity-50"
                  style={{ margin: "-32px" }}
                />
                <div className="relative rounded-3xl bg-gradient-to-br from-sage-50 to-cream-100 border border-sage-100 p-10 text-center space-y-6 shadow-inner">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage-600 shadow-lg shadow-sage-200">
                    <svg viewBox="0 0 64 64" className="h-12 w-12 fill-cream-50">
                      <path d="M32 8C18.7 8 8 18.7 8 32c0 4.2 1.1 8.2 3 11.6C13.5 37.2 17.4 34 22 34c7.7 0 14 6.3 14 14 0 2.5-.7 4.9-1.9 7 .6 0 1.3.1 1.9.1 13.3 0 24-10.7 24-24S45.3 8 32 8z" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <div
                      className="text-3xl font-light text-charcoal-700"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      زَكَاة
                    </div>
                    <p className="text-sm text-charcoal-500">
                      From the Arabic root <em>zakā</em> — meaning{" "}
                      <strong className="text-sage-600">purity, growth, and blessing</strong>
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["2.5% rate", "85g gold Nisaab", "595g silver Nisaab"].map(label => (
                      <span
                        key={label}
                        className="rounded-full bg-sage-100 border border-sage-200 px-3 py-1 text-xs font-medium text-sage-700"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealCard>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Why use our calculator"
            heading="Clarity for a Sacred Obligation"
            subheading="We've combined scholarly research with modern UX to make Zakaat calculation as clear and easy as possible."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HOME.features.map((feat, i) => {
              const Icon = FeatureIcon[feat.icon];
              return (
                <RevealCard key={feat.title} delay={i * 0.12}>
                  <Card hover padding="lg" className="group h-full flex flex-col gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 text-sage-600 group-hover:bg-sage-600 group-hover:text-cream-50 transition-colors duration-300">
                      {Icon && <Icon className="h-7 w-7" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3
                        className="text-xl font-medium text-charcoal-800"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {feat.title}
                      </h3>
                      <p className="text-sm text-charcoal-500 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </Card>
                </RevealCard>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <Container>
          <RevealCard>
            <div
              className="relative rounded-3xl px-8 py-16 sm:px-16 text-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #3a6337 0%, #4a7d47 60%, #629e5e 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: "url(/images/hero-pattern.png)",
                  backgroundSize: "200px 200px",
                  backgroundRepeat: "repeat",
                }}
              />
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2
                  className="text-3xl sm:text-5xl font-light text-cream-50 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ready to calculate your Zakaat?
                </h2>
                <p className="text-sage-200 text-base sm:text-lg leading-relaxed">
                  It takes only a few minutes. Enter your assets, and we'll calculate exactly what you owe.
                </p>
                <Link to="/calculate">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-cream-50 text-sage-700 hover:bg-white shadow-xl"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    {NAV.ctaLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </RevealCard>
        </Container>
      </section>

    </main>
  );
}

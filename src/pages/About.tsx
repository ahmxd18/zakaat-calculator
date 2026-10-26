/**
 * About.tsx
 * Mission, vision, values, scholar review status, and creator profile.
 */
import { motion } from "framer-motion"
import {
  Accessibility,
  BookOpen,
  Code2,
  ExternalLink,
  Globe2,
  Link2,
  MapPin,
  Moon,
  Shield,
  Sparkles,
} from "lucide-react"
import { useT } from "../contexts/i18n"
import { Card, RevealCard } from "../components/ui/Card"
import { SectionHeader } from "../components/ui/SectionHeader"
import { Container } from "../components/layout/Container"
import { PageLayout } from "../components/layout/PageLayout"

const ValueIcon: Record<string, React.FC<{ className?: string }>> = {
  "book-open": ({ className }) => <BookOpen className={className} />,
  accessibility: ({ className }) => <Accessibility className={className} />,
  shield: ({ className }) => <Shield className={className} />,
  "globe-2": ({ className }) => <Globe2 className={className} />,
}

const REVIEWER_PLACEHOLDERS = [
  { name: "Ahmad Rahman", madhab: "hanafi", location: "Hyderabad, India" },
  { name: "Yusuf Siddiq", madhab: "hanafi", location: "Delhi, India" },
  { name: "Ibrahim Faruqi", madhab: "maliki", location: "Rabat, Morocco" },
  { name: "Omar Qureshi", madhab: "maliki", location: "Lagos, Nigeria" },
  { name: "Hamza Idris", madhab: "shafii", location: "Jakarta, Indonesia" },
  { name: "Bilal Hassan", madhab: "shafii", location: "Kuala Lumpur, Malaysia" },
  { name: "Zayd Malik", madhab: "hanbali", location: "Riyadh, Saudi Arabia" },
  { name: "Salman Nadeem", madhab: "hanbali", location: "Jeddah, Saudi Arabia" },
  { name: "Tariq Mahmood", madhab: "independent", location: "London, United Kingdom" },
  { name: "Hasan Kareem", madhab: "independent", location: "Toronto, Canada" },
] as const

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/ahmxd18", Icon: Code2 },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/habeeb-ahmed0shuaib-1b96a3228",
    Icon: Link2,
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

export function About() {
  const t = useT()

  const values = [
    { icon: "book-open", title: t.about.values.scholarly.title, description: t.about.values.scholarly.description },
    { icon: "accessibility", title: t.about.values.accessibility.title, description: t.about.values.accessibility.description },
    { icon: "shield", title: t.about.values.trust.title, description: t.about.values.trust.description },
    { icon: "globe-2", title: t.about.values.global.title, description: t.about.values.global.description },
  ]

  return (
    <PageLayout className="pt-0! -pb-4">
      <section
        className="relative overflow-hidden py-20 sm:py-32"
        style={{ background: "linear-gradient(135deg, #3a6337 0%, #4a7d47 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "url(/images/hero-pattern.jpg)",
            backgroundSize: "240px 240px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/3 rounded-full bg-white/5 blur-3xl" />

        <Container narrow className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-sage-300">
              {t.about.eyebrow}
            </span>
            <h1
              className="text-4xl font-light leading-tight text-cream-50 sm:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.about.heading}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-sage-200">
              {t.about.subheading}
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <RevealCard>
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100">
                  <Moon className="h-5 w-5 text-sage-600" />
                </div>
                <h2
                  className="text-2xl font-light text-charcoal-800"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.about.missionTitle}
                </h2>
                <p className="leading-relaxed text-charcoal-500">{t.about.mission}</p>
              </div>
            </RevealCard>

            <RevealCard delay={0.1}>
              <div className="space-y-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blush-100">
                  <Sparkles className="h-5 w-5 text-blush-500" />
                </div>
                <h2
                  className="text-2xl font-light text-charcoal-800"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.about.visionTitle}
                </h2>
                <p className="leading-relaxed text-charcoal-500">{t.about.vision}</p>
              </div>
            </RevealCard>
          </div>
        </Container>
      </section>

      <section className="bg-cream-50 py-16 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow={t.about.valuesEyebrow}
            heading={t.about.valuesHeading}
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = ValueIcon[value.icon]
              return (
                <RevealCard key={value.title} delay={index * 0.1}>
                  <Card hover padding="lg" className="group flex h-full gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-600 transition-colors duration-300 group-hover:bg-sage-600 group-hover:text-cream-50">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-charcoal-800">{value.title}</h3>
                      <p className="text-sm leading-relaxed text-charcoal-500">{value.description}</p>
                    </div>
                  </Card>
                </RevealCard>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow={t.about.reviewEyebrow}
            heading={t.about.reviewHeading}
            subheading={t.about.reviewSubheading}
            className="mb-10"
          />

          <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <p className="text-sm leading-relaxed text-amber-900">{t.about.reviewNotice}</p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              {REVIEWER_PLACEHOLDERS.map((reviewer, index) => (
                <RevealCard key={reviewer.name} delay={(index % 4) * 0.05}>
                  <Card padding="md" className="h-full">
                    <div className="flex items-start gap-3">
                      <div
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sage-300 to-sage-600 text-sm font-semibold text-white"
                      >
                        {getInitials(reviewer.name)}
                      </div>
                      <div className="min-w-0 space-y-1">
                        <p className="font-semibold text-charcoal-800">{reviewer.name}</p>
                        <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                          {t.about.sampleProfile}
                        </span>
                      </div>
                    </div>
                    <dl className="mt-4 space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <dt className="text-charcoal-400">{t.about.jurisprudence}</dt>
                        <dd className="text-end font-medium text-charcoal-600">
                          {t.about.schools[reviewer.madhab]}
                        </dd>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <dt className="flex items-center gap-1 text-charcoal-400">
                          <MapPin className="h-3.5 w-3.5" />
                          {t.about.location}
                        </dt>
                        <dd className="text-end font-medium text-charcoal-600">
                          {reviewer.location}
                        </dd>
                      </div>
                    </dl>
                  </Card>
                </RevealCard>
              ))}
            </div>

            <RevealCard delay={0.1}>
              <Card padding="none" className="overflow-hidden">
                <div className="bg-sage-700 p-4 text-center">
                  <img
                    loading="lazy"
                    src="/images/my-portrait.jpeg"
                    alt="Portrait of Habeeb Ahmed Shuaib"
                    className="rounded-3xl object-cover shadow-lg"
                  />
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">
                      {t.about.creatorLabel}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-charcoal-800">
                      {t.about.creatorName}
                    </h3>
                    <p className="mt-1 text-sm text-charcoal-500">{t.about.creatorRole}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-charcoal-400">
                      <MapPin className="h-3.5 w-3.5" />
                      Hyderabad, India
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-charcoal-600">
                    {t.about.creatorBio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {t.about.creatorSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium text-charcoal-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-cream-100 pt-4">
                    {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-cream-200 px-3 py-2 text-xs font-medium text-charcoal-600 transition-colors hover:border-sage-300 hover:text-sage-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                        <ExternalLink aria-hidden="true" className="h-3 w-3 text-charcoal-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </RevealCard>
          </div>
        </Container>
      </section>

      {/* TODO: remove after review of scholars */}
      <section className="border-t border-cream-200 bg-cream-100 py-10">
        <Container narrow>
          <p className="text-center text-xs leading-relaxed text-charcoal-500">
            {t.about.disclaimerWarning}
          </p>
        </Container>
      </section>
    </PageLayout>
  )
}

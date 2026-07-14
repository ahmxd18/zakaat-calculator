/**
 * Contact.tsx
 * Contact form UI — non-functional placeholder, full visual design.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle2, Info } from "lucide-react";
import { useT } from "../contexts/i18n";
import { INVARIANT_CONSTANTS } from "../constants/invariants";
import { Button }        from "../components/ui/Button";
import { Card, RevealCard }        from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Container }     from "../components/layout/Container";
import { PageLayout }    from "../components/layout/PageLayout";

const ContactInfoIcon: Record<string, React.FC<{ className?: string }>> = {
  mail:    ({ className }) => <Mail    className={className} />,
  "map-pin": ({ className }) => <MapPin  className={className} />,
  clock:   ({ className }) => <Clock   className={className} />,
};

export function Contact() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);
  const [formDisabled] = useState(true); // No backend yet
  
  const contactInfo = [
    { icon: "mail", label: t.contact.info.email, value: INVARIANT_CONSTANTS.contact.email },
    { icon: "map-pin", label: t.contact.info.location, value: INVARIANT_CONSTANTS.contact.location },
    { icon: "clock", label: t.contact.info.response, value: INVARIANT_CONSTANTS.contact.responseTime },
  ];
  
  const subjectOptions = [
    t.contact.form.subjectOptions.general,
    t.contact.form.subjectOptions.calculation,
    t.contact.form.subjectOptions.scholarly,
    t.contact.form.subjectOptions.technical,
    t.contact.form.subjectOptions.partnership,
    t.contact.form.subjectOptions.other,
  ];

  // Placeholder submit handler — disabled until backend ready
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submission disabled - no backend
  };

  return (
    <PageLayout>

      {/* ── Page header ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-cream-200">
        <Container className="text-center">
          <SectionHeader
            eyebrow={t.contact.eyebrow}
            heading={t.contact.heading}
            subheading={t.contact.subheading}
          />
        </Container>
      </section>

      {/* ── Content grid ── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Contact info sidebar ── */}
            <div className="space-y-5">
              <RevealCard>
                <h3
                  className="text-xl font-medium text-charcoal-800 mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.contact.contactInfoTitle}
                </h3>
                <div className="space-y-5">
                  {contactInfo.map((item, i) => {
                    const Icon = ContactInfoIcon[item.icon];
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="flex items-start gap-3.5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
                          {Icon && <Icon className="h-4.5 w-4.5" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                            {item.label}
                          </p>
                          <p className="text-sm font-medium text-charcoal-800 mt-0.5">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </RevealCard>

              {/* Scholarly queries note */}
              <RevealCard delay={0.1}>
                <Card padding="md" className="bg-sage-50 border-sage-200 space-y-2">
                  <p className="text-sm font-semibold text-sage-700">{t.contact.scholarlyNote}</p>
                  <p className="text-xs text-sage-600 leading-relaxed">
                    {t.contact.scholarlyNoteText}
                  </p>
                </Card>
              </RevealCard>
            </div>

            {/* ── Contact form ── */}
            <div className="lg:col-span-2">
              <RevealCard delay={0.15}>
                <Card padding="lg">
                  <div className="mb-6 rounded-xl bg-blush-50 border border-blush-200 p-4 flex items-start gap-3">
                    <Info className="h-5 w-5 text-blush-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blush-700">{t.contact.form.formComingSoonTitle}</p>
                      <p className="text-xs text-blush-600 mt-0.5">
                        {t.contact.form.formComingSoonText} {INVARIANT_CONSTANTS.contact.email}
                      </p>
                    </div>
                  </div>
                  
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                    >
                      <CheckCircle2 className="h-14 w-14 text-sage-500" />
                      <h3
                        className="text-2xl font-light text-charcoal-800"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Message sent!
                      </h3>
                      <p className="text-charcoal-500 text-sm max-w-sm">
                        Thank you for reaching out. We aim to respond within 2–3 business days.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-charcoal-700" htmlFor="name">
                            {t.contact.form.nameLabel} <span className="text-blush-400">{t.contact.form.required}</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            placeholder={t.contact.form.namePlaceholder}
                            className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-charcoal-700" htmlFor="email">
                            {t.contact.form.emailLabel} <span className="text-blush-400">{t.contact.form.required}</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder={t.contact.form.emailPlaceholder}
                            className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-charcoal-700" htmlFor="subject">
                          {t.contact.form.subjectLabel}
                        </label>
                        <select
                          id="subject"
                          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all"
                        >
                          <option value="" disabled>{t.contact.form.subjectPlaceholder}</option>
                          {subjectOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-charcoal-700" htmlFor="message">
                          {t.contact.form.messageLabel} <span className="text-blush-400">{t.contact.form.required}</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          placeholder={t.contact.form.messagePlaceholder}
                          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={formDisabled}
                        rightIcon={<Send className="h-4 w-4" />}
                      >
                        {t.contact.form.submitLabel}
                      </Button>

                      <p className="text-xs text-charcoal-400 text-center">
                        {t.contact.form.disabledNotice}
                      </p>
                    </form>
                  )}
                </Card>
              </RevealCard>
            </div>
          </div>
        </Container>
      </section>

    </PageLayout>
  );
}

/**
 * Contact.tsx
 * Contact form UI — non-functional placeholder, full visual design.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { CONTACT } from "../constants/content";
import { Button }        from "../components/ui/Button";
import { Card, RevealCard }        from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Container }     from "../components/layout/Container";

const ContactInfoIcon: Record<string, React.FC<{ className?: string }>> = {
  mail:    ({ className }) => <Mail    className={className} />,
  "map-pin": ({ className }) => <MapPin  className={className} />,
  clock:   ({ className }) => <Clock   className={className} />,
};

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // Placeholder submit handler — no actual logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up form submission (Phase 2)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen bg-cream-50 pt-20 pb-20">

      {/* ── Page header ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-cream-200">
        <Container className="text-center">
          <SectionHeader
            eyebrow="Get in Touch"
            heading={CONTACT.heading}
            subheading={CONTACT.subheading}
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
                  Contact Information
                </h3>
                <div className="space-y-5">
                  {CONTACT.info.map((item, i) => {
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
                  <p className="text-sm font-semibold text-sage-700">🕌 Scholarly Queries</p>
                  <p className="text-xs text-sage-600 leading-relaxed">
                    For detailed Fiqh questions or corrections to our methodology, please mention "Scholarly Query" in the subject field and we'll route your message to our Fiqh committee.
                  </p>
                </Card>
              </RevealCard>
            </div>

            {/* ── Contact form ── */}
            <div className="lg:col-span-2">
              <RevealCard delay={0.15}>
                <Card padding="lg">
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
                            Full Name <span className="text-blush-400">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            placeholder={CONTACT.form.namePlaceholder}
                            className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-charcoal-700" htmlFor="email">
                            Email Address <span className="text-blush-400">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder={CONTACT.form.emailPlaceholder}
                            className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-charcoal-700" htmlFor="subject">
                          Subject
                        </label>
                        <select
                          id="subject"
                          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all"
                        >
                          <option value="" disabled>Select a subject…</option>
                          {CONTACT.form.subjectOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-charcoal-700" htmlFor="message">
                          Message <span className="text-blush-400">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          placeholder={CONTACT.form.messagePlaceholder}
                          className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        rightIcon={<Send className="h-4 w-4" />}
                      >
                        {CONTACT.form.submitLabel}
                      </Button>

                      <p className="text-xs text-charcoal-400 text-center">
                        By submitting this form, you agree to our privacy policy. We never share your data.
                      </p>
                    </form>
                  )}
                </Card>
              </RevealCard>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}

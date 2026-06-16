/**
 * Calculate.tsx
 * Zakaat calculation form — shell/layout only.
 * No calculation logic at this stage. Fields and structure are placeholder.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Info, ChevronDown, RefreshCw, Calculator } from "lucide-react";
import { CALCULATE } from "../constants/content";
import { Button }        from "../components/ui/Button";
import { Card }          from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Container }     from "../components/layout/Container";
import { RevealCard }    from "../components/ui/Card";

/** Individual number input field */
function AssetField({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal-700"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 text-sm select-none">
          £
        </span>
        <input
          id={id}
          type="number"
          min="0"
          step="0.01"
          placeholder={placeholder}
          className="w-full rounded-xl border border-cream-300 bg-white pl-8 pr-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-shadow"
        />
      </div>
    </div>
  );
}

/** Collapsible section panel */
function AssetSection({
  section,
  index,
}: {
  section: (typeof CALCULATE.sections)[number];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0); // first section open by default

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Card padding="none" className="overflow-hidden">
        {/* Section header toggle */}
        <button
          onClick={() => setOpen(prev => !prev)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-cream-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-inset"
          aria-expanded={open}
        >
          <div>
            <h3 className="text-base font-semibold text-charcoal-800">{section.label}</h3>
            <p className="text-xs text-charcoal-500 mt-0.5">{section.description}</p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 text-charcoal-400"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </button>

        {/* Animated field area */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          style={{ overflow: "hidden" }}
        >
          <div className="px-6 pb-6 pt-0">
            <div className="h-px bg-cream-200 mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.fields.map(field => (
                <AssetField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export function Calculate() {
  const [currency, setCurrency] = useState("GBP");

  return (
    <main className="min-h-screen bg-cream-50 pt-20 pb-20">
      <Container>
        {/* ── Page header ── */}
        <div className="py-12 sm:py-16 text-center">
          <SectionHeader
            eyebrow="Zakaat Calculator"
            heading={CALCULATE.heading}
            subheading={CALCULATE.subheading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main form ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Currency selector */}
            <RevealCard>
              <Card padding="md" className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-semibold text-charcoal-700">{CALCULATE.currencyLabel}</p>
                  <p className="text-xs text-charcoal-500">All values in selected currency</p>
                </div>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-400"
                  aria-label="Select currency"
                >
                  {["GBP", "USD", "EUR", "AED", "SAR", "PKR", "BDT", "MYR"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Card>
            </RevealCard>

            {/* Asset sections */}
            {CALCULATE.sections.map((section, i) => (
              <AssetSection key={section.id} section={section} index={i} />
            ))}

            {/* Nisaab info note */}
            <RevealCard delay={0.1}>
              <div className="flex items-start gap-3 rounded-2xl bg-sage-50 border border-sage-200 p-4">
                <Info className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                <p className="text-xs text-sage-700 leading-relaxed">{CALCULATE.nisaabNote}</p>
              </div>
            </RevealCard>

            {/* Action buttons */}
            <RevealCard delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<Calculator className="h-5 w-5" />}
                  type="button"
                >
                  {CALCULATE.calculateBtn}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  leftIcon={<RefreshCw className="h-4 w-4" />}
                  type="reset"
                >
                  {CALCULATE.resetBtn}
                </Button>
              </div>
            </RevealCard>
          </div>

          {/* ── Sidebar summary ── */}
          <div className="space-y-5">
            <RevealCard delay={0.2} className="sticky top-24">
              <Card padding="lg" className="space-y-6">
                <div>
                  <h3
                    className="text-xl font-medium text-charcoal-800"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Your Zakaat Summary
                  </h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Calculated in real-time as you fill in the form
                  </p>
                </div>

                {/* Placeholder summary rows */}
                <div className="space-y-3">
                  {[
                    { label: "Total Assets",      value: "—" },
                    { label: "Total Deductions",  value: "—" },
                    { label: "Net Zakatable Wealth", value: "—" },
                    { label: "Nisaab Threshold",  value: "—" },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between py-2 border-b border-cream-100">
                      <span className="text-sm text-charcoal-500">{row.label}</span>
                      <span className="text-sm font-medium text-charcoal-700">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Zakaat due highlight */}
                <div className="rounded-2xl bg-sage-600 px-5 py-5 text-center space-y-1">
                  <p className="text-xs text-sage-200 uppercase tracking-widest font-medium">
                    Zakaat Due
                  </p>
                  <p
                    className="text-4xl font-light text-cream-50"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    £0.00
                  </p>
                  <p className="text-xs text-sage-300">
                    Fill in your assets to calculate
                  </p>
                </div>

                <Button variant="outline" size="sm" fullWidth>
                  Pay Zakaat Now →
                </Button>

                {/* Disclaimer */}
                <p className="text-[10px] text-charcoal-400 leading-relaxed text-center">
                  This is an estimate. Consult a qualified Islamic scholar for specific rulings.
                </p>
              </Card>
            </RevealCard>
          </div>
        </div>
      </Container>
    </main>
  );
}

/**
 * Calculate.tsx
 * Zakaat calculation form with live calculation engine and i18n support.
 */

// TODO: use the following API to get Country code like IN, US and then map the currency accordingly.
// https://api.country.is/  -> doesn't return currency
// https://geoapi.info/api/geo  -> returns currency


import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Info, ChevronDown, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { SectionHeader } from "../components/ui/SectionHeader"
import { Container } from "../components/layout/Container"
import { RevealCard } from "../components/ui/Card"
import { PageLayout } from "../components/layout/PageLayout"
import { getCurrencySymbol } from "../utils/currency"
import {
  calculateZakaat,
  type AssetValues,
  type NisaabPrices,
} from "../utils/zakaat"
import { useT, useTranslation } from "../contexts/i18n"
import { INVARIANT_CONSTANTS } from "../constants/invariants"
import { cn } from "../utils/cn"

/** Individual number input field */
function AssetField({
  id,
  label,
  placeholder,
  currencySymbol,
  value,
  onChange,
  direction,
}: {
  id: string
  label: string
  placeholder: string
  currencySymbol: string
  value: number
  onChange: (value: number) => void
  direction: "ltr" | "rtl"
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal-700"
      >
        {label}
      </label>
      <div className="relative">
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-charcoal-400 text-sm select-none",
            direction === "rtl" ? "end-3.5" : "start-3.5",
          )}
        >
          {currencySymbol}
        </span>
        <input
          id={id}
          type="number"
          min="0"
          step="0.01"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={cn(
            "w-full rounded-xl border border-cream-300 bg-white py-3 text-sm text-charcoal-800 placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-shadow",
            direction === "rtl" ? "pe-8 ps-4" : "ps-8 pe-4",
          )}
        />
      </div>
    </div>
  )
}

/** Collapsible section panel */
function AssetSection({
  label,
  description,
  fields,
  index,
  currencySymbol,
  values,
  onChange,
  direction,
}: {
  label: string
  description: string
  fields: Array<{ id: string; label: string; placeholder: string }>
  index: number
  currencySymbol: string
  values: Record<string, number>
  onChange: (id: string, value: number) => void
  direction: "ltr" | "rtl"
}) {
  const [open, setOpen] = useState(index === 0) // first section open by default

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
          onClick={() => setOpen((prev) => !prev)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start hover:bg-cream-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-inset"
          aria-expanded={open}
        >
          <div>
            <h3 className="text-base font-semibold text-charcoal-800">
              {label}
            </h3>
            <p className="text-xs text-charcoal-500 mt-0.5">{description}</p>
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
              {fields.map((field) => (
                <AssetField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  currencySymbol={currencySymbol}
                  value={values[field.id] || 0}
                  onChange={(val) => onChange(field.id, val)}
                  direction={direction}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

const STORAGE_KEY = "zakaat_calculator_data"

function getInitialValues(): AssetValues {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {}

  return {
    cash_on_hand: 0,
    bank_savings: 0,
    foreign_cash: 0,
    gold_grams: 0,
    silver_grams: 0,
    stocks: 0,
    crypto: 0,
    pension: 0,
    stock_inventory: 0,
    receivables: 0,
    debts_owed: 0,
    bills_due: 0,
  }
}

export function Calculate() {
  const t = useT()
  const { direction } = useTranslation()
  const [currency, setCurrency] = useState("GBP")
  const [values, setValues] = useState<AssetValues>(getInitialValues)

  // Default Nisaab prices (user can override these in a real implementation)
  const [nisaabPrices] = useState<NisaabPrices>({
    goldPricePerGram: 50, // Example: £50/gram
    silverPricePerGram: 0.6, // Example: £0.60/gram
  })

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
    } catch {}
  }, [values])

  // Calculate Zakaat in real-time
  const result = useMemo(
    () => calculateZakaat(values, nisaabPrices),
    [values, nisaabPrices],
  )

  const currencySymbol = getCurrencySymbol(currency)

  const handleFieldChange = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleReset = () => {
    setValues(getInitialValues())
    localStorage.removeItem(STORAGE_KEY)
  }

  const formatCurrency = (amount: number) =>
    `${currencySymbol}${amount.toFixed(2)}`

  return (
    <PageLayout>
      <Container>
        {/* ── Page header ── */}
        <div className="py-12 sm:py-16 text-center">
          <SectionHeader
            eyebrow={t.calculate.heading}
            heading={t.calculate.heading}
            subheading={t.calculate.subheading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main form ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Currency selector */}
            <RevealCard>
              <Card
                padding="md"
                className="flex items-center justify-between gap-4 flex-wrap"
              >
                <div>
                  <p className="text-sm font-semibold text-charcoal-700">
                    {t.calculate.currencyLabel}
                  </p>
                  <p className="text-xs text-charcoal-500">
                    {t.calculate.currencyNote}
                  </p>
                </div>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-400"
                  aria-label={t.calculate.currencyLabel}
                >
                  {INVARIANT_CONSTANTS.currencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Card>
            </RevealCard>

            {/* Asset sections */}
            <AssetSection
              label={t.calculate.sections.cash.label}
              description={t.calculate.sections.cash.description}
              fields={[
                {
                  id: "cash_on_hand",
                  label: t.calculate.sections.cash.fields.cashOnHand,
                  placeholder: t.calculate.placeholders.amount,
                },
                {
                  id: "bank_savings",
                  label: t.calculate.sections.cash.fields.bankSavings,
                  placeholder: t.calculate.placeholders.amount,
                },
                {
                  id: "foreign_cash",
                  label: t.calculate.sections.cash.fields.foreignCash,
                  placeholder: t.calculate.placeholders.amount,
                },
              ]}
              index={0}
              currencySymbol={currencySymbol}
              values={values}
              onChange={handleFieldChange}
              direction={direction}
            />

            <AssetSection
              label={t.calculate.sections.goldSilver.label}
              description={t.calculate.sections.goldSilver.description}
              fields={[
                {
                  id: "gold_grams",
                  label: t.calculate.sections.goldSilver.fields.goldGrams,
                  placeholder: t.calculate.placeholders.grams,
                },
                {
                  id: "silver_grams",
                  label: t.calculate.sections.goldSilver.fields.silverGrams,
                  placeholder: t.calculate.placeholders.grams,
                },
              ]}
              index={1}
              currencySymbol={currencySymbol}
              values={values}
              onChange={handleFieldChange}
              direction={direction}
            />

            <AssetSection
              label={t.calculate.sections.investments.label}
              description={t.calculate.sections.investments.description}
              fields={[
                {
                  id: "stocks",
                  label: t.calculate.sections.investments.fields.stocks,
                  placeholder: t.calculate.placeholders.amount,
                },
                {
                  id: "crypto",
                  label: t.calculate.sections.investments.fields.crypto,
                  placeholder: t.calculate.placeholders.amount,
                },
                {
                  id: "pension",
                  label: t.calculate.sections.investments.fields.pension,
                  placeholder: t.calculate.placeholders.amount,
                },
              ]}
              index={2}
              currencySymbol={currencySymbol}
              values={values}
              onChange={handleFieldChange}
              direction={direction}
            />

            <AssetSection
              label={t.calculate.sections.business.label}
              description={t.calculate.sections.business.description}
              fields={[
                {
                  id: "stock_inventory",
                  label: t.calculate.sections.business.fields.stockInventory,
                  placeholder: t.calculate.placeholders.amount,
                },
                {
                  id: "receivables",
                  label: t.calculate.sections.business.fields.receivables,
                  placeholder: t.calculate.placeholders.amount,
                },
              ]}
              index={3}
              currencySymbol={currencySymbol}
              values={values}
              onChange={handleFieldChange}
              direction={direction}
            />

            <AssetSection
              label={t.calculate.sections.deductions.label}
              description={t.calculate.sections.deductions.description}
              fields={[
                {
                  id: "debts_owed",
                  label: t.calculate.sections.deductions.fields.debtsOwed,
                  placeholder: t.calculate.placeholders.amount,
                },
                {
                  id: "bills_due",
                  label: t.calculate.sections.deductions.fields.billsDue,
                  placeholder: t.calculate.placeholders.amount,
                },
              ]}
              index={4}
              currencySymbol={currencySymbol}
              values={values}
              onChange={handleFieldChange}
              direction={direction}
            />

            {/* Nisaab info note */}
            <RevealCard delay={0.1}>
              <div className="flex items-start gap-3 rounded-2xl bg-sage-50 border border-sage-200 p-4">
                <Info className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                <p className="text-xs text-sage-700 leading-relaxed">
                  {t.calculate.nisaabNote}
                </p>
              </div>
            </RevealCard>

            {/* Action buttons */}
            <RevealCard delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="lg"
                  leftIcon={<RefreshCw className="h-4 w-4" />}
                  onClick={handleReset}
                  type="button"
                >
                  {t.calculate.resetBtn}
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
                    {t.calculate.summary.title}
                  </h3>
                  <p className="text-xs text-charcoal-500 mt-1">
                    {t.calculate.summary.subtitle}
                  </p>
                </div>

                {/* Live summary rows */}
                <div className="space-y-3">
                  {[
                    {
                      label: t.calculate.summary.totalAssets,
                      value: formatCurrency(result.totalAssets),
                    },
                    {
                      label: t.calculate.summary.totalDeductions,
                      value: formatCurrency(result.totalDeductions),
                    },
                    {
                      label: t.calculate.summary.netWealth,
                      value: formatCurrency(result.netZakaatableWealth),
                    },
                    {
                      label: t.calculate.summary.nisaabThreshold,
                      value: formatCurrency(result.nisaabThreshold),
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between py-2 border-b border-cream-100"
                    >
                      <span className="text-sm text-charcoal-500">
                        {row.label}
                      </span>
                      <span className="text-sm font-medium text-charcoal-700">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Zakaat due highlight */}
                <div className="rounded-2xl bg-sage-600 px-5 py-5 text-center space-y-1">
                  <p className="text-xs text-sage-200 uppercase tracking-widest font-medium">
                    {t.calculate.summary.zakaatDue}
                  </p>
                  <p
                    className="text-4xl font-light text-cream-50"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {formatCurrency(result.zakaatDue)}
                  </p>
                  <p className="text-xs text-sage-300">
                    {result.isBelowNisaab
                      ? t.calculate.summary.belowNisaab
                      : t.calculate.summary.zakaatRate}
                  </p>
                </div>

                <Button variant="outline" size="sm" fullWidth>
                  {t.calculate.summary.payNowBtn}
                </Button>

                {/* Disclaimer */}
                <p className="text-[10px] text-charcoal-400 leading-relaxed text-center">
                  {t.calculate.summary.disclaimer}
                </p>
              </Card>
            </RevealCard>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}

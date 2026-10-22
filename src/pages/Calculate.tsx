/**
 * Calculate.tsx
 * Zakaat calculation page — orchestrates sub-components.
 * Heavy UI logic lives in src/components/calculate/.
 *
 * FUTURE: dynamic currency detection via https://geoapi.info/api/geo
 * (returns currency for user's IP). Feasible once a backend proxy is added
 * to avoid exposing API keys in the browser bundle.
 */

import { useState, useEffect, useMemo } from "react"
import { Banknote, Coins, TrendingUp, Store, Minus, Info, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { SectionHeader } from "../components/ui/SectionHeader"
import { Container } from "../components/layout/Container"
import { RevealCard } from "../components/ui/Card"
import { PageLayout } from "../components/layout/PageLayout"
import { getCurrencySymbol } from "../utils/currency"
import { calculateZakaat, type AssetValues, type NisaabStandard } from "../utils/zakaat"
import { useT, useTranslation } from "../contexts/i18n"
import { INVARIANT_CONSTANTS } from "../constants/invariants"
import { useMetalPrices } from "../hooks/useMetalPrices"
import {
  AssetSection,
  LivePricesPanel,
  NisaabStandardToggle,
  ZakaatSummary,
} from "../components/calculate"

// ── Persistence keys ────────────────────────────────────────────────────────
const STORAGE_KEY = "zakaat_calculator_data"
const STANDARD_KEY = "zakaat_nisaab_standard"

// ── Initial state helpers ────────────────────────────────────────────────────
function getInitialValues(): AssetValues {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as AssetValues
  } catch {}
  return {
    cash_on_hand: 0, bank_savings: 0, foreign_cash: 0,
    gold_grams: 0, silver_grams: 0,
    stocks: 0, crypto: 0, pension: 0,
    stock_inventory: 0, receivables: 0,
    debts_owed: 0, bills_due: 0,
  }
}

function getInitialStandard(): NisaabStandard {
  try {
    const s = localStorage.getItem(STANDARD_KEY)
    if (s === "gold" || s === "silver" || s === "lower") return s
  } catch {}
  return "lower"
}

// ── Page component ───────────────────────────────────────────────────────────
export function Calculate() {
  const t = useT()
  const { direction } = useTranslation()

  const [currency, setCurrency] = useState("GBP")
  const [values, setValues] = useState<AssetValues>(getInitialValues)
  const [nisaabStandard, setNisaabStandard] = useState<NisaabStandard>(getInitialStandard)

  const { prices: nisaabPrices, status: priceStatus, lastUpdated, refresh: refreshPrices } =
    useMetalPrices(currency)

  // Persist form values
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)) } catch {}
  }, [values])

  // Persist standard choice
  useEffect(() => {
    try { localStorage.setItem(STANDARD_KEY, nisaabStandard) } catch {}
  }, [nisaabStandard])

  const result = useMemo(
    () => calculateZakaat(values, nisaabPrices, nisaabStandard),
    [values, nisaabPrices, nisaabStandard],
  )

  const currencySymbol = getCurrencySymbol(currency)
  const formatCurrency = (amount: number) => `${currencySymbol}${amount.toFixed(2)}`

  const handleFieldChange = (id: string, value: number) =>
    setValues((prev) => ({ ...prev, [id]: value }))

  const handleReset = () => {
    setValues(getInitialValues())
    localStorage.removeItem(STORAGE_KEY)
  }

  // ── Asset section definitions (icons decoupled from locale strings) ─────
  const sections = [
    {
      icon: Banknote,
      label: t.calculate.sections.cash.label,
      description: t.calculate.sections.cash.description,
      fields: [
        { id: "cash_on_hand", label: t.calculate.sections.cash.fields.cashOnHand,   placeholder: t.calculate.placeholders.amount },
        { id: "bank_savings", label: t.calculate.sections.cash.fields.bankSavings,  placeholder: t.calculate.placeholders.amount },
        { id: "foreign_cash", label: t.calculate.sections.cash.fields.foreignCash,  placeholder: t.calculate.placeholders.amount },
      ],
    },
    {
      icon: Coins,
      label: t.calculate.sections.goldSilver.label,
      description: t.calculate.sections.goldSilver.description,
      fields: [
        { id: "gold_grams",   label: t.calculate.sections.goldSilver.fields.goldGrams,   placeholder: t.calculate.placeholders.grams },
        { id: "silver_grams", label: t.calculate.sections.goldSilver.fields.silverGrams, placeholder: t.calculate.placeholders.grams },
      ],
    },
    {
      icon: TrendingUp,
      label: t.calculate.sections.investments.label,
      description: t.calculate.sections.investments.description,
      fields: [
        { id: "stocks",  label: t.calculate.sections.investments.fields.stocks,  placeholder: t.calculate.placeholders.amount },
        { id: "crypto",  label: t.calculate.sections.investments.fields.crypto,  placeholder: t.calculate.placeholders.amount },
        { id: "pension", label: t.calculate.sections.investments.fields.pension, placeholder: t.calculate.placeholders.amount },
      ],
    },
    {
      icon: Store,
      label: t.calculate.sections.business.label,
      description: t.calculate.sections.business.description,
      fields: [
        { id: "stock_inventory", label: t.calculate.sections.business.fields.stockInventory, placeholder: t.calculate.placeholders.amount },
        { id: "receivables",     label: t.calculate.sections.business.fields.receivables,     placeholder: t.calculate.placeholders.amount },
      ],
    },
    {
      icon: Minus,
      label: t.calculate.sections.deductions.label,
      description: t.calculate.sections.deductions.description,
      fields: [
        { id: "debts_owed", label: t.calculate.sections.deductions.fields.debtsOwed, placeholder: t.calculate.placeholders.amount },
        { id: "bills_due",  label: t.calculate.sections.deductions.fields.billsDue,  placeholder: t.calculate.placeholders.amount },
      ],
    },
  ]

  return (
    <PageLayout>
      <Container>
        {/* Page header */}
        <div className="py-12 sm:py-16 text-center">
          <SectionHeader
            eyebrow={t.calculate.heading}
            heading={t.calculate.heading}
            subheading={t.calculate.subheading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main form column ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Currency selector */}
            <RevealCard>
              <Card padding="md" className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-semibold text-charcoal-700">{t.calculate.currencyLabel}</p>
                  <p className="text-xs text-charcoal-500">{t.calculate.currencyNote}</p>
                </div>
                {/*
                  TODO (future): show flag/currency icon per option.
                  Options: flagcdn.com img tags, country-flag-emoji npm package,
                  or a custom CurrencySelect component using a headless combobox.
                  Blocked on choosing a flag source that covers all 10 currencies
                  without a large bundle overhead.
                */}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-400"
                  aria-label={t.calculate.currencyLabel}
                >
                  {INVARIANT_CONSTANTS.currencies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Card>
            </RevealCard>

            {/* Live Nisaab prices */}
            <LivePricesPanel
              prices={nisaabPrices}
              status={priceStatus}
              lastUpdated={lastUpdated}
              currencySymbol={currencySymbol}
              onRefresh={refreshPrices}
              labels={t.calculate.prices}
            />

            {/* Nisaab standard toggle */}
            <NisaabStandardToggle
              value={nisaabStandard}
              onChange={setNisaabStandard}
              labels={t.calculate.nisaabStandard}
            />

            {/* Asset sections */}
            {sections.map((section, i) => (
              <AssetSection
                key={section.label}
                icon={section.icon}
                label={section.label}
                description={section.description}
                fields={section.fields}
                index={i}
                currencySymbol={currencySymbol}
                values={values}
                onChange={handleFieldChange}
                direction={direction}
              />
            ))}

            {/* Nisaab info note */}
            <RevealCard delay={0.1}>
              <div className="flex items-start gap-3 rounded-2xl bg-sage-50 border border-sage-200 p-4">
                <Info className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                <p className="text-xs text-sage-700 leading-relaxed">{t.calculate.nisaabNote}</p>
              </div>
            </RevealCard>

            {/* Reset button */}
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

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            <ZakaatSummary
              result={result}
              formatCurrency={formatCurrency}
              labels={t.calculate.summary}
            />
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}

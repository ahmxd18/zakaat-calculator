/**
 * ZakaatSummary.tsx
 * Sticky sidebar card showing live Zakaat calculation results.
 */
import { Card } from "../ui/Card"
import { RevealCard } from "../ui/Card"
import type { ZakaatResult } from "../../utils/zakaat"

export interface ZakaatSummaryProps {
  result: ZakaatResult | null
  unavailable: string
  estimate: string
  formatCurrency: (amount: number) => string
  labels: {
    title: string
    subtitle: string
    totalAssets: string
    totalDeductions: string
    deductionsNotApplied: string
    netWealth: string
    nisaabThreshold: string
    hawl: string
    hawlIncomplete: string
    hawlInvalid: string
    hawlReset: string
    hawlComplete: string
    zakaatDue: string
    belowNisaab: string
    zakaatRate: string
    payNowBtn: string
    disclaimer: string
  }
}

export function ZakaatSummary({ result, formatCurrency, labels, unavailable, estimate }: ZakaatSummaryProps) {
  if (!result) return <Card padding="lg"><p role="status">{unavailable}</p></Card>
  const rows = [
    { label: labels.totalAssets,      value: formatCurrency(result.totalAssets) },
    { label: labels.totalDeductions, value: formatCurrency(result.deductionsApplied) },
    { label: labels.netWealth,        value: formatCurrency(result.netZakaatableWealth) },
    { label: labels.nisaabThreshold,  value: formatCurrency(result.nisaabThreshold) },
    ...(result.hawlStatus === "not-required"
      ? []
      : [{
          label: labels.hawl,
          value: result.hawlStatus === "complete"
            ? labels.hawlComplete
            : result.hawlStatus === "reset"
              ? labels.hawlReset
              : result.hawlStatus === "invalid"
                ? labels.hawlInvalid
                : labels.hawlIncomplete,
        }]),
  ]

  return (
    <RevealCard delay={0.2} className="sticky top-24">
      <Card padding="lg" className="space-y-6">
        <div>
          <h3
            className="text-xl font-medium text-charcoal-800"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {labels.title}
          </h3>
          <p className="text-xs text-charcoal-500 mt-1">{labels.subtitle}</p>
        </div>
        {/* Summary rows */}
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-2 border-b border-cream-100"
            >
              <span className="text-sm text-charcoal-500">{row.label}</span>
              <span className="text-sm font-medium text-charcoal-700">{row.value}</span>
            </div>
          ))}
        </div>
        {result.totalDeductions > result.deductionsApplied && (
          <p className="text-xs leading-relaxed text-charcoal-500">
            {labels.deductionsNotApplied}
          </p>
        )}

        {/* Zakaat due highlight */}
        <div className="rounded-2xl bg-sage-600 px-5 py-5 text-center space-y-1">
          <p className="text-xs text-sage-200 uppercase tracking-widest font-medium">
            {labels.zakaatDue}
          </p>
          <p
            className="text-4xl font-light text-cream-50"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatCurrency(result.zakaatDue)}
          </p>
          <p className="text-xs text-sage-300">
            {result.isBelowNisaab
              ? labels.belowNisaab
              : result.hawlStatus === "incomplete"
                ? labels.hawlIncomplete
                : result.hawlStatus === "reset"
                  ? labels.hawlReset
                  : result.hawlStatus === "invalid"
                    ? labels.hawlInvalid
                    : labels.zakaatRate}
          </p>
        </div>

        <p className="text-xs text-charcoal-600">{estimate}</p>

        <p className="text-[10px] text-charcoal-400 leading-relaxed text-center">
          {labels.disclaimer}
        </p>
      </Card>
    </RevealCard>
  )
}

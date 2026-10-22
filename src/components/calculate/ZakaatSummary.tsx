/**
 * ZakaatSummary.tsx
 * Sticky sidebar card showing live Zakaat calculation results.
 */
import { Card } from "../ui/Card"
import { RevealCard } from "../ui/Card"
import { Button } from "../ui/Button"
import type { ZakaatResult } from "../../utils/zakaat"

export interface ZakaatSummaryProps {
  result: ZakaatResult
  formatCurrency: (amount: number) => string
  labels: {
    title: string
    subtitle: string
    totalAssets: string
    totalDeductions: string
    netWealth: string
    nisaabThreshold: string
    zakaatDue: string
    belowNisaab: string
    zakaatRate: string
    payNowBtn: string
    disclaimer: string
  }
}

export function ZakaatSummary({ result, formatCurrency, labels }: ZakaatSummaryProps) {
  const rows = [
    { label: labels.totalAssets,      value: formatCurrency(result.totalAssets) },
    { label: labels.totalDeductions,  value: formatCurrency(result.totalDeductions) },
    { label: labels.netWealth,        value: formatCurrency(result.netZakaatableWealth) },
    { label: labels.nisaabThreshold,  value: formatCurrency(result.nisaabThreshold) },
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
            {result.isBelowNisaab ? labels.belowNisaab : labels.zakaatRate}
          </p>
        </div>

        <Button variant="outline" size="sm" fullWidth>
          {labels.payNowBtn}
        </Button>

        <p className="text-[10px] text-charcoal-400 leading-relaxed text-center">
          {labels.disclaimer}
        </p>
      </Card>
    </RevealCard>
  )
}

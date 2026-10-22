/**
 * NisaabStandardToggle.tsx
 * Three-button card for selecting the Nisaab calculation standard.
 * Scholars differ: Hanafi uses silver, Shafi'i/Hanbali use gold, "lower" is most inclusive.
 */
import { Card } from "../ui/Card"
import { RevealCard } from "../ui/Card"
import { cn } from "../../utils/cn"
import type { NisaabStandard } from "../../utils/zakaat"

export interface NisaabStandardToggleProps {
  value: NisaabStandard
  onChange: (standard: NisaabStandard) => void
  labels: {
    label: string
    note: string
    lower: string
    lowerDesc: string
    gold: string
    goldDesc: string
    silver: string
    silverDesc: string
  }
}

const OPTIONS: { key: NisaabStandard; labelKey: "lower" | "gold" | "silver"; descKey: "lowerDesc" | "goldDesc" | "silverDesc" }[] = [
  { key: "lower",  labelKey: "lower",  descKey: "lowerDesc"  },
  { key: "gold",   labelKey: "gold",   descKey: "goldDesc"   },
  { key: "silver", labelKey: "silver", descKey: "silverDesc" },
]

export function NisaabStandardToggle({ value, onChange, labels }: NisaabStandardToggleProps) {
  return (
    <RevealCard delay={0.08}>
      <Card padding="md" className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-charcoal-700">{labels.label}</p>
          <p className="text-xs text-charcoal-400 mt-0.5">{labels.note}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {OPTIONS.map(({ key, labelKey, descKey }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-start transition-all duration-150",
                value === key
                  ? "border-sage-400 bg-sage-50 ring-1 ring-sage-400"
                  : "border-cream-300 bg-white hover:border-sage-300 hover:bg-cream-50",
              )}
            >
              <p className={cn(
                "text-sm font-medium",
                value === key ? "text-sage-700" : "text-charcoal-700",
              )}>
                {labels[labelKey]}
              </p>
              <p className="text-[11px] text-charcoal-400 mt-0.5 leading-snug">
                {labels[descKey]}
              </p>
            </button>
          ))}
        </div>
      </Card>
    </RevealCard>
  )
}

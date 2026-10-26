/**
 * LivePricesPanel.tsx
 * Shows live gold/silver per-gram prices fetched from GoldAPI.
 * Displays loading, live, fallback and error states.
 */
import { TrendingUp, RefreshCw, Loader2, AlertCircle } from "lucide-react"
import { Card } from "../ui/Card"
import { RevealCard } from "../ui/Card"
import type { PriceStatus } from "../../hooks/useMetalPrices"
import type { MetalPrices } from "../../services/metalPrices"

export interface LivePricesPanelProps {
  prices: MetalPrices | null
  status: PriceStatus
  lastUpdated: Date | null
  currencySymbol: string
  onRefresh: () => void
  labels: {
    liveLabel: string
    liveNote: string
    loading: string
    error: string
    fallbackNote: string
    goldPerGram: string
    silverPerGram: string
    lastUpdated: string
    refresh: string
  }
}

export function LivePricesPanel({
  prices,
  status,
  lastUpdated,
  currencySymbol,
  onRefresh,
  labels,
}: LivePricesPanelProps) {
  return (
    <RevealCard delay={0.05}>
      <Card padding="md" className="space-y-2">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-sage-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-charcoal-700">{labels.liveLabel}</p>
              <p className="text-xs text-charcoal-400">{labels.liveNote}</p>
            </div>
          </div>
          {status !== "loading" && (
            <button
              onClick={onRefresh}
              aria-label={labels.refresh}
              className="flex items-center gap-1.5 text-xs text-sage-600 hover:text-sage-700 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {labels.refresh}
            </button>
          )}
        </div>

        {/* Status banners */}
        {status === "loading" && (
          <div className="flex items-center gap-2 text-xs text-charcoal-400 pt-1">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {labels.loading}
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 rounded-lg bg-blush-50 border border-blush-200 px-3 py-2 text-xs text-blush-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {labels.error}
          </div>
        )}
        {/* Price tiles — shown whenever we have any value to display */}
        {prices && status === "live" && (
          <div className="flex gap-4 pt-1">
            <div className="flex-1 rounded-xl bg-cream-50 border border-cream-200 px-4 py-3">
              <p className="text-xs text-charcoal-400 mb-0.5">{labels.goldPerGram}</p>
              <p className="text-sm font-semibold text-charcoal-800">
                {currencySymbol}{prices.goldPricePerGram.toFixed(2)}
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-cream-50 border border-cream-200 px-4 py-3">
              <p className="text-xs text-charcoal-400 mb-0.5">{labels.silverPerGram}</p>
              <p className="text-sm font-semibold text-charcoal-800">
                {currencySymbol}{prices.silverPricePerGram.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Timestamp */}
        {lastUpdated && status === "live" && (
          <p className="text-[10px] text-charcoal-300">
            {labels.lastUpdated}: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </Card>
    </RevealCard>
  )
}

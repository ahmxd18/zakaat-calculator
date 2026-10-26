/**
 * Calculate.tsx
 * Zakaat calculation page — orchestrates sub-components.
 * Heavy UI logic lives in src/components/calculate/.
 *
 */

import { Info, RefreshCw } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Select } from "../components/ui/Select"
import { SectionHeader } from "../components/ui/SectionHeader"
import { Container } from "../components/layout/Container"
import { RevealCard } from "../components/ui/Card"
import { PageLayout } from "../components/layout/PageLayout"
import { useCalculator } from "../hooks/useCalculator"
import { getAssetSections } from "../components/calculate/assetSections"
import { useT, useTranslation } from "../contexts/i18n"
import { INVARIANT_CONSTANTS } from "../constants/invariants"
import {
  AssetSection,
  HawlEligibility,
  LivePricesPanel,
  NisaabStandardToggle,
  ZakaatSummary,
} from "../components/calculate"

export function Calculate() {
  const t = useT()
  const { direction } = useTranslation()
  const {
    externalChange, inputVersion, setFieldValidity, initial, currency, values, hawl, madhab, nisaabStandard, setNisaabOverride,
    storageBlocked, setStorageBlocked, saveFailed, pendingCurrency, setPendingCurrency,
    manualDraft, setManualDraft, manualQuote, setManualQuote, setNow,
    nisaabPrices, priceStatus, lastUpdated, refreshPrices, manualPrices, result,
    currencySymbol, formatCurrency, handleFieldChange, handleReset, changeCurrency,
    geoAllowed, setSnapshot, setHawl,
  } = useCalculator()
  const sections = getAssetSections(t.calculate)

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
                <Select
                  name="currency"
                  value={currency}
                  onChange={(val) => {
                    geoAllowed.current = false
                    if (val === currency) return
                    if (storageBlocked && initial.needsReview) {
                      setSnapshot(previous => ({ ...previous, currency: val }))
                      setManualQuote(null)
                      setManualDraft({ gold: "", silver: "" })
                      return
                    }
                    if (Object.values(values).some(amount => amount > 0) || hawl.startDate) setPendingCurrency(val)
                    else changeCurrency(val)
                  }}
                  options={INVARIANT_CONSTANTS.currencies.map((c) => ({ value: c, label: c }))}
                  ariaLabel={t.calculate.currencyLabel}
                />
              </Card>
            </RevealCard>

            {pendingCurrency && <Card padding="md" className="space-y-3">
              <p role="alert">{t.calculate.safety.currencyChange} ({currency} → {pendingCurrency})</p>
              <Button type="button" onClick={() => changeCurrency(pendingCurrency)}>{t.calculate.safety.confirmCurrency}</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingCurrency(null)}>{t.calculate.safety.cancelCurrency}</Button>
            </Card>}

            {(storageBlocked || saveFailed) && <Card padding="md">
              <p role="alert">{storageBlocked ? externalChange ? t.calculate.safety.externalChange : t.calculate.safety.restoreWarning : t.calculate.safety.saveWarning}</p>
              {storageBlocked && <Button type="button" onClick={() => setStorageBlocked(false)}>{t.calculate.safety.acceptRestored}</Button>}
            </Card>}

            {/* Live Nisaab prices */}
            <LivePricesPanel
              prices={nisaabPrices}
              status={priceStatus}
              lastUpdated={lastUpdated}
              currencySymbol={currencySymbol}
              onRefresh={refreshPrices}
              labels={t.calculate.prices}
            />

            <Card padding="md" className="space-y-3">
              <p className="text-sm">{t.calculate.safety.manualNote}</p>
              <div className="grid grid-cols-2 gap-3">
                {(["gold", "silver"] as const).map(metal => <label key={metal} className="text-xs">
                  {metal === "gold" ? t.calculate.prices.goldPerGram : t.calculate.prices.silverPerGram} ({currency}/g)
                  <input type="number" min="0" max="1000000000000" step="any" value={manualDraft[metal]}
                    onChange={event => { geoAllowed.current = false; setManualDraft(previous => ({ ...previous, [metal]: event.target.value })); setManualQuote(null) }}
                    className="w-full rounded-lg border p-2" />
                </label>)}
              </div>
              <Button type="button" disabled={!Object.values(manualDraft).every(value => value.trim() !== "" && Number.isFinite(Number(value)) && Number(value) > 0 && Number(value) <= 1e12)}
                onClick={() => { const timestamp = new Date(); setNow(timestamp); setManualQuote({ currency, prices: { goldPricePerGram: Number(manualDraft.gold), silverPricePerGram: Number(manualDraft.silver) }, expiresAt: timestamp.getTime() + 3600000 }) }}>
                {t.calculate.safety.useManual}
              </Button>
              {manualPrices && <p role="status" className="text-xs">{t.calculate.safety.manualActive}</p>}
              {manualQuote && <Button type="button" variant="ghost" onClick={() => setManualQuote(null)}>{t.calculate.safety.useLive}</Button>}
            </Card>

            {/* Nisaab standard toggle */}
            <NisaabStandardToggle
              value={nisaabStandard}
              onChange={setNisaabOverride}
              labels={t.calculate.nisaabStandard}
            />
            <Button type="button" variant="ghost" onClick={() => setNisaabOverride(null)}>{t.calculate.safety.schoolDefault}</Button>
            <p className="rounded-xl border border-sage-100 bg-sage-50 px-4 py-3 text-xs leading-relaxed text-sage-800">
              {t.calculate.schoolRules[madhab]}
            </p>

            {madhab !== "default" && (
              <HawlEligibility
                dueDate={hawl.dueDate}
                onDueDateChange={dueDate => setHawl(previous => ({ ...previous, dueDate }))}
                startDate={hawl.startDate}
                fellBelowNisaab={hawl.fellBelowNisaab}
                onStartDateChange={(startDate) => setHawl((prev) => ({ ...prev, startDate }))}
                onFellBelowNisaabChange={(fellBelowNisaab) =>
                  setHawl((prev) => ({ ...prev, fellBelowNisaab }))
                }
                labels={t.calculate.hawl}
                madhab={madhab}
              />
            )}

            {/* Asset sections */}
            {sections.map((section, i) => (
              <AssetSection
                key={`${section.id}:${inputVersion}`}
                icon={section.icon}
                label={section.label}
                description={section.description}
                fields={section.fields}
                index={i}
                currencySymbol={currencySymbol}
                values={values}
                onChange={handleFieldChange}
                onValidityChange={setFieldValidity}
                invalidMessage={t.calculate.safety.invalidAmount}
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
              unavailable={t.calculate.safety.unavailable}
              estimate={t.calculate.safety.estimate}
              formatCurrency={formatCurrency}
              labels={t.calculate.summary}
            />
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}

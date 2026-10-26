import { useState, useEffect, useMemo, useRef } from "react"
import { calculateZakaat, EMPTY_VALUES, type AssetKey } from "../utils/zakaat"
import { loadSnapshot, emptySnapshot, SNAPSHOT_KEY } from "../utils/calculatorStorage"
import { useMadhab } from "../contexts/madhab"
import { useGeoLocation } from "./useGeoLocation"
import { useMetalPrices } from "./useMetalPrices"
import { getCurrencySymbol } from "../utils/currency"
import type { MetalPrices } from "../services/metalPrices"
// ── Persistence keys ────────────────────────────────────────────────────────
const EMPTY_HAWL = { startDate: "", fellBelowNisaab: false }

// ── Page component ───────────────────────────────────────────────────────────
export function useCalculator() {
  const { madhab, madhabMeta } = useMadhab()

  const [initial] = useState(() => {
    try { return { ...loadSnapshot(localStorage), error: false, canDetect: !localStorage.getItem(SNAPSHOT_KEY) && !localStorage.getItem("zakaat_currency") && !localStorage.getItem("zakaat_calculator_data") } }
    catch { return { snapshot: emptySnapshot(), needsReview: false, error: true, canDetect: false } }
  })
  const geoAllowed = useRef(initial.canDetect)
  const { currency: geoCurrency, loading: geoLoading } = useGeoLocation(initial.canDetect)
  const [snapshot, setSnapshot] = useState(initial.snapshot)
  const { currency, values, hawl } = snapshot
  useEffect(() => {
    if (geoLoading || !geoAllowed.current) return
    geoAllowed.current = false
    setSnapshot(previous => Object.values(previous.values).some(amount => amount > 0) || previous.hawl.startDate
      ? previous : { ...previous, currency: geoCurrency })
  }, [geoCurrency, geoLoading])
  const [storageBlocked, setStorageBlocked] = useState(initial.error || initial.needsReview)
  const [externalChange, setExternalChange] = useState(false)
  useEffect(() => {
    const changed = (event: StorageEvent) => {
      if (event.key === SNAPSHOT_KEY || event.key === null) { setExternalChange(true); setStorageBlocked(true) }
    }
    window.addEventListener("storage", changed)
    return () => window.removeEventListener("storage", changed)
  }, [])
  const [saveFailed, setSaveFailed] = useState(false)
  const [inputVersion, setInputVersion] = useState(0)
  const [invalidFields, setInvalidFields] = useState<Partial<Record<AssetKey, boolean>>>({})
  const setFieldValidity = (id: AssetKey, valid: boolean) => setInvalidFields(previous => ({ ...previous, [id]: !valid }))
  const hasInvalidFields = Object.values(invalidFields).some(Boolean)
  const [pendingCurrency, setPendingCurrency] = useState<string | null>(null)
  const [manualDraft, setManualDraft] = useState({ gold: "", silver: "" })
  const [manualQuote, setManualQuote] = useState<{ currency: string; prices: MetalPrices; expiresAt: number } | null>(null)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30_000)
    const update = () => setNow(new Date())
    window.addEventListener("focus", update)
    return () => { clearInterval(timer); window.removeEventListener("focus", update) }
  }, [])
  useEffect(() => {
    if (storageBlocked) return
    try { localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot)); setSaveFailed(false) }
    catch { setSaveFailed(true) }
  }, [snapshot, storageBlocked])
  const setHawl = (update: (previous: typeof hawl) => typeof hawl) => {
    geoAllowed.current = false
    setSnapshot(previous => ({ ...previous, hawl: update(previous.hawl) }))
  }
  const nisaabOverride = snapshot.nisaabOverride
  const setNisaabOverride = (value: typeof nisaabOverride) => setSnapshot(previous => ({ ...previous, nisaabOverride: value }))
  const nisaabStandard = nisaabOverride ?? madhabMeta.defaultNisaabStandard

  const { prices: nisaabPrices, status: priceStatus, lastUpdated, refresh: refreshPrices } =
    useMetalPrices(currency)

  const manualPrices = manualQuote?.currency === currency && manualQuote.expiresAt > now.getTime() ? manualQuote.prices : null
  const activePrices = manualPrices ?? (priceStatus === "live" ? nisaabPrices : null)
  const result = useMemo(() => {
    if (!activePrices || storageBlocked || hasInvalidFields) return null
    try { return calculateZakaat(values, activePrices, nisaabStandard, madhab, hawl, now) }
    catch { return null }
  }, [values, activePrices, nisaabStandard, madhab, hawl, now, storageBlocked, hasInvalidFields])
  const currencySymbol = getCurrencySymbol(currency)
  const formatCurrency = (amount: number) => `${currencySymbol}${amount.toFixed(2)}`
  const handleFieldChange = (id: AssetKey, value: number) => {
    geoAllowed.current = false
    setSnapshot(previous => ({ ...previous, values: { ...previous.values, [id]: value } }))
  }
  const handleReset = () => {
    setExternalChange(false)
    setInvalidFields({})
    setInputVersion(previous => previous + 1)
    geoAllowed.current = false
    setManualQuote(null)
    setManualDraft({ gold: "", silver: "" })
    setSnapshot(previous => ({ ...previous, values: { ...EMPTY_VALUES }, hawl: { ...EMPTY_HAWL } }))
    setStorageBlocked(false)
    try {
      for (const key of [SNAPSHOT_KEY, "zakaat_calculator_data", "zakaat_hawl_data"]) localStorage.removeItem(key)
    } catch { setSaveFailed(true) }
  }

  const changeCurrency = (next: string) => {
    setInvalidFields({})
    setInputVersion(previous => previous + 1)
    setSnapshot(previous => ({ ...previous, currency: next, values: { ...EMPTY_VALUES }, hawl: { ...EMPTY_HAWL } }))
    setManualQuote(null)
    setManualDraft({ gold: "", silver: "" })
    setPendingCurrency(null)
  }

  return {
    externalChange, inputVersion, setFieldValidity, initial, currency, values, hawl, madhab, nisaabStandard, setNisaabOverride,
    storageBlocked, setStorageBlocked, saveFailed, pendingCurrency, setPendingCurrency,
    manualDraft, setManualDraft, manualQuote, setManualQuote, now, setNow,
    nisaabPrices, priceStatus, lastUpdated, refreshPrices, manualPrices, result,
    currencySymbol, formatCurrency, handleFieldChange, handleReset, changeCurrency,
    geoAllowed, setSnapshot, setHawl,
  }
}

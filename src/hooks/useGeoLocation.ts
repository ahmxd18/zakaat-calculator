/**
 * useGeoLocation.ts
 * Detects the user's country and maps it to a supported app currency.
 * Uses ipapi.co — no API key, 1,000 free requests/day.
 *
 * Falls back to "USD" on any failure (network error, VPN, rate limit).
 * Result is cached in sessionStorage so it only fires once per page session.
 */
import { useState, useEffect } from "react"
import { INVARIANT_CONSTANTS } from "../constants/invariants"

type SupportedCurrency = (typeof INVARIANT_CONSTANTS.currencies)[number]

/**
 * Maps ISO 4217 currency codes returned by ipapi.co to our supported set.
 * Unmapped currencies fall back to the closest regional match.
 */
const CURRENCY_MAP: Record<string, SupportedCurrency> = {
  // Direct matches
  GBP: "GBP",
  USD: "USD",
  EUR: "EUR",
  AED: "AED",
  SAR: "SAR",
  PKR: "PKR",
  BDT: "BDT",
  MYR: "MYR",
  INR: "INR",
  IDR: "IDR",
  // Common unmapped → nearest supported
  SGD: "MYR",  // Singapore → MYR (closest supported Southeast Asian)
  OMR: "AED",  // Oman → AED (Gulf)
  KWD: "AED",  // Kuwait → AED (Gulf)
  BHD: "AED",  // Bahrain → AED (Gulf)
  QAR: "AED",  // Qatar → AED (Gulf)
  JOD: "AED",  // Jordan → AED
  EGP: "AED",  // Egypt → AED (closest supported)
  LKR: "INR",  // Sri Lanka → INR
  NPR: "INR",  // Nepal → INR
  CAD: "USD",  // Canada → USD
  AUD: "USD",  // Australia → USD
  NZD: "USD",  // New Zealand → USD
  ZAR: "USD",  // South Africa → USD
  TRY: "EUR",  // Turkey → EUR
  NGN: "USD",  // Nigeria → USD
  GHS: "USD",  // Ghana → USD
  MAD: "EUR",  // Morocco → EUR
}

const FALLBACK: SupportedCurrency = "USD"
const CACHE_KEY = "zakaat_geo_currency"

interface GeoResult {
  currency: SupportedCurrency
  /** ISO country code (e.g. "GB") — available for future use */
  countryCode: string | null
  /** Whether a real match was found vs fallback */
  detected: boolean
}

interface UseGeoLocationResult {
  currency: SupportedCurrency
  countryCode: string | null
  detected: boolean
  loading: boolean
}

export function useGeoLocation(): UseGeoLocationResult {
  const [result, setResult] = useState<GeoResult>({
    currency: FALLBACK,
    countryCode: null,
    detected: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check sessionStorage cache first
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed: GeoResult = JSON.parse(cached)
        setResult(parsed)
        setLoading(false)
        return
      }
    } catch {}

    const controller = new AbortController()

    async function detect() {
      try {
        // ipapi.co returns JSON with currency, country_code etc. — no key needed
        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
          // Short timeout — if slow, we'd rather fall back quickly
        })
        if (!res.ok) throw new Error("ipapi.co returned non-OK")

        const data: { currency?: string; country_code?: string } = await res.json()

        const raw = (data.currency ?? "").toUpperCase()
        const countryCode = data.country_code ?? null
        const mapped = CURRENCY_MAP[raw] ?? FALLBACK
        const detected = !!CURRENCY_MAP[raw]

        const geo: GeoResult = { currency: mapped, countryCode, detected }

        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(geo)) } catch {}

        setResult(geo)
      } catch {
        // Network error, VPN, rate limit — silently fall back
        setResult({ currency: FALLBACK, countryCode: null, detected: false })
      } finally {
        setLoading(false)
      }
    }

    detect()
    return () => controller.abort()
  }, [])

  return { ...result, loading }
}

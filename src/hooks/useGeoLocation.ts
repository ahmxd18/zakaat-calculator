import { useState, useEffect } from 'react'
import { isCurrency } from '../utils/calculatorStorage'

const CACHE_KEY = 'zakaat_geo_currency'
const FALLBACK = { currency: 'USD', countryCode: null, detected: false }
interface GeoResult { currency: string; countryCode: string | null; detected: boolean }
export function validGeo(value: unknown): value is GeoResult {
  if (!value || typeof value !== 'object') return false
  const data = value as GeoResult
  return isCurrency(data.currency) && typeof data.detected === 'boolean' &&
    (data.countryCode === null || (typeof data.countryCode === 'string' && /^[A-Z]{2}$/.test(data.countryCode)))
}
/** Only an untouched first visit needs IP lookup. Unsupported currencies use USD. */
export function useGeoLocation(enabled = true) {
  const [result, setResult] = useState<GeoResult>(FALLBACK)
  const [loading, setLoading] = useState(enabled)
  useEffect(() => {
    if (!enabled) { setLoading(false); return }
    try {
      const cached: unknown = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null')
      if (validGeo(cached)) { setResult(cached); setLoading(false); return }
    } catch { /* A broken cache must not prevent a fresh lookup. */ }
    let active = true
    const controller = new AbortController()
    const timer = setTimeout(() => {
      controller.abort()
      if (active) { setResult(FALLBACK); setLoading(false) }
    }, 8000)
    const detect = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/', { signal: controller.signal })
        if (!response.ok) throw new Error('Location unavailable.')
        const data = await response.json()
        if (!active || controller.signal.aborted) return
        const currency = typeof data.currency === 'string' ? data.currency.toUpperCase() : ''
        const geo = { currency: isCurrency(currency) ? currency : 'USD', detected: isCurrency(currency), countryCode: typeof data.country_code === 'string' && /^[A-Z]{2}$/.test(data.country_code) ? data.country_code : null }
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(geo)) } catch { /* Optional cache. */ }
        setResult(geo)
      } catch { if (active && !controller.signal.aborted) setResult(FALLBACK) }
      finally { clearTimeout(timer); if (active) setLoading(false) }
    }
    void detect()
    return () => { active = false; controller.abort(); clearTimeout(timer) }
  }, [enabled])
  return { ...result, loading }
}

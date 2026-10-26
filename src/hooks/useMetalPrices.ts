import { useState, useEffect, useCallback, useRef } from "react"
import { fetchMetalPrices, validateQuote, type PriceQuote } from "../services/metalPrices"
export type PriceStatus = "loading" | "live" | "error"
const cache = new Map<string, PriceQuote>()
export function useMetalPrices(currency: string) {
  const [result, setResult] = useState<{ currency: string; quote: PriceQuote | null; status: PriceStatus }>({ currency, quote: null, status: "loading" })
  const [tick, setTick] = useState(0)
  const requestId = useRef(0)
  useEffect(() => {
    const controller = new AbortController()
    const id = ++requestId.current
    const requestTimeout = setTimeout(() => {
      controller.abort()
      if (id === requestId.current) setResult({ currency, quote: null, status: "error" })
    }, 15_000)
    let timer: ReturnType<typeof setTimeout>
    const commit = (quote: PriceQuote) => {
      clearTimeout(requestTimeout)
      setResult({ currency, quote, status: "live" })
      timer = setTimeout(() => setTick(t => t + 1), Math.max(1, quote.expiresAt - Date.now()))
    }
    const load = async () => {
      const cached = cache.get(currency)
      if (cached) {
        try { commit(validateQuote(cached, currency)); return } catch { cache.delete(currency) }
      }
      setResult({ currency, quote: null, status: "loading" })
      try {
        const quote = await fetchMetalPrices(currency, controller.signal)
        if (controller.signal.aborted || id !== requestId.current) return
        cache.set(currency, quote)
        commit(quote)
      } catch {
        clearTimeout(requestTimeout)
        if (!controller.signal.aborted && id === requestId.current) setResult({ currency, quote: null, status: "error" })
      }
    }
    void load()
    return () => { controller.abort(); clearTimeout(timer); clearTimeout(requestTimeout) }
  }, [currency, tick])
  const refresh = useCallback(() => { cache.delete(currency); setTick(t => t + 1) }, [currency])
  const current = result.currency === currency ? result : { quote: null, status: "loading" as const }
  const quote = current.quote && current.quote.expiresAt > Date.now() ? current.quote : null
  return { prices: quote?.prices ?? null, status: quote ? current.status : current.status === "live" ? "loading" as const : current.status, lastUpdated: quote ? new Date(quote.updatedAt) : null, refresh }
}

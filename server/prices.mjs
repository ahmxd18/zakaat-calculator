import { SUPPORTED_CURRENCIES, validateQuote } from '../shared/prices.mjs'

/** Bounded cache, request coalescing and failure backoff protect the provider quota. */
export function createPriceService({ apiKey, fetchImpl = fetch, now = Date.now }) {
  const cache = new Map()
  const pending = new Map()
  const retryAfter = new Map()
  return async function quote(currency) {
    if (!SUPPORTED_CURRENCIES.includes(currency)) throw new Error('Unsupported currency.')
    if (!apiKey) throw new Error('Live prices are not configured.')
    const cached = cache.get(currency)
    if (cached) {
      try { return validateQuote(cached, currency, now()) }
      catch { cache.delete(currency) }
    }
    if (pending.has(currency)) return pending.get(currency)
    if ((retryAfter.get(currency) ?? 0) > now()) throw new Error('Provider temporarily unavailable.')
    const request = (async () => {
      try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 10_000)
        let metals
        try {
          metals = await Promise.all(['XAU', 'XAG'].map(async symbol => {
            const response = await fetchImpl(`https://www.goldapi.io/api/${symbol}/${currency}`, {
              headers: { 'x-access-token': apiKey }, signal: controller.signal,
              redirect: 'error',
            })
            if (!response.ok) throw new Error('Provider unavailable.')
            const data = await response.json()
            if (data.currency !== currency || typeof data.timestamp !== 'number' || typeof data.price_gram_24k !== 'number') throw new Error('Invalid provider response.')
            validateQuote({ currency, prices: { goldPricePerGram: data.price_gram_24k, silverPricePerGram: data.price_gram_24k }, updatedAt: data.timestamp * 1000 }, currency, now())
            return { price: data.price_gram_24k, updatedAt: data.timestamp * 1000 }
          }))
        } finally { controller.abort(); clearTimeout(timer) }
        const result = validateQuote({ currency, prices: { goldPricePerGram: metals[0].price, silverPricePerGram: metals[1].price }, updatedAt: Math.min(...metals.map(m => m.updatedAt)) }, currency, now())
        cache.set(currency, result)
        retryAfter.delete(currency)
        return result
      } catch {
        retryAfter.set(currency, now() + 30_000)
        throw new Error('Live prices unavailable.')
      } finally { pending.delete(currency) }
    })()
    pending.set(currency, request)
    return request
  }
}

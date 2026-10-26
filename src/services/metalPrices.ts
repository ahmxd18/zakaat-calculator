import { validateQuote, SUPPORTED_CURRENCIES } from '../../shared/prices.mjs'
export { validateQuote, PRICE_TTL_MS } from '../../shared/prices.mjs'
export type { MetalPrices, PriceQuote } from '../../shared/prices.mjs'

/** Credentials stay on the server; the browser receives only validated quotes. */
export async function fetchMetalPrices(currency: string, signal?: AbortSignal) {
  if (!SUPPORTED_CURRENCIES.includes(currency)) throw new Error('Unsupported currency.')
  const response = await fetch(`/api/metal-prices?currency=${encodeURIComponent(currency)}`, { signal })
  if (!response.ok) throw new Error('Live prices unavailable. Enter verified prices manually.')
  return validateQuote(await response.json(), currency)
}

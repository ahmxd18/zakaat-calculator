/** Shared price contract used by the browser and credentialed server. */
export const SUPPORTED_CURRENCIES = Object.freeze(['GBP','USD','EUR','AED','SAR','PKR','BDT','MYR','INR','IDR'])
export const PRICE_TTL_MS = 60 * 60 * 1000
export const GOLD_NISAB_GRAMS = 85
export const SILVER_NISAB_GRAMS = 595
export const ZAKAAT_RATE = 0.025
export const MAX_INPUT = 1e12
/** @typedef {{goldPricePerGram: number, silverPricePerGram: number}} MetalPrices */
/** @typedef {{currency: string, prices: MetalPrices, updatedAt: number, expiresAt: number}} PriceQuote */
/** @param {unknown} value @param {string} currency @param {number} [now] @returns {PriceQuote} */
export function validateQuote(value, currency, now = Date.now()) {
  if (!value || typeof value !== 'object') throw new Error('Invalid price quote.')
  const q = /** @type {Partial<PriceQuote>} */ (value)
  if (!SUPPORTED_CURRENCIES.includes(currency) || q.currency !== currency || !q.prices) throw new Error('Price currency mismatch.')
  for (const price of [q.prices.goldPricePerGram, q.prices.silverPricePerGram]) {
    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0 || price > MAX_INPUT) throw new Error('Invalid metal price.')
  }
  if (typeof q.updatedAt !== 'number' || !Number.isFinite(q.updatedAt) || q.updatedAt > now + 60_000 || now - q.updatedAt >= PRICE_TTL_MS) throw new Error('Stale price quote.')
  return { currency, prices: { ...q.prices }, updatedAt: q.updatedAt, expiresAt: q.updatedAt + PRICE_TTL_MS }
}

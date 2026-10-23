/**
 * metalPrices.ts
 * Fetches live gold and silver per-gram prices from GoldAPI.io.
 *
 * Sign up for a free key at https://www.goldapi.io/ (5,000 req/month).
 * Add VITE_GOLD_API_KEY to your .env file.
 *
 * Falls back to hardcoded defaults when the key is absent or the request fails.
 */

export interface MetalPrices {
  goldPricePerGram: number;
  silverPricePerGram: number;
}

/** Fallback prices used when API is unavailable */
export const FALLBACK_PRICES: MetalPrices = {
  goldPricePerGram: 76,    // approximate GBP/g as of late 2024
  silverPricePerGram: 0.83, // approximate GBP/g as of late 2024
};

/** Currency codes supported by GoldAPI */
type SupportedCurrency = "GBP" | "USD" | "EUR" | "AED" | "SAR" | "PKR" | "BDT" | "MYR" | "INR" | "IDR";

interface GoldApiResponse {
  price_gram_24k: number;
  currency: string;
  timestamp: number;
}

const GOLDAPI_BASE = "https://www.goldapi.io/api";

/**
 * Fetch gold price per gram for a given currency.
 * Returns null on failure so the caller can fall back gracefully; aborts propagate.
 */
async function fetchMetalGram(
  symbol: "XAU" | "XAG",
  currency: SupportedCurrency,
  apiKey: string,
  signal?: AbortSignal,
): Promise<number | null> {
  try {
    const res = await fetch(`${GOLDAPI_BASE}/${symbol}/${currency}`, {
      headers: { "x-access-token": apiKey },
      signal,
    });
    if (!res.ok) return null;

    const data: GoldApiResponse = await res.json();

    // GoldAPI returns price_gram_24k directly
    if (data.price_gram_24k && data.price_gram_24k > 0) {
      return data.price_gram_24k;
    }
    return null;
  } catch (error) {
    if (signal?.aborted) throw error;
    return null;
  }
}

/**
 * Fetch both gold and silver per-gram prices.
 * Silently falls back to FALLBACK_PRICES on request failures; aborts propagate.
 */
export async function fetchMetalPrices(
  currency: string,
  signal?: AbortSignal,
): Promise<MetalPrices> {
  const apiKey = import.meta.env.VITE_GOLD_API_KEY;

  // No key configured — return fallback immediately
  if (!apiKey) return FALLBACK_PRICES;

  const supportedCurrency = currency as SupportedCurrency;

  const [gold, silver] = await Promise.all([
    fetchMetalGram("XAU", supportedCurrency, apiKey, signal),
    fetchMetalGram("XAG", supportedCurrency, apiKey, signal),
  ]);

  return {
    goldPricePerGram: gold ?? FALLBACK_PRICES.goldPricePerGram,
    silverPricePerGram: silver ?? FALLBACK_PRICES.silverPricePerGram,
  };
}

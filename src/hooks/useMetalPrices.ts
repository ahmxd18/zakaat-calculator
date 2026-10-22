/**
 * useMetalPrices.ts
 * Custom hook that fetches live gold/silver prices and caches them for 1 hour.
 * No external dependencies — plain React hooks only.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchMetalPrices, FALLBACK_PRICES, type MetalPrices } from "../services/metalPrices";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface CacheEntry {
  data: MetalPrices;
  fetchedAt: number;
}

/** In-memory cache shared across all hook instances */
const cache = new Map<string, CacheEntry>();

export type PriceStatus = "loading" | "live" | "fallback" | "error";

interface UseMetalPricesResult {
  prices: MetalPrices;
  status: PriceStatus;
  lastUpdated: Date | null;
  refresh: () => void;
}

export function useMetalPrices(currency: string): UseMetalPricesResult {
  const [prices, setPrices] = useState<MetalPrices>(FALLBACK_PRICES);
  const [status, setStatus] = useState<PriceStatus>("loading");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(
    async (force = false) => {
      const cacheKey = currency;
      const cached = cache.get(cacheKey);
      const now = Date.now();

      // Serve from cache if still fresh and not forced
      if (!force && cached && now - cached.fetchedAt < CACHE_TTL_MS) {
        setPrices(cached.data);
        setLastUpdated(new Date(cached.fetchedAt));
        setStatus("live");
        return;
      }

      // Check if API key is even configured
      const apiKey = import.meta.env.VITE_GOLD_API_KEY;
      if (!apiKey) {
        setPrices(FALLBACK_PRICES);
        setStatus("fallback");
        setLastUpdated(null);
        return;
      }

      // Cancel any in-flight request
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setStatus("loading");

      try {
        const data = await fetchMetalPrices(currency);
        const fetchedAt = Date.now();

        // Detect if we got actual live data or silent fallback
        const isLive =
          data.goldPricePerGram !== FALLBACK_PRICES.goldPricePerGram ||
          data.silverPricePerGram !== FALLBACK_PRICES.silverPricePerGram;

        cache.set(cacheKey, { data, fetchedAt });
        setPrices(data);
        setLastUpdated(new Date(fetchedAt));
        setStatus(isLive ? "live" : "fallback");
      } catch {
        // Only update state if the error wasn't from our own abort
        if (!abortRef.current.signal.aborted) {
          setStatus("error");
          setPrices(FALLBACK_PRICES);
          setLastUpdated(null);
        }
      }
    },
    [currency],
  );

  // Reload when currency changes
  useEffect(() => {
    load();
    return () => { abortRef.current?.abort(); };
  }, [load]);

  const refresh = useCallback(() => {
    cache.delete(currency);
    load(true);
  }, [currency, load]);

  return { prices, status, lastUpdated, refresh };
}

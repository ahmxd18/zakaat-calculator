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

interface PriceResult extends CacheEntry {
  currency: string;
  status: PriceStatus;
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
  const [result, setResult] = useState<PriceResult>({
    currency,
    data: FALLBACK_PRICES,
    fetchedAt: 0,
    status: "loading",
  });
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const load = useCallback(
    async (force = false) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const requestId = ++requestIdRef.current;
      const isCurrentRequest = () =>
        requestIdRef.current === requestId && !controller.signal.aborted;

      const cacheKey = currency;
      const cached = cache.get(cacheKey);
      const now = Date.now();

      // Serve from cache if still fresh and not forced
      if (!force && cached && now - cached.fetchedAt < CACHE_TTL_MS) {
        setResult({ currency, ...cached, status: "live" });
        return;
      }

      // Check if API key is even configured
      const apiKey = import.meta.env.VITE_GOLD_API_KEY;
      if (!apiKey) {
        setResult({
          currency,
          data: FALLBACK_PRICES,
          fetchedAt: 0,
          status: "fallback",
        });
        return;
      }

      setResult({
        currency,
        data: FALLBACK_PRICES,
        fetchedAt: 0,
        status: "loading",
      });

      try {
        const data = await fetchMetalPrices(currency, controller.signal);
        if (!isCurrentRequest()) return;

        const fetchedAt = Date.now();

        // Detect if we got actual live data or silent fallback
        const isLive =
          data.goldPricePerGram !== FALLBACK_PRICES.goldPricePerGram ||
          data.silverPricePerGram !== FALLBACK_PRICES.silverPricePerGram;

        cache.set(cacheKey, { data, fetchedAt });
        setResult({
          currency,
          data,
          fetchedAt,
          status: isLive ? "live" : "fallback",
        });
      } catch {
        if (isCurrentRequest()) {
          setResult({
            currency,
            data: FALLBACK_PRICES,
            fetchedAt: 0,
            status: "error",
          });
        }
      }
    },
    [currency],
  );

  // Reload when currency changes
  useEffect(() => {
    void load();
    return () => {
      abortRef.current?.abort();
      requestIdRef.current += 1;
    };
  }, [load]);

  const refresh = useCallback(() => {
    cache.delete(currency);
    void load(true);
  }, [currency, load]);

  const currentResult =
    result.currency === currency
      ? result
      : { data: FALLBACK_PRICES, fetchedAt: 0, status: "loading" as const };

  return {
    prices: currentResult.data,
    status: currentResult.status,
    lastUpdated: currentResult.fetchedAt ? new Date(currentResult.fetchedAt) : null,
    refresh,
  };
}

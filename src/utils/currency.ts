/**
 * currency.ts
 * Currency symbol mappings and utilities for the Zakaat calculator.
 */

export const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
  AED: "د.إ",
  SAR: "ر.س",
  PKR: "₨",
  BDT: "৳",
  MYR: "RM",
  INR: "₹",
  IDR: "Rp",
} as const;

export function getCurrencySymbol(code: string): string {
  return CURRENCY_SYMBOLS[code] || code;
}

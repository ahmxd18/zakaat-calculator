/**
 * zakaat.ts
 * Core Zakaat calculation logic.
 */

export interface AssetValues {
  [key: string]: number;
  // Cash & Bank
  cash_on_hand: number;
  bank_savings: number;
  foreign_cash: number;
  
  // Gold & Silver (in grams)
  gold_grams: number;
  silver_grams: number;
  
  // Investments
  stocks: number;
  crypto: number;
  pension: number;
  
  // Business
  stock_inventory: number;
  receivables: number;
  
  // Deductions
  debts_owed: number;
  bills_due: number;
}

export interface NisaabPrices {
  goldPricePerGram: number;
  silverPricePerGram: number;
}

export interface ZakaatResult {
  totalAssets: number;
  totalDeductions: number;
  netZakaatableWealth: number;
  nisaabThreshold: number;
  zakaatDue: number;
  isBelowNisaab: boolean;
}

const GOLD_NISAAB_GRAMS = 85;
const SILVER_NISAAB_GRAMS = 595;
const ZAKAAT_RATE = 0.025; // 2.5%

export type NisaabStandard = "lower" | "gold" | "silver";

/**
 * Calculate Nisaab threshold using the chosen standard.
 * - lower (default/Hanafi): whichever of gold or silver is worth less
 * - gold (Shafi'i preferred): always use 85g gold value
 * - silver (conservative): always use 595g silver value
 */
export function calculateNisaab(prices: NisaabPrices, standard: NisaabStandard = "lower"): number {
  const goldNisaab = GOLD_NISAAB_GRAMS * prices.goldPricePerGram;
  const silverNisaab = SILVER_NISAAB_GRAMS * prices.silverPricePerGram;

  if (standard === "gold") return goldNisaab;
  if (standard === "silver") return silverNisaab;
  return Math.min(goldNisaab, silverNisaab); // "lower"
}

/**
 * Calculate total zakatable assets from form values.
 */
export function calculateTotalAssets(
  values: AssetValues,
  prices: NisaabPrices
): number {
  const cashAssets = 
    values.cash_on_hand +
    values.bank_savings +
    values.foreign_cash;
  
  const preciousMetals = 
    (values.gold_grams * prices.goldPricePerGram) +
    (values.silver_grams * prices.silverPricePerGram);
  
  const investments = 
    values.stocks +
    values.crypto +
    values.pension;
  
  const business = 
    values.stock_inventory +
    values.receivables;
  
  return cashAssets + preciousMetals + investments + business;
}

/**
 * Calculate total deductions.
 */
export function calculateTotalDeductions(values: AssetValues): number {
  return values.debts_owed + values.bills_due;
}

/**
 * Full Zakaat calculation.
 */
export function calculateZakaat(
  values: AssetValues,
  prices: NisaabPrices,
  standard: NisaabStandard = "lower",
): ZakaatResult {
  const totalAssets = calculateTotalAssets(values, prices);
  const totalDeductions = calculateTotalDeductions(values);
  const netZakaatableWealth = Math.max(0, totalAssets - totalDeductions);
  const nisaabThreshold = calculateNisaab(prices, standard);
  
  const isBelowNisaab = netZakaatableWealth < nisaabThreshold;
  const zakaatDue = isBelowNisaab ? 0 : netZakaatableWealth * ZAKAAT_RATE;
  
  return {
    totalAssets,
    totalDeductions,
    netZakaatableWealth,
    nisaabThreshold,
    zakaatDue,
    isBelowNisaab,
  };
}

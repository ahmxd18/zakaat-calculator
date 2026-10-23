/**
 * zakaat.ts
 * Core Zakaat calculation logic.
 */
import { MADHAB_RULES, type Madhab, type NisaabStandard } from "../constants/madhab"

export interface AssetValues {
  [key: string]: number;
  // Cash & Bank
  cash_on_hand: number;
  bank_savings: number;
  foreign_cash: number;
  
  // Gold & Silver (in grams)
  gold_grams: number;
  silver_grams: number;
  worn_gold_grams: number;
  worn_silver_grams: number;
  
  // Investments
  stocks: number;
  income_stocks: number;
  crypto: number;
  pension: number;
  
  // Business
  stock_inventory: number;
  receivables: number;
  trade_real_estate: number;
  
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
  deductionsApplied: number;
  hawlStatus: "not-required" | "complete" | "incomplete" | "invalid" | "reset";
}

const GOLD_NISAAB_GRAMS = 85;
const SILVER_NISAAB_GRAMS = 595;
const LUNAR_YEAR_DAYS = 354;
const ZAKAAT_RATE = 0.025; // 2.5%

export type { NisaabStandard }

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
  prices: NisaabPrices,
  madhab: Madhab = "default",
): number {
  const rules = MADHAB_RULES[madhab]
  const cashAssets = 
    values.cash_on_hand +
    values.bank_savings +
    values.foreign_cash;
  
  const preciousMetals =
    ((values.gold_grams + (rules.jewelleryZakatable ? values.worn_gold_grams ?? 0 : 0)) *
      prices.goldPricePerGram) +
    ((values.silver_grams + (rules.jewelleryZakatable ? values.worn_silver_grams ?? 0 : 0)) *
      prices.silverPricePerGram);
  
  const investments = 
    values.stocks +
    (values.income_stocks ?? 0) * 0.25 +
    values.crypto +
    values.pension;
  
  const business = 
    values.stock_inventory +
    values.receivables +
    (rules.tradeRealEstateZakatable ? values.trade_real_estate ?? 0 : 0);
  
  return cashAssets + preciousMetals + investments + business;
}

/**
 * Calculate total deductions.
 */
export function calculateTotalDeductions(values: AssetValues): number {
  return values.debts_owed + values.bills_due;
}

function getHawlDateStatus(startDate: string, now: Date): "complete" | "incomplete" | "invalid" {
  if (!startDate) return "incomplete"
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(startDate)
  if (!match) return "invalid"

  const [, year, month, day] = match
  const start = Date.UTC(Number(year), Number(month) - 1, Number(day))
  const validStart =
    new Date(start).getUTCFullYear() === Number(year) &&
    new Date(start).getUTCMonth() === Number(month) - 1 &&
    new Date(start).getUTCDate() === Number(day)
  if (!validStart) return "invalid"

  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const earliestDueDate = start + LUNAR_YEAR_DAYS * 24 * 60 * 60 * 1000
  if (start > today) return "invalid"
  return today >= earliestDueDate ? "complete" : "incomplete"
}

/**
 * Full Zakaat calculation.
 */
export function calculateZakaat(
  values: AssetValues,
  prices: NisaabPrices,
  standard: NisaabStandard = "lower",
  madhab: Madhab = "default",
  hawl: { startDate: string; fellBelowNisaab: boolean } = {
    startDate: "",
    fellBelowNisaab: false,
  },
  now: Date = new Date(),
): ZakaatResult {
  const rules = MADHAB_RULES[madhab]
  const totalAssets = calculateTotalAssets(values, prices, madhab)
  const totalDeductions = calculateTotalDeductions(values)
  const deductionsApplied = rules.debtDeductionPermitted ? totalDeductions : 0
  const netZakaatableWealth = Math.max(0, totalAssets - deductionsApplied)
  const nisaabThreshold = calculateNisaab(prices, standard);

  const isBelowNisaab = netZakaatableWealth < nisaabThreshold
  let hawlStatus: ZakaatResult["hawlStatus"] = "not-required"
  if (rules.requiresHawl) {
    const dateStatus = getHawlDateStatus(hawl.startDate, now)
    if (dateStatus !== "complete") {
      hawlStatus = dateStatus
    } else if (rules.hawlResetsOnDip && hawl.fellBelowNisaab) {
      hawlStatus = "reset"
    } else {
      hawlStatus = "complete"
    }
  }

  const hawlComplete = hawlStatus === "not-required" || hawlStatus === "complete"
  const zakaatDue =
    isBelowNisaab || !hawlComplete ? 0 : netZakaatableWealth * ZAKAAT_RATE

  return {
    totalAssets,
    totalDeductions,
    netZakaatableWealth,
    nisaabThreshold,
    zakaatDue,
    isBelowNisaab,
    deductionsApplied,
    hawlStatus,
  };
}

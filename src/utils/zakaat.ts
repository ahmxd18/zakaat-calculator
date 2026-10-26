/**
 * zakaat.ts
 * Core Zakaat calculation logic.
 */
import { decimal, sum, multiply, subtract, lessThan, toNumber } from "./decimal"
import { MADHAB_RULES, type Madhab, type NisaabStandard } from "../constants/madhab"

export interface AssetValues {
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

import { GOLD_NISAB_GRAMS as GOLD_NISAAB_GRAMS, SILVER_NISAB_GRAMS as SILVER_NISAAB_GRAMS, ZAKAAT_RATE, MAX_INPUT } from "../../shared/prices.mjs"
export { MAX_INPUT } from "../../shared/prices.mjs"
const LUNAR_YEAR_DAYS = 354;

export type { NisaabStandard }

/**
 * Calculate Nisaab threshold using the chosen standard.
 * - lower (default/Hanafi): whichever of gold or silver is worth less
 * - gold (Shafi'i preferred): always use 85g gold value
 * - silver (conservative): always use 595g silver value
 */
export const ASSET_KEYS = [
  "cash_on_hand", "bank_savings", "foreign_cash", "gold_grams", "silver_grams",
  "worn_gold_grams", "worn_silver_grams", "stocks", "income_stocks", "crypto",
  "pension", "stock_inventory", "receivables", "trade_real_estate", "debts_owed", "bills_due",
] as const
export type AssetKey = typeof ASSET_KEYS[number]
export const EMPTY_VALUES: AssetValues = Object.fromEntries(ASSET_KEYS.map(key => [key, 0])) as unknown as AssetValues
function validateNumber(value: unknown, positive = false): asserts value is number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > MAX_INPUT || (positive && value === 0)) {
    throw new Error("Enter valid non-negative amounts and positive prices within the supported range.")
  }
}
export function validateAssets(values: AssetValues): void {
  if (!values || typeof values !== "object" || Array.isArray(values)) throw new Error("Invalid assets.")
  if (Object.keys(values).some(key => !(ASSET_KEYS as readonly string[]).includes(key))) throw new Error("Unknown asset field.")
  ASSET_KEYS.forEach(key => validateNumber(values[key]))
}
function validatePrices(prices: NisaabPrices): void {
  if (!prices) throw new Error("Prices are required.")
  validateNumber(prices.goldPricePerGram, true)
  validateNumber(prices.silverPricePerGram, true)
}
function rulesFor(madhab: Madhab) {
  if (!Object.prototype.hasOwnProperty.call(MADHAB_RULES, madhab)) throw new Error("Invalid school.")
  return MADHAB_RULES[madhab]
}
function nisaabDecimal(prices: NisaabPrices, standard: NisaabStandard) {
  validatePrices(prices)
  if (!["gold", "silver", "lower"].includes(standard)) throw new Error("Invalid Nisab standard.")
  const gold = multiply(decimal(GOLD_NISAAB_GRAMS), decimal(prices.goldPricePerGram))
  const silver = multiply(decimal(SILVER_NISAAB_GRAMS), decimal(prices.silverPricePerGram))
  return standard === "gold" ? gold : standard === "silver" ? silver : lessThan(gold, silver) ? gold : silver
}
export function calculateNisaab(prices: NisaabPrices, standard: NisaabStandard = "lower"): number {
  return toNumber(nisaabDecimal(prices, standard))
}
function assetsDecimal(values: AssetValues, prices: NisaabPrices, madhab: Madhab) {
  validateAssets(values)
  validatePrices(prices)
  const rules = rulesFor(madhab)
  const money: AssetKey[] = ["cash_on_hand", "bank_savings", "foreign_cash", "stocks", "crypto", "pension", "stock_inventory", "receivables"]
  if (rules.tradeRealEstateZakatable) money.push("trade_real_estate")
  return sum([
    ...money.map(key => decimal(values[key])),
    multiply(sum([decimal(values.gold_grams), decimal(rules.jewelleryZakatable ? values.worn_gold_grams : 0)]), decimal(prices.goldPricePerGram)),
    multiply(sum([decimal(values.silver_grams), decimal(rules.jewelleryZakatable ? values.worn_silver_grams : 0)]), decimal(prices.silverPricePerGram)),
    multiply(decimal(values.income_stocks), decimal(0.25)),
  ])
}
export function calculateTotalAssets(values: AssetValues, prices: NisaabPrices, madhab: Madhab = "default"): number {
  return toNumber(assetsDecimal(values, prices, madhab))
}
export function calculateTotalDeductions(values: AssetValues): number {
  validateAssets(values)
  return toNumber(sum([decimal(values.debts_owed), decimal(values.bills_due)]))
}

function calendarDate(value: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const [, year, month, day] = match
  const date = new Date(0)
  date.setUTCFullYear(Number(year), Number(month) - 1, Number(day))
  date.setUTCHours(0, 0, 0, 0)
  if (date.getUTCFullYear() !== Number(year) || date.getUTCMonth() !== Number(month) - 1 || date.getUTCDate() !== Number(day)) return null
  return date.getTime()
}
function getHawlDateStatus(startDate: string, now: Date, dueDate = ""): "complete" | "incomplete" | "invalid" {
  if (!startDate) return "incomplete"
  const start = calendarDate(startDate)
  if (start === null) return "invalid"
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const due = dueDate ? calendarDate(dueDate) : start + LUNAR_YEAR_DAYS * 86400000
  if (start > today || due === null || due <= start) return "invalid"
  return today >= due ? "complete" : "incomplete"
}

/**
 * Full Zakaat calculation.
 */
export function calculateZakaat(
  values: AssetValues,
  prices: NisaabPrices,
  standard: NisaabStandard | undefined = undefined,
  madhab: Madhab = "default",
  hawl: { startDate: string; fellBelowNisaab: boolean; dueDate?: string } = {
    startDate: "",
    fellBelowNisaab: false,
  },
  now: Date = new Date(),
): ZakaatResult {
  const rules = rulesFor(madhab)
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error("Invalid calculation date.")
  if (hawl?.dueDate !== undefined && typeof hawl.dueDate !== "string") throw new Error("Invalid anniversary date.")
  if (!hawl || typeof hawl.startDate !== "string" || typeof hawl.fellBelowNisaab !== "boolean") throw new Error("Invalid hawl data.")
  const assets = assetsDecimal(values, prices, madhab)
  const deductions = sum([decimal(values.debts_owed), decimal(values.bills_due)])
  const applied = rules.debtDeductionPermitted ? deductions : decimal(0)
  const difference = subtract(assets, applied)
  const net = lessThan(difference, decimal(0)) ? decimal(0) : difference
  const threshold = nisaabDecimal(prices, standard ?? rules.defaultNisaabStandard)
  const totalAssets = toNumber(assets)
  const totalDeductions = toNumber(deductions)
  const deductionsApplied = toNumber(applied)
  const netZakaatableWealth = toNumber(net)
  const nisaabThreshold = toNumber(threshold)
  const isBelowNisaab = lessThan(net, threshold)
  let hawlStatus: ZakaatResult["hawlStatus"] = "not-required"
  if (rules.requiresHawl) {
    const dateStatus = getHawlDateStatus(hawl.startDate, now, hawl.dueDate)
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
    isBelowNisaab || !hawlComplete ? 0 : toNumber(multiply(net, decimal(ZAKAAT_RATE)))

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

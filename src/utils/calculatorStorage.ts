import type { NisaabStandard } from "../constants/madhab"
import { ASSET_KEYS, EMPTY_VALUES, MAX_INPUT, type AssetKey, type AssetValues } from "./zakaat"
import { INVARIANT_CONSTANTS } from "../constants/invariants"
export const SNAPSHOT_KEY = "zakaat_calculator_v2"
export interface Snapshot { version: 2; nisaabOverride: NisaabStandard | null; currency: string; values: AssetValues; hawl: { startDate: string; fellBelowNisaab: boolean; dueDate?: string } }
export const emptySnapshot = (): Snapshot => ({ version: 2, nisaabOverride: null, currency: "GBP", values: { ...EMPTY_VALUES }, hawl: { startDate: "", fellBelowNisaab: false } })
export function isCurrency(value: unknown): value is string { return typeof value === "string" && (INVARIANT_CONSTANTS.currencies as readonly string[]).includes(value) }
function assets(value: unknown): AssetValues {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid saved assets.")
  const restored = { ...EMPTY_VALUES }
  for (const [key, amount] of Object.entries(value)) {
    if (!(ASSET_KEYS as readonly string[]).includes(key) || typeof amount !== "number" || !Number.isFinite(amount) || amount < 0 || amount > MAX_INPUT) throw new Error("Invalid saved amount.")
    restored[key as AssetKey] = amount
  }
  return restored
}
function hawl(value: unknown): Snapshot["hawl"] {
  if (!value || typeof value !== "object" || !("startDate" in value) || typeof value.startDate !== "string" || !("fellBelowNisaab" in value) || typeof value.fellBelowNisaab !== "boolean") throw new Error("Invalid saved hawl.")
  if ("dueDate" in value && typeof value.dueDate !== "string") throw new Error("Invalid saved anniversary.")
  return { startDate: value.startDate, fellBelowNisaab: value.fellBelowNisaab, ...("dueDate" in value ? { dueDate: value.dueDate as string } : {}) }
}
function standard(value: unknown): NisaabStandard | null {
  if (value === null || value === "gold" || value === "silver" || value === "lower") return value
  throw new Error("Invalid saved Nisab preference.")
}
function legacyStandard(storage: Pick<Storage, "getItem">): NisaabStandard | null {
  const value = storage.getItem("zakaat_nisaab_standard")
  if (value === "gold" || value === "silver" || (value === "lower" && storage.getItem("zakaat_nisaab_standard_manual") === "true")) return value
  return null
}
export function loadSnapshot(storage: Pick<Storage, "getItem">): { snapshot: Snapshot; needsReview: boolean } {
  const saved = storage.getItem(SNAPSHOT_KEY)
  if (saved) {
    const data = JSON.parse(saved)
    if (data.version !== 2 || !isCurrency(data.currency) || ASSET_KEYS.some(key => !Object.prototype.hasOwnProperty.call(data.values ?? {}, key))) throw new Error("Invalid saved snapshot.")
    return { snapshot: { version: 2, nisaabOverride: Object.prototype.hasOwnProperty.call(data,"nisaabOverride") ? standard(data.nisaabOverride) : legacyStandard(storage), currency: data.currency, values: assets(data.values), hawl: hawl(data.hawl) }, needsReview: false }
  }
  const snapshot = emptySnapshot()
  snapshot.nisaabOverride = legacyStandard(storage)
  const oldValues = storage.getItem("zakaat_calculator_data")
  const oldCurrency = storage.getItem("zakaat_currency")
  if (isCurrency(oldCurrency)) snapshot.currency = oldCurrency
  if (oldValues) snapshot.values = assets(JSON.parse(oldValues))
  const oldHawl = storage.getItem("zakaat_hawl_data")
  if (oldHawl) snapshot.hawl = hawl(JSON.parse(oldHawl))
  return { snapshot, needsReview: !!oldValues && !isCurrency(oldCurrency) }
}

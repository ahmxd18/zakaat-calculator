import { Banknote, Coins, TrendingUp, Store, Minus, type LucideIcon } from "lucide-react"
import type { Translations } from "../../locales/en"
import type { AssetKey } from "../../utils/zakaat"
export interface AssetSectionDefinition {
  id: string
  icon: LucideIcon
  label: string
  description: string
  fields: { id: AssetKey; label: string; placeholder: string }[]
}
export function getAssetSections(labels: Translations["calculate"]) {
  // ── Asset section definitions (icons decoupled from locale strings) ─────
  const sections: AssetSectionDefinition[] = [
    {
      id: "cash",
      icon: Banknote,
      label: labels.sections.cash.label,
      description: labels.sections.cash.description,
      fields: [
        { id: "cash_on_hand", label: labels.sections.cash.fields.cashOnHand,   placeholder: labels.placeholders.amount },
        { id: "bank_savings", label: labels.sections.cash.fields.bankSavings,  placeholder: labels.placeholders.amount },
        { id: "foreign_cash", label: labels.sections.cash.fields.foreignCash,  placeholder: labels.placeholders.amount },
      ],
    },
    {
      id: "metals",
      icon: Coins,
      label: labels.sections.goldSilver.label,
      description: labels.sections.goldSilver.description,
      fields: [
        { id: "gold_grams", label: labels.sections.goldSilver.fields.goldGrams, placeholder: labels.placeholders.grams },
        { id: "worn_gold_grams", label: labels.sections.goldSilver.fields.wornGoldGrams, placeholder: labels.placeholders.grams },
        { id: "silver_grams", label: labels.sections.goldSilver.fields.silverGrams, placeholder: labels.placeholders.grams },
        { id: "worn_silver_grams", label: labels.sections.goldSilver.fields.wornSilverGrams, placeholder: labels.placeholders.grams },
      ],
    },
    {
      id: "investments",
      icon: TrendingUp,
      label: labels.sections.investments.label,
      description: labels.sections.investments.description,
      fields: [
        { id: "stocks",  label: labels.sections.investments.fields.stocks,  placeholder: labels.placeholders.amount },
        { id: "income_stocks", label: labels.sections.investments.fields.incomeStocks, placeholder: labels.placeholders.amount },
        { id: "crypto",  label: labels.sections.investments.fields.crypto,  placeholder: labels.placeholders.amount },
        { id: "pension", label: labels.sections.investments.fields.pension, placeholder: labels.placeholders.amount },
      ],
    },
    {
      id: "business",
      icon: Store,
      label: labels.sections.business.label,
      description: labels.sections.business.description,
      fields: [
        { id: "stock_inventory", label: labels.sections.business.fields.stockInventory, placeholder: labels.placeholders.amount },
        { id: "receivables",     label: labels.sections.business.fields.receivables,     placeholder: labels.placeholders.amount },
        { id: "trade_real_estate", label: labels.sections.business.fields.tradeRealEstate, placeholder: labels.placeholders.amount },
      ],
    },
    {
      id: "deductions",
      icon: Minus,
      label: labels.sections.deductions.label,
      description: labels.sections.deductions.description,
      fields: [
        { id: "debts_owed", label: labels.sections.deductions.fields.debtsOwed, placeholder: labels.placeholders.amount },
        { id: "bills_due",  label: labels.sections.deductions.fields.billsDue,  placeholder: labels.placeholders.amount },
      ],
    },
  ]

  return sections
}

/**
 * AssetSection.tsx
 * Collapsible accordion panel containing a group of AssetFields.
 * Accepts a Lucide icon component instead of an emoji string.
 */
import { useState, useId } from "react"
import { motion } from "framer-motion"
import { ChevronDown, type LucideIcon } from "lucide-react"
import { Card } from "../ui/Card"
import { AssetField } from "./AssetField"
import type { AssetValues, AssetKey } from "../../utils/zakaat"

export interface AssetSectionField {
  id: AssetKey
  label: string
  placeholder: string
}

export interface AssetSectionProps {
  icon: LucideIcon
  label: string
  description: string
  fields: AssetSectionField[]
  index: number
  currencySymbol: string
  values: AssetValues
  onChange: (id: AssetKey, value: number) => void
  onValidityChange?: (id: AssetKey, valid: boolean) => void
  invalidMessage?: string
  direction: "ltr" | "rtl"
}

export function AssetSection({
  icon: Icon,
  label,
  description,
  fields,
  index,
  currencySymbol,
  values,
  onChange,
  direction,
  onValidityChange,
  invalidMessage,
}: AssetSectionProps) {
  const panelId = useId()
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Card padding="none" className="overflow-hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start hover:bg-cream-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-inset"
          aria-expanded={open}
          aria-controls={panelId}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-charcoal-800">{label}</h3>
              <p className="text-xs text-charcoal-500 mt-0.5">{description}</p>
            </div>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 text-charcoal-400"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </button>

        <motion.div
          id={panelId}
          inert={!open}
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          style={{ overflow: "hidden" }}
        >
          <div className="px-6 pb-6 pt-0">
            <div className="h-px bg-cream-200 mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field) => (
                <AssetField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  currencySymbol={field.id.endsWith("_grams") ? "g" : currencySymbol}
                  value={values[field.id] || 0}
                  onChange={(val) => onChange(field.id, val)}
                  direction={direction}
                  onValidityChange={(valid) => onValidityChange?.(field.id, valid)}
                  invalidMessage={invalidMessage}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

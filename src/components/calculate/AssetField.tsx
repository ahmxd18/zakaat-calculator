/**
 * AssetField.tsx
 * A single currency number input with a floating symbol prefix/suffix.
 */
import { cn } from "../../utils/cn"

export interface AssetFieldProps {
  id: string
  label: string
  placeholder: string
  currencySymbol: string
  value: number
  onChange: (value: number) => void
  direction: "ltr" | "rtl"
}

export function AssetField({
  id,
  label,
  placeholder,
  currencySymbol,
  value,
  onChange,
  direction,
}: AssetFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal-700"
      >
        {label}
      </label>
      <div className="relative">
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-charcoal-400 text-sm select-none",
            direction === "rtl" ? "end-3.5" : "start-3.5",
          )}
        >
          {currencySymbol}
        </span>
        <input
          id={id}
          type="number"
          min="0"
          step="0.01"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={cn(
            "w-full rounded-xl border border-cream-300 bg-white py-3 text-sm text-charcoal-800",
            "placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-sage-400",
            "focus:border-transparent transition-shadow",
            direction === "rtl" ? "pe-8 ps-4" : "ps-8 pe-4",
          )}
        />
      </div>
    </div>
  )
}
